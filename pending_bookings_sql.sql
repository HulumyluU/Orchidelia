-- Create pending_bookings table
CREATE TABLE pending_bookings (
  id BIGSERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  service_type TEXT NOT NULL,
  additional_notes TEXT,
  confirmation_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add constraint to prevent duplicate pending bookings for same time slot
ALTER TABLE pending_bookings ADD CONSTRAINT unique_pending_appointment UNIQUE (booking_date, booking_time);

-- Create index on confirmation_token for faster lookups
CREATE INDEX idx_confirmation_token ON pending_bookings(confirmation_token);

-- Create index on expires_at for cleanup
CREATE INDEX idx_expires_at ON pending_bookings(expires_at);
