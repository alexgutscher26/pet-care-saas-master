-- Enable RLS on all tables
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE vet_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pet_changes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create their own pets" ON pets;
DROP POLICY IF EXISTS "Users can view their own pets" ON pets;
DROP POLICY IF EXISTS "Users can update their own pets" ON pets;
DROP POLICY IF EXISTS "Users can delete their own pets" ON pets;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON pets TO authenticated;
GRANT ALL ON health_records TO authenticated;
GRANT ALL ON vet_appointments TO authenticated;
GRANT ALL ON pet_changes TO authenticated;

-- Pets policies
CREATE POLICY "Users can create their own pets"
ON pets FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()::uuid
);

CREATE POLICY "Users can view their own pets"
ON pets FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()::uuid
);

CREATE POLICY "Users can update their own pets"
ON pets FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()::uuid
)
WITH CHECK (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()::uuid
);

CREATE POLICY "Users can delete their own pets"
ON pets FOR DELETE
TO authenticated
USING (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()::uuid
);

-- Health Records policies
CREATE POLICY "Users can view their pets' health records"
ON health_records FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM pets
    WHERE pets.id = health_records.pet_id
    AND pets.user_id = auth.uid()::uuid
  )
);

CREATE POLICY "Users can create health records for their pets"
ON health_records FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pets
    WHERE pets.id = health_records.pet_id
    AND pets.user_id = auth.uid()::uuid
  )
);

-- Vet Appointments policies
CREATE POLICY "Users can view their pets' appointments"
ON vet_appointments FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM pets
    WHERE pets.id = vet_appointments.pet_id
    AND pets.user_id = auth.uid()::uuid
  )
);

CREATE POLICY "Users can create appointments for their pets"
ON vet_appointments FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pets
    WHERE pets.id = vet_appointments.pet_id
    AND pets.user_id = auth.uid()::uuid
  )
);

-- Pet Changes policies
CREATE POLICY "Users can view their pets' changes"
ON pet_changes FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM pets
    WHERE pets.id = pet_changes.pet_id
    AND pets.user_id = auth.uid()::uuid
  )
);

CREATE POLICY "Users can create changes for their pets"
ON pet_changes FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pets
    WHERE pets.id = pet_changes.pet_id
    AND pets.user_id = auth.uid()::uuid
  )
);
