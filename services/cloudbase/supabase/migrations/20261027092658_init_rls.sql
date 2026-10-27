-- Enable RLS on profiles
ALTER TABLE IF EXISTS savour.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
ON savour.profiles
FOR SELECT
USING (id = auth.uid());

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON savour.profiles
FOR UPDATE
USING (id = auth.uid())
WITH CHECK (id = auth.uid());


-- -- Enable RLS on other savour models:


-- Enable RLS on folders
ALTER TABLE IF EXISTS savour.folders ENABLE ROW LEVEL SECURITY;

-- Allow users to perform all actions (SELECT, INSERT, UPDATE, DELETE) only on their own folders
CREATE POLICY "Users can manage their own folders"
ON savour.folders
FOR ALL
USING (profile_id = auth.uid())
WITH CHECK (profile_id = auth.uid());
