import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the migration name from CLI arguments (e.g., pnpm db:migrate-create --name add_posts)
const args = process.argv.slice(2);
const nameIndex = args.indexOf('--name');
if (nameIndex === -1 || !args[nameIndex + 1]) {
  console.error('❌ Please provide a migration name using --name <migration_name>');
  process.exit(1);
}
const migrationName = args[nameIndex + 1];

try {
  console.log(`📦 Generating migration diff for: ${migrationName}...`);

  // Paths
  const supabaseMigrationsDir = path.join(
    __dirname,
    '../../../services/cloudbase/supabase/migrations',
  );

  // Generate a timestamp prefix for Supabase (Format: YYYYMMDDHHMMSS)
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-T:\.Z]/g, '')
    .slice(0, 14);
  const migrationFileName = `${timestamp}_${migrationName}.sql`;
  const targetSqlPath = path.join(supabaseMigrationsDir, migrationFileName);

  if (!fs.existsSync(supabaseMigrationsDir)) {
    fs.mkdirSync(supabaseMigrationsDir, { recursive: true });
  }

  const schemaPath = path.join(__dirname, '../prisma/schema.prisma');

  // Updated for Prisma v7+ using --from-config-datasource
  const diffCommand = `npx prisma migrate diff --from-config-datasource --to-schema "${schemaPath}" --script > "${targetSqlPath}"`;

  execSync(diffCommand, { stdio: 'inherit', shell: true });

  // Check if file was created and is not empty
  if (fs.existsSync(targetSqlPath)) {
    const stats = fs.statSync(targetSqlPath);
    if (stats.size === 0) {
      console.log(
        '⚠️ Warning: The generated migration file is empty. Did you make any changes to your schema?',
      );
      fs.unlinkSync(targetSqlPath); // Remove empty file
    } else {
      console.log(`✅ Successfully created Supabase migration:\n   -> ${targetSqlPath}`);
    }
  } else {
    console.error('❌ Failed to generate migration file.');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to create and sync migration:', error);
  process.exit(1);
}
