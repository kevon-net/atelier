-- ==========================================
-- 1. CMS_SAVOUR SCHEMA (Shared, Public Read-Only)
-- ==========================================

-- Allow anyone (anon + authenticated) to see/use the schema
GRANT USAGE ON SCHEMA cms_savour TO anon, authenticated;

-- Allow everyone to read existing tables
GRANT SELECT ON ALL TABLES IN SCHEMA cms_savour TO anon, authenticated;

-- Ensure future tables created by Payload CMS automatically grant read access to users
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA cms_savour
GRANT SELECT ON TABLES TO anon, authenticated;


-- ==========================================
-- 2. SAVOUR SCHEMA (User Data, Full Authenticated CRUD)
-- ==========================================

-- Allow authenticated users to use the schema (anon should NOT have access here)
GRANT USAGE ON SCHEMA savour TO authenticated;

-- Grant full CRUD permissions on existing tables to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA savour TO authenticated;

-- Ensure future tables created in 'savour' give full CRUD to authenticated users
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA savour
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;

-- Also grant usage on any sequences (like auto-incrementing IDs) in 'savour' to authenticated users
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA savour TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA savour
GRANT USAGE, SELECT ON SEQUENCES TO authenticated;
