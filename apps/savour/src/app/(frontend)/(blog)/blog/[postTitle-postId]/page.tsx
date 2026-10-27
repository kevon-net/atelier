import React from 'react';
import { typeParams } from '../layout';
import { extractUuidFromParam } from '@repo/utils';
import { redirect } from 'next/navigation';
import { linkify } from '@repo/utils';

import PagePost from '@savour/ui/page/post';
import { createServerSupabaseClient } from '@repo/cloudbase';

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.schema('cms_savour').from('posts').select('id, title');

  if (error || data == null) return [];

  return data.map((p: any) => ({
    'postTitle-postId': `${linkify(p.title)}-${p.id}`,
  }));
}

export default async function Post({ params }: { params: Promise<typeParams> }) {
  const postId = extractUuidFromParam((await params)['postTitle-postId']);

  if (!postId) redirect('/not-found');

  return <PagePost postId={postId} />;
}
