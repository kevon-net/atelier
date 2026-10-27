import type { CollectionConfig } from 'payload';

export const Inquiries: CollectionConfig = {
  slug: 'inquiries', // Naming map
  admin: {
    useAsTitle: 'subject', // To display in the admin panel list view
    defaultColumns: ['subject', 'name', 'email', 'createdAt'],
    group: 'User Activity',
  },
  timestamps: true, // Automatically adds and manages createdAt and updatedAt
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text', // text instead of email (validation will be handled client-side)
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
};
