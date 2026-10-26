import { create } from 'zustand';

export type Network = {
  online: boolean;
};

export type NetworkValue = Network | undefined;

interface NetworkState {
  network: NetworkValue;
  setNetwork: (data: NetworkValue) => void;
  clearNetwork: () => void;

  setOnline: (data: Network['online']) => void;
}

export const useStoreNetwork = create<NetworkState>((set) => ({
  network: undefined,

  setNetwork: (data) => {
    set({ network: data });
  },

  clearNetwork: () => {
    set({ network: undefined });
  },

  setOnline: (data) => {
    set((state) => {
      return { network: { ...state, online: data } };
    });
  },
}));
