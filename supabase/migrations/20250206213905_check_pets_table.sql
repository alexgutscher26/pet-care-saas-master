-- Drop existing policies first
DROP POLICY IF EXISTS "Users can create their own pets" ON pets;
DROP POLICY IF EXISTS "Users can view their own pets" ON pets;
DROP POLICY IF EXISTS "Users can update their own pets" ON pets;
DROP POLICY IF EXISTS "Users can delete their own pets" ON pets;
DROP POLICY IF EXISTS "Users can view their pets' health records" ON health_records;
DROP POLICY IF EXISTS "Users can create health records for their pets" ON health_records;
DROP POLICY IF EXISTS "Users can view their pets' appointments" ON vet_appointments;
DROP POLICY IF EXISTS "Users can create appointments for their pets" ON vet_appointments;
DROP POLICY IF EXISTS "Users can view their pets' changes" ON pet_changes;
DROP POLICY IF EXISTS "Users can create changes for their pets" ON pet_changes;

-- Drop all foreign key constraints that reference pets.user_id
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tc.table_name, tc.constraint_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.constraint_column_usage ccu 
        ON tc.constraint_name = ccu.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
        AND (
            (tc.table_name = 'pets' AND ccu.column_name = 'id')
            OR (ccu.table_name = 'pets' AND tc.table_name IN ('health_records', 'vet_appointments', 'pet_changes'))
        )
    ) LOOP
        EXECUTE format('ALTER TABLE %I DROP CONSTRAINT %I', r.table_name, r.constraint_name);
    END LOOP;
END $$;

-- Fix user_id column type
DO $$ 
BEGIN
    -- Check if we need to alter the column type
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'pets' 
        AND column_name = 'user_id' 
        AND data_type = 'text'
    ) THEN
        -- Convert existing text values to UUID
        ALTER TABLE pets 
        ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
    END IF;
END $$;

-- Create extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create function for updating timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Recreate pets table if it doesn't exist
CREATE TABLE IF NOT EXISTS pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    breed TEXT,
    birth_date DATE
);

-- Create trigger for updating timestamp
DROP TRIGGER IF EXISTS update_pets_timestamp ON pets;
CREATE TRIGGER update_pets_timestamp
    BEFORE UPDATE ON pets
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Add back foreign key constraints
DO $$ 
BEGIN
    -- Add user_id foreign key
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_user' 
        AND table_name = 'pets'
    ) THEN
        ALTER TABLE pets
        ADD CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES auth.users(id)
        ON DELETE CASCADE;
    END IF;

    -- Add health_records foreign key
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'health_records_pet_id_fkey' 
        AND table_name = 'health_records'
    ) THEN
        ALTER TABLE health_records
        ADD CONSTRAINT health_records_pet_id_fkey
        FOREIGN KEY (pet_id)
        REFERENCES pets(id)
        ON DELETE CASCADE;
    END IF;

    -- Add vet_appointments foreign key
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'vet_appointments_pet_id_fkey' 
        AND table_name = 'vet_appointments'
    ) THEN
        ALTER TABLE vet_appointments
        ADD CONSTRAINT vet_appointments_pet_id_fkey
        FOREIGN KEY (pet_id)
        REFERENCES pets(id)
        ON DELETE CASCADE;
    END IF;

    -- Add pet_changes foreign key
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'pet_changes_pet_id_fkey' 
        AND table_name = 'pet_changes'
    ) THEN
        ALTER TABLE pet_changes
        ADD CONSTRAINT pet_changes_pet_id_fkey
        FOREIGN KEY (pet_id)
        REFERENCES pets(id)
        ON DELETE CASCADE;
    END IF;
END $$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON pets TO authenticated;
GRANT ALL ON health_records TO authenticated;
GRANT ALL ON vet_appointments TO authenticated;
GRANT ALL ON pet_changes TO authenticated;
