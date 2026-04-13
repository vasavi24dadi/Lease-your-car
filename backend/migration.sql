-- Migrate bookings table for distance-based pricing
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS distance DECIMAL(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS price_per_km DECIMAL(10,2);
ALTER TABLE bookings ALTER COLUMN total_price TYPE DECIMAL(10,2);

-- Set default times for existing records
UPDATE bookings SET start_time = '09:00'::time WHERE start_time IS NULL;
UPDATE bookings SET end_time = '17:00'::time WHERE end_time IS NULL;

-- Make time columns required
ALTER TABLE bookings ALTER COLUMN start_time SET NOT NULL;
ALTER TABLE bookings ALTER COLUMN end_time SET NOT NULL;

-- Check cars table and update if needed
-- Assuming cars table might have old price_per_day column, we'll add price_per_km if missing
ALTER TABLE cars ADD COLUMN IF NOT EXISTS price_per_km DECIMAL(10,2);

-- If there are existing price_per_day values, copy them as estimated price_per_km
-- (This is a rough conversion: assuming 50km average trip per day)
UPDATE cars SET price_per_km = (price_per_day::DECIMAL / 50) WHERE price_per_km IS NULL AND price_per_day IS NOT NULL;
