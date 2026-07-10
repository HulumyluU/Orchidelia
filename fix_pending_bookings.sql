-- Add missing columns to pending_bookings table
ALTER TABLE pending_bookings ADD COLUMN IF NOT EXISTS confirmation_token TEXT NOT NULL UNIQUE;
ALTER TABLE pending_bookings ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE NOT NULL;
ALTER TABLE pending_bookings ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add unique constraint if it doesn't exist
ALTER TABLE pending_bookings ADD CONSTRAINT IF NOT EXISTS unique_pending_appointment UNIQUE (booking_date, booking_time);

-- Create index on confirmation_token if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_confirmation_token ON pending_bookings(confirmation_token);

-- Create index on expires_at if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_expires_at ON pending_bookings(expires_at);
