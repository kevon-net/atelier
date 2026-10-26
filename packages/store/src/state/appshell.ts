import { create } from 'zustand';

export type AppShellChild = {
  navbar: boolean;
  aside: boolean;
};

export type AppShell = {
  navbar: boolean;
  aside: boolean;
  child: AppShellChild;
};

export type AppShellValue = AppShell | null | undefined;

interface AppShellState {
  appshell: AppShellValue;
  setAppShell: (data: AppShellValue) => void;
  clearAppShell: () => void;

  toggleNavbar: () => void;
  toggleAside: () => void;
  toggleNavbarChild: () => void;
  toggleAsideChild: () => void;
}

export const useStoreAppshell = create<AppShellState>((set) => ({
  appshell: undefined,

  setAppShell: (data) => {
    set((state) => {
      return { appshell: data };
    });
  },

  clearAppShell: () => {
    set(() => {
      return { appshell: null };
    });
  },

  toggleNavbar: () => {
    set((state) => {
      if (!state.appshell) return state;

      return {
        appshell: {
          ...state.appshell,
          navbar: !state.appshell?.child?.navbar,
        },
      };
    });
  },

  toggleAside: () => {
    set((state) => {
      if (!state.appshell) return state;

      return {
        appshell: {
          ...state.appshell,
          aside: !state.appshell?.child?.aside,
        },
      };
    });
  },

  toggleNavbarChild: () => {
    set((state) => {
      if (!state.appshell) return state;

      return {
        appshell: {
          ...state.appshell,
          child: {
            ...state.appshell.child,
            navbar: !state.appshell?.child?.navbar,
          },
        },
      };
    });
  },

  toggleAsideChild: () => {
    set((state) => {
      if (!state.appshell) return state;

      return {
        appshell: {
          ...state.appshell,
          child: {
            ...state.appshell.child,
            aside: !state.appshell?.child?.aside,
          },
        },
      };
    });
  },
}));
