import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@repo/cloudbase';
import { AUTH_ROUTE, URL_PARAM_NAME } from '@repo/constants';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  initialize: () => () => void;
  signOut: () => Promise<void>;
}

export const useStoreAuth = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isInitialized: false,

  initialize: () => {
    // Prevent duplicate listeners
    if (useStoreAuth.getState().isInitialized) {
      return () => {};
    }

    set({ isInitialized: true });

    // Fetch initial session persisted in localStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        session,
        user: session?.user ?? null,
        isLoading: false,
      });
    });

    // Subscribe to auth state events (signIn, signOut, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        isLoading: false,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  },

  signOut: async () => {
    set({ isLoading: true });

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
      window.location.href = `${AUTH_ROUTE.ERROR}?${URL_PARAM_NAME.ERROR}=${encodeURIComponent(error.message)}`;
    }

    set({ user: null, session: null, isLoading: false });
  },
}));
