import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts', // Naming map
  admin: {
    useAsTitle: 'title', // To display in the admin panel list view
    defaultColumns: ['title', 'content', 'createdAt', 'updatedAt'],
    group: 'Content',
  },
  timestamps: true, // Automatically adds and manages createdAt and updatedAt
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
};
