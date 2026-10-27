import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import path from 'path';
import { fileURLToPath } from 'url';
import { isProduction } from '@repo/utils';

import { Users } from './collections/Users';
import { Posts } from './collections/Posts';
import { Inquiries } from './collections/Inquiries';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  serverURL: isProduction() ? 'http://localhost:3001' : 'http://localhost:3001',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    schemaName: 'cms_savour', // <--- Points to your schema
    // Force Payload to use uuid instead of serial if matching Prisma's UUID setup
    idType: 'uuid',
  }),

  editor: lexicalEditor(),

  routes: { admin: '/admin' },

  collections: [Users, Posts, Inquiries],

  plugins: [],
});
