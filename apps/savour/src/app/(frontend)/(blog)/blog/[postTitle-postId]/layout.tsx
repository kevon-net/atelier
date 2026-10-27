import React from 'react';
import { LayoutMain } from '@repo/ui';
import { createServerSupabaseClient } from '@repo/cloudbase';
import { typeParams } from '../layout';
import { Metadata } from 'next';
import { extractUuidFromParam, linkify } from '@repo/utils';
import { BASE_URL, BRAND_NAME } from '@repo/constants';
import { images } from '@savour/constants/images';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<typeParams>;
}): Promise<Metadata> => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .schema('cms_savour')
    .from('posts')
    .select('id, title, content');

  if (error || data == null) console.error('[Error] Posts not found', error);

  const postId = extractUuidFromParam((await params)['postTitle-postId']);

  const post = data?.find((p) => p.id == postId);

  return {
    title: post?.title,
    description: post?.content,
    metadataBase: new URL(BASE_URL.SAVOUR),
    openGraph: {
      title: post?.title,
      description: post?.content,
      url: `${BASE_URL.SAVOUR}/blog/${linkify(post?.title || '')}-${post?.id}`,
      type: 'website',
      images: [
        {
          url: images.brand.icon.meta.light,
          width: 1200,
          height: 1200,
          alt: BRAND_NAME,
        },
      ],
    },
  };
};

export default function LayoutPost({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <LayoutMain>{children}</LayoutMain>;
}
