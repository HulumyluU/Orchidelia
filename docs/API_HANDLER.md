# API Handler Documentation

## Overview
This document describes all API routes in the Orhideia Photography project. All routes are located in `app/api/` directory and use Next.js 14 App Router.

## API Routes

### 1. Booking API (`/api/book`)

**Method**: POST  
**File**: `app/api/book/route.ts`

#### Description
Creates a pending booking and sends a confirmation email to the user. The booking must be confirmed via email link within 24 hours.

#### Request Body
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "date": "YYYY-MM-DD (required)",
  "time": "HH:MM (required)",
  "serviceType": "string (required)",
  "notes": "string (optional)"
}
```

#### Validation
- All required fields must be provided
- Email format validation
- Phone format validation (10+ digits, spaces, dashes, plus, parentheses allowed)
- Time slot must not be already booked
- Time(slot must not be pending confirmation

#### Response

**Success (200)**:
```json
{
  "message": "Лист підтвердження надіслано. Перевірте свою пошту для підтвердження бронювання."
}
```

**Error (400)** - Missing fields:
```json
{
  "error": "Всі обов'язкові поля мають бути заповнені"
}
```

**Error (409)** - Time slot taken:
```json
{
  "error": "Цей час вже заброньовано. Будь ласка, оберіть інший час."
}
```

**Error (409)** - Time slot pending:
```json
{
  "error": "Цей час очікує підтвердження. Будь ласка, оберіть інший час."
}
```

**Error (500)** - Server error:
```json
{
  "error": "Не вдалося створити бронювання"
}
```

#### Process Flow
1. Validate required fields
2. Check if time slot is already in `bookings` table
3. Check if time slot is in `pending_bookings` table
4. Generate confirmation token (32 bytes hex)
5. Insert into `pending_bookings` table with 24-hour expiration
6. Send confirmation email via Resend API
7. If email fails, delete pending booking
8. Return success message

#### Email Template
- Subject: "Підтвердьте ваше бронювання - Orhideia Photo Studio"
- Includes: Service type, date (Ukrainian locale), time, phone, notes
- Confirmation link with token
- Expiration notice (24 hours)
- Contact information

---

### 2. Confirm Booking API (`/api/confirm-booking`)

**Method**: GET  
**File**: `app/api/confirm-booking/route.ts`

#### Description
Confirms a pending booking via email link. Moves booking from `pending_bookings` to `bookings` table.

#### Query Parameters
- `token`: Confirmation token (required)

#### Response

**Success**: Redirects to `/booking-confirmed` page

**Error**: Redirects to home page with error

#### Process Flow
1. Extract token from query params
2. Find pending booking by token
3. Check if token is expired (expires_at < now)
4. Check if time slot is still available
5. Insert into `bookings` table
6. Delete from `pending_bookings` table
7. Redirect to confirmation page

---

### 3. Availability API (`/api/availability`)

**Method**: GET  
**File**: `app/api/availability/route.ts`

#### Description
Returns available time slots for a given date. Checks both confirmed and pending bookings.

#### Query Parameters
- `date`: Date in YYYY-MM-DD format (required)

#### Response

**Success (200)**:
```json
{
  "availableSlots": ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  "bookedSlots": ["10:00", "14:00"]
}
```

**Error (400)** - Missing date:
```json
{
  "error": "Date parameter is required"
}
```

**Error (500)** - Server error:
```json
{
  "error": "Failed to fetch availability"
}
```

#### Process Flow
1. Validate date parameter
2. Query `bookings` table for confirmed bookings on date
3. Query `pending_bookings` table for unexpired pending bookings on date
4. Combine booked times from both tables
5. Return all time slots minus booked slots

#### Time Slots
- 9:00 - 17:00 (hourly)
- 24-hour format
- Working hours: 9:00-17:00

---

### 4. Contact API (`/api/contact`)

**Method**: POST  
**File**: `app/api/contact/route.ts`

#### Description
Sends contact form submission as email to studio owner.

#### Request Body
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "partnerFirst": "string (optional)",
  "partnerLast": "string (optional)",
  "email": "string (required)",
  "phone": "string (required)",
  "sessionType": "string (required)",
  "date": "string (optional)",
  "referral": "string (required)",
  "venue": "string (optional)",
  "importance": "string (optional)"
}
```

#### Validation
- Required fields: firstName, lastName, email, phone, sessionType, referral
- Email format validation
- Phone format validation (10+ digits, spaces, dashes, plus, parentheses)

#### Response

**Success (200)**:
```json
{
  "success": true,
  "message": "Повідомлення успішно надіслано!"
}
```

**Error (400)** - Missing fields:
```json
{
  "error": "Будь ласка, заповніть усі обов'язкові поля"
}
```

**Error (400)** - Invalid email:
```json
{
  "error": "Будь ласка, введіть дійсну email адресу"
}
```

**Error (400)** - Invalid phone:
```json
{
  "error": "Будь ласка, введіть дійсний номер телефону"
}
```

**Error (500)** - Send failed:
```json
{
  "error": "Не вдалося надіслати повідомлення. Спробуйте ще раз."
}
```

#### Email Template
- Subject: "Нове повідомлення з контактної форми від [Name]"
- Recipient: galynasovyk@gmail.com
- Sections:
  - Contact information (name, email, phone)
  - Partner information (if provided)
  - Session details (type, date, referral)
  - Venue information (if provided)
  - Photography importance (if provided)

---

## Environment Variables

All API routes require these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_BASE_URL=https://orhideia.netlify.app
```

---

## Database Schema

### bookings Table
```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  service_type TEXT NOT NULL,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### pending_bookings Table
```sql
CREATE TABLE pending_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
```

---

## Error Handling

All API routes follow this error handling pattern:

1. Try-catch blocks for async operations
2. Console.error for debugging
3. User-friendly error messages in Ukrainian
4. Appropriate HTTP status codes:
   - 200: Success
   - 400: Bad request (validation errors)
   - 409: Conflict (duplicate/time slot taken)
   - 500: Internal server error

---

## Security Considerations

1. **Confirmation Tokens**: 32-byte hex strings for secure booking confirmation
2. **Expiration**: Pending bookings expire after 24 hours
3. **Double Booking Prevention**: Checks both confirmed and pending bookings
4. **Email Validation**: Regex pattern for email format
5. **Phone Validation**: Basic format validation
6. **Supabase RLS**: Row Level Security should be configured on Supabase

---

## Testing API Routes

### Test Booking API
```bash
curl -X POST https://orhideia.netlify.app/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+380971462799",
    "date": "2026-09-10",
    "time": "10:00",
    "serviceType": "Портретна фотографія",
    "notes": "Test booking"
  }'
```

### Test Availability API
```bash
curl "https://orhideia.netlify.app/api/availability?date=2026-09-10"
```

### Test Contact API
```bash
curl -X POST https://orhideia.netlify.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+380971462799",
    "sessionType": "Весільна фотографія",
    "referral": "Instagram"
  }'
```

---

## Known Issues

- Dynamic server usage warnings for API routes using `nextUrl.searchParams` (expected behavior, not blocking)
- No rate limiting implemented
- No CSRF protection (consider adding for production)

---

## Future Improvements

- Add rate limiting to prevent abuse
- Implement API key authentication for admin routes
- Add webhook notifications for new bookings
- Implement booking cancellation API
- Add rescheduling functionality
- Create admin API for booking management
