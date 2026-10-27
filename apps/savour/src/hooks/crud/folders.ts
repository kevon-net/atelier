import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseClient } from '@repo/cloudbase';
import { Folder } from '@repo/db';
import { useStoreAuth } from '@repo/store';

export const useCrudFolders = () => {
  const session = useStoreAuth((s) => s.session);
  const queryClient = useQueryClient();

  // 1. Fetching data with automatic caching and background sync
  const {
    data: folders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .schema('savour')
        .from('folders')
        .select('id, name')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // 2. Mutation for adding a folder (automatically updates cache everywhere)
  const addFolderMutation = useMutation({
    mutationFn: async (newFolderValues?: Partial<Folder>) => {
      if (!session) throw new Error('You must be logged in to create a folder.');

      const now = new Date();
      const { data, error } = await supabaseClient
        .schema('savour')
        .from('folders')
        .insert({
          name: newFolderValues?.name || 'New folder',
          created_at: newFolderValues?.createdAt || now,
          updated_at: newFolderValues?.updatedAt || now,
          profile_id: session.user.id,
        })
        .select();

      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      // Instantly invalidates and refetches 'folders' across ALL components using it!
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });

  return {
    session,
    data: folders || [],
    error,
    loading: isLoading,
    addFolder: addFolderMutation.mutateAsync,
  };
};
