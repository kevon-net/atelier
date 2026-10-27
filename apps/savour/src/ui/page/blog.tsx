import React from 'react';
import { createServerSupabaseClient } from '@repo/cloudbase';

export default async function PageBlog() {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .schema('cms_savour')
    .from('posts')
    .select('id, title, content')
    .order('created_at', { ascending: false });

  return (
    <div>
      <p>PageBlog</p>

      <div>Error: {error?.message}</div>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  );
}
