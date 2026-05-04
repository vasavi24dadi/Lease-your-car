-- Fix the schema mismatch in the cars table
-- The project moved to price_per_km, but the legacy price_per_day column might still have a NOT NULL constraint

ALTER TABLE cars ALTER COLUMN price_per_day DROP NOT NULL;

-- Ensure price_per_km exists and is NOT NULL (as it is the new standard)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cars' AND column_name='price_per_km') THEN
        ALTER TABLE cars ADD COLUMN price_per_km DECIMAL(10,2);
    END IF;
END $$;

-- Update existing records to have a price_per_km if they only have price_per_day
UPDATE cars SET price_per_km = (price_per_day::DECIMAL / 50) WHERE price_per_km IS NULL AND price_per_day IS NOT NULL;

-- Now make it NOT NULL if we want it to be mandatory
ALTER TABLE cars ALTER COLUMN price_per_km SET NOT NULL;
