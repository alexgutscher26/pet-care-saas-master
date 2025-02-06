-- Check auth.users id type and update if needed
DO $$ 
BEGIN
    -- Check if auth.users.id is text
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'auth'
        AND table_name = 'users' 
        AND column_name = 'id' 
        AND data_type = 'text'
    ) THEN
        -- Convert auth.users.id to UUID if it's text
        ALTER TABLE auth.users 
        ALTER COLUMN id TYPE uuid USING id::uuid;
    END IF;
END $$;
