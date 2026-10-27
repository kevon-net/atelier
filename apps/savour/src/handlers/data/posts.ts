import { supabaseClient } from '@repo/cloudbase';

export const getPosts = async () => {
  // Perform the operation
  const { data, error } = await supabaseClient
    .schema('cms_savour')
    .from('posts')
    .select('id, title, content, created_at, updated_at')
    .order('created_at', { ascending: false });

  // Handle error
  if (error) {
    console.log('RLS or Database Error:', error);
    return { data: null, error };
  }

  return { data, error: null };
};

export const getPost = async (postId: string) => {
  // Perform the operation
  const { data, error } = await supabaseClient
    .schema('cms_savour')
    .from('posts')
    .select('id, title, content, created_at, updated_at')
    .eq('id', postId)
    .maybeSingle();

  // Handle error
  if (error) {
    console.log('RLS or Database Error:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
};
