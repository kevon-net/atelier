import { useCallback, useEffect, useRef } from 'react';
import { useIdle, UserNetworkReturnValue } from '@mantine/hooks';
import { config } from './indexed-db/config';
import { openDatabase } from './indexed-db/actions';
import { Database, DatabaseError } from './indexed-db/transactions';
import { COOKIE_NAME, getClientApiUrl, STORE_NAME } from '@repo/constants';
import { SyncParams, SyncStatus } from '@repo/types';
import { workspacesUpdate, foldersUpdate } from '@repo/handlers';
import { SessionValue, useStoreSession } from './state/session';
import { SyncStatusValue } from './state/sync-status';
import { useStoreWorkspace } from './state/workspace';
import { useStoreFolder } from './state/folder';
import { useNetworkSync } from './state/sync/network';
import { getCookieClient } from '@repo/utils';

type SyncStoreConfig<TItems = any, THookReturn = any> = {
  dataStore: (typeof STORE_NAME)[keyof typeof STORE_NAME];
  useStoreHook: () => THookReturn;
  serverUpdate: (apiurl: string, items: TItems[], deleted: TItems[]) => Promise<any>;
  getItems: (store: THookReturn) => TItems[];
  getDeleted: (store: THookReturn) => TItems[];
  setItems: (store: THookReturn, items: TItems[]) => void;
  clearDeleted: (store: THookReturn) => void;
};

export const SYNC_STORES: Record<string, SyncStoreConfig> = {
  [STORE_NAME.FOLDERS]: {
    dataStore: STORE_NAME.FOLDERS,
    useStoreHook: useStoreFolder,
    serverUpdate: foldersUpdate,
    getItems: (store) => store.folders,
    getDeleted: (store) => store.deleted,
    setItems: (store, items) => store.setFolders(items),
    clearDeleted: (store) => store.clearDeletedFolders(),
  },

  [STORE_NAME.WORKSPACES]: {
    dataStore: STORE_NAME.WORKSPACES,
    useStoreHook: useStoreWorkspace,
    serverUpdate: workspacesUpdate,
    getItems: (store) => store.workspaces,
    getDeleted: (store) => store.deleted,
    setItems: (store, items) => store.setWorkspaces(items),
    clearDeleted: (store) => store.clearDeletedWorkspaces(),
  },
} as const;

type SyncStoreKey = keyof typeof SYNC_STORES;

const SYNC_REGISTRY: Record<SyncStoreKey, any> = {
  [STORE_NAME.WORKSPACES]: {
    store: useStoreWorkspace,
    updateState: (items: any) => useStoreWorkspace.getState().mergeWorkspaces(items),
    clearDeleted: () => useStoreWorkspace.getState().clearDeletedWorkspaces(),
  },
  [STORE_NAME.FOLDERS]: {
    store: useStoreFolder,
    updateState: (items: any) => useStoreFolder.getState().mergeFolders(items),
    clearDeleted: () => useStoreFolder.getState().clearDeletedFolders(),
  },
};

// Define a shape for the payload
export interface MergedSyncPayload {
  [STORE_NAME.WORKSPACES]?: { items: any[]; deleted: any[] };
  [STORE_NAME.FOLDERS]?: { items: any[]; deleted: any[] };
}

// Update the MergedSyncParams to handle multiple datasets
export type MergedSyncParams = {
  apiUrl: string;
  payload: MergedSyncPayload;
  onSuccess?: (key: keyof MergedSyncPayload, updatedItems: any[]) => void;
  onClearDeleted?: (key: keyof MergedSyncPayload) => void;
};

export const useMergedSync = (params: {
  online: boolean;
  storesToSync: SyncStoreKey[];
  handleSync: (payload: MergedSyncPayload) => Promise<void>;
  syncStatus: SyncStatusValue;
}) => {
  const { online } = params;
  const idle = useIdle(4000, { events: ['keypress', 'click'] });
  const { refreshNetworkStatus } = useNetworkSync();

  // Store params in a ref so sync always reads fresh state without re-triggering useEffect
  const paramsRef = useRef(params);
  paramsRef.current = params;

  // Ref guard to prevent concurrent sync executions
  const isSyncingRef = useRef(false);

  const triggerSync = useCallback(async () => {
    // Prevent execution if already syncing or pending
    if (isSyncingRef.current || paramsRef.current.syncStatus === SyncStatus.PENDING) {
      return;
    }

    const stores = {
      [STORE_NAME.WORKSPACES]: useStoreWorkspace.getState(),
      [STORE_NAME.FOLDERS]: useStoreFolder.getState(),
    };

    const payload: MergedSyncPayload = {};
    let hasDirtyData = false;

    paramsRef.current.storesToSync.forEach((key) => {
      const config = SYNC_STORES[key];

      // Safety Check: skip if config doesn't exist for this key
      if (!config) {
        console.warn(`Sync config for hook key "${key}" is missing in SYNC_STORES.`);
        return;
      }

      const store = (stores as any)[key];
      const items = config.getItems(store) ?? [];
      const deleted = config.getDeleted(store) ?? [];

      const needsSync = items.some(
        (i) =>
          i.syncStatus === SyncStatus.PENDING ||
          i.syncStatus === SyncStatus.SAVED ||
          i.syncStatus === SyncStatus.ERROR ||
          (i.syncStatus === SyncStatus.SYNCED_CLIENT && isRecent(i.updatedAt || i.createdAt)),
      );

      if (needsSync || deleted.length > 0) {
        console.log('--> [info] syncing', key);
        (payload as any)[key] = { items, deleted };
        hasDirtyData = true;
      }
    });

    if (hasDirtyData) {
      try {
        isSyncingRef.current = true;
        await paramsRef.current.handleSync(payload);
      } finally {
        isSyncingRef.current = false;
      }
    }
  }, []);

  // Effect ONLY re-runs when idle, or online
  useEffect(() => {
    refreshNetworkStatus();
    if (idle) triggerSync();
  }, [online, idle, triggerSync]);
};

export const handleMergedSync = async (
  params: MergedSyncParams & {
    setSyncStatus: (data: SyncStatusValue) => void;
    session: SessionValue;
    online: boolean;
    syncStatus: SyncStatusValue;
    debounceMergedSyncToServer: (...args: any) => void;
    clientOnly?: boolean;
  },
) => {
  const { payload, online, session, setSyncStatus, debounceMergedSyncToServer, clientOnly } =
    params;

  try {
    const db = await openDatabase(config);

    // 1. Client-Side Batch Update
    // We loop through the payload keys (e.g., ['posts', 'categories'])
    for (const [storeKey, data] of Object.entries(payload)) {
      const config = SYNC_STORES[storeKey as SyncStoreKey];
      const registry = SYNC_REGISTRY[storeKey as SyncStoreKey];

      await syncToClientDB({
        ...data,
        items: data?.items || [],
        deletedItems: data?.deleted || [],
        dataStore: config!.dataStore,
        stateUpdateFunction: registry.updateState,
        stateUpdateFunctionDeleted: registry.clearDeleted,
        online,
        clientOnly,
        sameDate: true,
        db,
        // ... pass relevant store-specific update functions from a registry
      });
    }

    // 2. PHASE TWO: Batch Sync to Server
    if (online && !clientOnly) {
      // Instead of multiple debounced calls, we pass the WHOLE payload
      // to one debounced function that hits a single /api/sync/batch endpoint
      debounceMergedSyncToServer({ ...payload, db, ...params });
    }
  } catch (error) {
    setSyncStatus(SyncStatus.ERROR);
  }
};

export const syncToServerDBMerged = async (
  payload: MergedSyncPayload,
  options: { apiUrl: string },
) => {
  const now = new Date();
  const finalPayload: Record<string, any> = {};
  const activeStores: string[] = [];

  // Iterate through the keys (posts, categories, etc.)
  (Object.keys(payload) as SyncStoreKey[]).forEach((key) => {
    const data = (payload as any)[key];
    if (data && (data.items.length > 0 || data.deleted.length > 0)) {
      // This now contains { upserts: [...], deletedIds: [...] }
      finalPayload[key] = prepareStorePayload(key, data, now);
      activeStores.push(key);
    }
  });

  try {
    if (activeStores.length === 0) return;

    const response = await fetch(`${options.apiUrl}/app-data?stores=${activeStores.join(',')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const result = await response.json();

    return { success: true, data: result };
  } catch (error) {
    // Handle mass error state
    console.error('Merged Server Sync Error:', error);
    return { success: false, error };
  }
};

const prepareStorePayload = (
  key: SyncStoreKey,
  data: { items: any[]; deleted: any[] } | undefined,
  now: Date,
) => {
  if (!data) return null;

  // 1. Get items that need saving/updating
  const upserts = data.items
    .filter((i) => i.syncStatus !== SyncStatus.SYNCED && i.syncStatus !== SyncStatus.DELETED)
    // ... rest of map
    .map((item) => {
      let resolvedItem = item;

      const hasWorkspaceProperty = Object.hasOwn(resolvedItem, 'workspaceId');

      if (hasWorkspaceProperty) {
        const defaultWorkspaceId = getCookieClient(COOKIE_NAME.DEFAULT_WORKSPACE);

        if (defaultWorkspaceId) {
          resolvedItem = { ...resolvedItem, workspaceId: defaultWorkspaceId };
        }
      }

      return {
        ...resolvedItem,
        updatedAt: now.toISOString(),
        syncStatus: SyncStatus.SYNCED,
      };
    });

  // 2. Get the IDs of items marked for deletion
  // This is where your cart items live after orderUpdate runs
  const deletedIds = data.deleted.map((i) => i.id);

  return {
    upserts, // Changed from [key] to a fixed key for easier API parsing
    deletedIds,
  };
};

export const handleServerResponse = async (
  responsePayload: Record<string, any>,
  online: boolean,
  // networkStatus: UserNetworkReturnValue,
  db: Database,
) => {
  // 1. Iterate through the keys returned by the server
  for (const [key, items] of Object.entries(responsePayload)) {
    const config = SYNC_STORES[key as SyncStoreKey];
    const registry = SYNC_REGISTRY[key as SyncStoreKey];

    // Safety Check: skip if config doesn't exist for this key
    if (!config || !registry) {
      console.warn(`Sync config for hook key "${key}" is missing in SYNC_STORES.`);
      continue;
    }

    // 2. Update Client DB & Zustand to 'SYNCED'
    // We use your existing syncToClientDB but with 'fromServer' flag
    await syncToClientDB({
      items: items,
      deletedItems: [], // Server already handled deletions
      dataStore: config.dataStore,
      stateUpdateFunction: registry.updateState,
      stateUpdateFunctionDeleted: registry.clearDeleted,
      online,
      cleanup: true, // This removes DELETED items from IndexedDB
      options: { fromServer: true },
      db,
    });
  }
};

export const syncToServerAfterDelay = async (
  params: MergedSyncParams & {
    setSyncStatus: (data: SyncStatusValue) => void;
    session: SessionValue;
    online: boolean;
    // networkStatus: UserNetworkReturnValue;
    syncStatus: SyncStatusValue;
    db: Database;
  },
) => {
  const { setSyncStatus, online, payload } = params;

  try {
    setSyncStatus(SyncStatus.PENDING);

    // 1. Send the merged payload
    const result = await syncToServerDBMerged(payload, { apiUrl: params.apiUrl });

    if (result?.error) {
      // handle errors (marking items with SyncStatus.ERROR)
      setSyncStatus(SyncStatus.ERROR);
      return;
    }

    // 2. Process the successful return to update local state
    if (result?.data) {
      await handleServerResponse(result.data.items, online, params.db);
    }

    setSyncStatus(SyncStatus.SYNCED);
  } catch (error) {
    setSyncStatus(SyncStatus.ERROR);
    console.error('Sync to Server Error:', error);
  }
};

export const syncToClientDB = async (
  params: SyncParams & {
    sameDate?: boolean;
    online?: boolean;
    clientOnly?: boolean;
    cleanup?: boolean;
    options?: { fromServer?: boolean };
    db: Database;
  },
) => {
  if (params.options?.fromServer) {
    params.items = dedupeBy(params.items, (i) => i.id);
    params.deletedItems = dedupeBy(params.deletedItems || [], (i) => i.id);
  }

  const syncedItems = params.items.filter((p) => p.syncStatus == SyncStatus.SYNCED);

  const unsyncedItems = [
    ...params.items,
    ...(params.options?.fromServer ? [] : params.deletedItems || []),
  ].filter((p) => p.syncStatus != SyncStatus.SYNCED);

  try {
    // Update IndexedDB with unsynced items items

    let savedItems: any[] = params.options?.fromServer ? params.items : [];

    if (unsyncedItems.length) {
      savedItems = unsyncedItems.map((item) => {
        let resolvedItem = item;

        const hasWorkspaceProperty = Object.hasOwn(resolvedItem, 'workspaceId');

        if (hasWorkspaceProperty) {
          const defaultWorkspaceId = getCookieClient(COOKIE_NAME.DEFAULT_WORKSPACE);

          if (defaultWorkspaceId) {
            resolvedItem = { ...resolvedItem, workspaceId: defaultWorkspaceId };
          }
        }

        return {
          ...resolvedItem,
          updatedAt: params.sameDate ? resolvedItem.updatedAt : new Date().toISOString(),
          syncStatus:
            resolvedItem.syncStatus == SyncStatus.DELETED
              ? SyncStatus.DELETED
              : resolvedItem.syncStatus == SyncStatus.ERROR
                ? SyncStatus.ERROR
                : params.online && !params.clientOnly
                  ? SyncStatus.SYNCED_CLIENT
                  : SyncStatus.SAVED,
        };
      });
    }

    if (!savedItems.length) return;

    if (params.cleanup) {
      const deletedItems = savedItems.filter((i) => i.syncStatus == SyncStatus.DELETED);

      if (deletedItems.length) {
        // remove items with sync status DELETE from client
        await params.db.delete(params.dataStore, deletedItems);
      }
    }

    const savedItemsNotDeleted: any[] = savedItems.filter(
      (i) => i.syncStatus != SyncStatus.DELETED,
    );

    const clientDbItems = params.cleanup ? savedItemsNotDeleted : savedItems;

    const finalClientDbItems = params.options?.fromServer
      ? clientDbItems
      : [...clientDbItems, ...syncedItems];

    await params.db.put(params.dataStore, finalClientDbItems);

    const stateItems = params.options?.fromServer
      ? syncedItems
      : finalClientDbItems.filter((i) => i.syncStatus != SyncStatus.DELETED);

    if (params.deletedItems?.length) {
      params.stateUpdateFunctionDeleted();
    }

    params.stateUpdateFunction(stateItems);
  } catch (error) {
    console.error('Client DB Sync Error:', (error as DatabaseError).message);
    throw error;
  }
};

function dedupeBy<T, K>(arr: T[], key: (item: T) => K): T[] {
  return Array.from(new Map(arr.map((i) => [key(i), i])).values());
}

const RECENT_THRESHOLD_MS = 10_000; // 10 seconds (tune this)

const isRecent = (date: string | Date) => {
  const t = new Date(date).getTime();
  return Date.now() - t < RECENT_THRESHOLD_MS;
};
