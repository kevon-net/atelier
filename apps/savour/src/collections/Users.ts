import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users', // Naming map
  auth: true,
  admin: {
    useAsTitle: 'email', // To display in the admin panel list view
  },
  timestamps: true, // Automatically adds and manages createdAt and updatedAt
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor'],
      defaultValue: 'admin',
      required: true,
    },
  ],
};
