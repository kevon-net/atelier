import React from 'react';
import { getPosts } from '@savour/handlers/data/posts';

export default async function PageBlog() {
  const { data, error } = await getPosts();

  return (
    <div>
      <p>PageBlog</p>

      <div>Error: {JSON.stringify(error)}</div>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  );
}
