import React from 'react';
import { createServerSupabaseClient } from '@repo/cloudbase';
import { RichText } from '@payloadcms/richtext-lexical/react';

export default async function PagePost({ postId }: { postId: string }) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .schema('cms_savour')
    .from('posts')
    .select('id, title, content')
    .eq('id', postId)
    .maybeSingle();

  return (
    <div>
      <p>PagePost</p>

      <div>Error: {error?.message}</div>

      <div>Title: {JSON.stringify(data?.title) || error?.message}</div>
      <div>
        Content: <RichText data={data?.content} />
      </div>
    </div>
  );
}
