import React from 'react';
import { getPost } from '@savour/handlers/data/posts';
import { RichText } from '@payloadcms/richtext-lexical/react';

export default async function PagePost({ postId }: { postId: string }) {
  const { data, error } = await getPost(postId);

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
