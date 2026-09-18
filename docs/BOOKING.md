# Booking System Documentation

## Overview
The booking system allows clients to schedule photography sessions through a two-step confirmation process. Users fill out a booking form, receive a confirmation email, and must click a link to confirm their booking within 24 hours.

## File Locations
- **Booking Page**: `app/book/page.tsx`
- **Confirmation Page**: `app/booking-confirmed/page.tsx`
- **Booking API**: `app/api/book/route.ts`
- **Confirmation API**: `app/api/confirm-booking/route.ts`
- **Availability API**: `app/api/availability/route.ts`

## Booking Flow

### Step 1: User Submits Booking Form
1. User navigates to `/book`
2. Fills out booking form with:
   - Full name
   - Email address
   - Phone number
   - Preferred date
   - Preferred time
   - Service type
   - Additional notes (optional)
3. Submits form
4. Form data sent to `/api/book`

### Step 2: Pending Booking Created
1. API validates input
2. Checks if time slot is available
3. Generates confirmation token (32-byte hex)
4. Creates pending booking in database with 24-hour expiration
5. Sends confirmation email to user

### Step 3: User Confirms via Email
1. User receives email with confirmation link
2. Link includes token: `/api/confirm-booking?token=...`
3. User clicks link

### Step 4: Booking Confirmed
1. API validates token
2. Checks if token is expired
3. Checks if time slot still available
4. Moves booking from `pending_bookings` to `bookings` table
5. Redirects user to `/booking-confirmed` page

## Booking Page (`/book`)

### Form Fields

#### Required Fields
- **Full Name** (Повне ім'я) - Client's full name
- **Email Address** (Email адреса) - Client's email
- **Phone Number** (Номер телефону) - Client's phone
- **Select Date** (Оберіть дату) - Preferred date (date picker)
- **Select Time** (Оберіть час) - Preferred time (dropdown)
- **Service Type** (Тип послуги) - Service selection

#### Optional Fields
- **Additional Notes** (Додаткові примітки) - Special requests

### Time Slots
Available time slots (24-hour format):
- 9:00
- 10:00
- 11:00
- 12:00
- 13:00
- 14:00
- 15:00
- 16:00
- 17:00

### Service Types
- Портретна фотографія (Portrait Photography)
- Фотографія подій (Event Photography)
- Комерційна фотографія (Commercial Photography)
- Весільна фотографія (Wedding Photography)
- Сімейний сеанс (Family Session)
- Корпоративні портрети (Corporate Headshots)

### Date Validation
- Minimum date: Today (using `date-fns` format)
- Cannot book past dates

### Availability Check
The form doesn't check availability in real-time, but the API will reject bookings for unavailable time slots.

### User Messages

#### Success
"Лист підтвердження надіслано! Перевірте свою пошту для підтвердження бронювання."

#### Error - Time Slot Booked
"Цей час вже заброньовано. Будь ласка, оберіть інший час."

#### Error - Time Slot Pending
"Цей час очікує підтвердження. Будь ласка, оберіть інший час."

#### Error - Validation
"Всі обов'язкові поля мають бути заповнені"

#### Error - Server
"Не вдалося створити бронювання"

### Booking Information Section
Located below the form, displays:
- Working hours: 9:00 - 17:00
- First-come, first-served policy
- Email confirmation requirement
- 24-hour expiration
- 24-hour cancellation policy

## Confirmation Email

### Email Content

#### Subject
"Підтвердьте ваше бронювання - Orhideia Photo Studio"

#### Greeting
"Шановний(а) [Name]"

#### Body
- Thank you message
- Request to confirm via button
- Booking details box:
  - Service type
  - Date (Ukrainian locale format)
  - Time
  - Phone
  - Notes (if provided)
- Confirmation button
- Expiration notice (24 hours)
- Ignore instruction if not requested

#### Footer
- Orhideia Photo Studio
- Збараж, Україна
- galynasovyk@gmail.com
- +1 (416) 555-0123

### Confirmation Link
Format: `${BASE_URL}/api/confirm-booking?token=${token}`

## Booking Confirmed Page (`/booking-confirmed`)

### Success Message
- **Heading**: "Бронювання підтверджено!"
- **Body**: "Ваш фотосеанс успішно заброньовано. Чекаємо на вас!"

### What's Next Section
Checklist of next steps:
- ✓ Ви отримаєте лист підтвердження з усіма деталями
- ✓ Будь ласка, прибути за 10 хвилин до запланованого часу
- ✓ Якщо вам потрібно змінити час, зв'яжіться з нами принаймні за 24 години
- ✓ Наша команда зв'яжеться з вами, якщо будуть будь-які зміни

### Action Buttons
- "Повернутися на головну" - Links to home page
- "Забронювати інший сеанс" - Links to booking page

### Visual Design
- Green checkmark icon in circle
- Clean, centered layout
- Gray background info box

## Database Schema

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

## API Endpoints

### POST /api/book
Creates pending booking and sends confirmation email.

**Request**: See API_HANDLER.md

### GET /api/availability
Checks available time slots for a given date.

**Request**: See API_HANDLER.md

### GET /api/confirm-booking
Confirms pending booking via email link.

**Request**: See API_HANDLER.md

## Styling

### Form Layout
- Maximum width: 800px
- Centered container
- White background with padding
- Two-column grid for some fields

### Typography
- Section label: "Заплануйте свій сеанс"
- Heading: "Забронюйте зустріч"
- Description: "Оберіть бажану дату та час для планування вашого фотосеансу"

### Colors
- Background: #F5F5F5
- Form background: White
- Button: Dark gray (#333)
- Success: Green
- Error: Red

## Validation

### Client-Side
- HTML5 required attributes
- Date min attribute (today)
- Required field indicators (red asterisk)

### Server-Side
- Required field validation
- Email format validation
- Phone format validation
- Time slot availability check
- Duplicate booking prevention

## Security

### Confirmation Tokens
- 32-byte hex strings
- Cryptographically random
- Unique per booking
- Single-use (deleted after confirmation)

### Expiration
- Pending bookings expire after 24 hours
- Expired bookings cannot be confirmed
- Automatic cleanup needed (not implemented)

### Double Booking Prevention
- Checks `bookings` table for confirmed bookings
- Checks `pending_bookings` table for unexpired pending bookings
- Returns 409 Conflict if slot unavailable

## User Experience

### Loading States
- Button shows "Обробка..." during submission
- Button disabled during submission
- Visual feedback with opacity change

### Error Handling
- Clear error messages in Ukrainian
- Form remains populated for retry
- Specific messages for different error types

### Success Flow
- Success message displayed
- Form cleared
- Instructions to check email

## Translation

All text is in Ukrainian:
- Page title: "Бронювання"
- Form labels: Ukrainian
- Service types: Ukrainian
- Time slots: 24-hour format
- Messages: Ukrainian
- Email content: Ukrainian

## Integration with Other Features

### Navigation
- Linked from main navigation menu
- Accessible via "Бронювання" link

### Footer
- Linked from footer navigation

### Home Page
- "Забронювати сеанс" button links to this page

## Future Enhancements

### User Experience
- Real-time availability checking
- Calendar view for date selection
- Time slot visual indicators
- Booking history for logged-in users
- Rescheduling functionality
- Cancellation functionality

### Admin Features
- Admin dashboard for booking management
- Manual booking creation
- Booking modification
- Cancellation handling
- Revenue tracking
- Client management

### Notifications
- SMS confirmation (in addition to email)
- Reminder emails (24 hours before)
- Cancellation notifications
- Rescheduling confirmations

### Payment
- Deposit requirement
- Online payment integration
- Invoice generation
- Payment history

### Calendar Integration
- Google Calendar sync
- iCal export
- Calendar feed for clients

## Known Issues

- No real-time availability checking (only on submit)
- No booking modification after confirmation
- No cancellation functionality
- No rescheduling option
- No deposit/payment system
- No client login/account system
- Expired pending bookings not auto-cleaned

## Dependencies

- `next` - Next.js framework
- `react` - React library
- `date-fns` - Date formatting
- `@/lib/supabase` - Supabase client
- `resend` - Email service
