import { useEffect, useState } from 'react';
import { supabaseClient } from '@repo/cloudbase';
import { Folder } from '@repo/db';
import { useStoreAuth } from '@repo/store';

export const useCrudFolders = () => {
  const session = useStoreAuth((s) => s.session);

  const [error, setError] = useState<Partial<Error> | null>(null);
  const [resolvedData, setResolvedData] = useState<Partial<Folder>[] | null>(null);

  const addFolder = async (newFolderValues?: Partial<Folder>) => {
    // Optional: Check if a user is actually logged in first
    if (!session) {
      setError({ message: 'You must be logged in to create a folder.' });
      return;
    }

    if (error) setError(null);

    const now = new Date();

    // Perform the operation
    const { data, error: errorFolders } = await supabaseClient
      .schema('savour')
      .from('folders')
      .insert({
        name: newFolderValues?.name || 'New folder',
        location: newFolderValues?.location || 'random',
        created_at: newFolderValues?.createdAt || now,
        updated_at: newFolderValues?.updatedAt || now,
        profile_id: session.user.id, // required when RLS policy checks ownership
      })
      .select(); // returns the newly inserted row

    if (errorFolders) {
      setError(errorFolders);
      console.log('RLS or Database Error:', errorFolders.message);
      return { success: false, error: errorFolders };
    }

    // Update local state
    if (data) setResolvedData((prev) => [...(prev || []), data[0]]);
  };

  useEffect(() => {
    const getFolders = async () => {
      const { data, error: errorFolders } = await supabaseClient
        .schema('savour')
        .from('folders')
        .select('id, name, location')
        .order('created_at', { ascending: false });

      if (errorFolders) {
        console.log('RLS or Database Error:', errorFolders);
        setError(errorFolders);
        return;
      }

      setResolvedData(data);
    };

    getFolders();
  }, []);

  return { session, data: resolvedData, error, loading: !error && !resolvedData, addFolder };
};
