# Orhideia Photo Studio Booking Website

A full-stack photo studio booking system with Google Sheets integration.

## Features

- **Studio Information Page**: Display services, opening hours, and contact details
- **Online Booking System**: Users can book appointments with real-time availability checking
- **Slot Locking**: Prevents double-booking of the same time slot
- **Google Sheets Integration**: All booking data is automatically stored in Google Sheets
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Google Sheets via API
- **Date Handling**: date-fns

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Sheets API

#### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

#### Step 2: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Sheets API for your project

#### Step 3: Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in the service account details
4. Click "Create and Continue"
5. Skip granting roles (optional)
6. Click "Done"

#### Step 4: Generate Service Account Key
1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create New Key"
4. Select "JSON" and click "Create"
5. Download the JSON file (keep it secure!)

#### Step 5: Share Google Sheet with Service Account
1. Open your Google Sheet
2. Click "Share"
3. Paste the service account email (from the JSON file, `client_email` field)
4. Grant "Editor" permissions

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in the values from your service account JSON file:
```
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_CLIENT_EMAIL=your_service_account_email@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**Important**: The `GOOGLE_PRIVATE_KEY` must include the `\n` characters for line breaks.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Booking Flow

1. **User selects date and time** → Frontend checks availability via `/api/availability`
2. **User submits booking form** → Data sent to `/api/book`
3. **Backend validates slot** → Checks Google Sheets for existing booking
4. **Slot locked** → If available, booking is added to Google Sheets
5. **Confirmation** → User receives success message

### Slot Locking Mechanism

- When a user selects a date, the system fetches all existing bookings for that date
- Time slots that are already booked are disabled in the UI
- When booking is submitted, the system double-checks availability before writing to Google Sheets
- This prevents race conditions where two users could book the same slot simultaneously

### Google Sheets Structure

The system automatically creates a "Bookings" sheet with these columns:
- Date
- Time
- Name
- Email
- Phone
- Service Type
- Notes
- Created At

## Customization

### Modify Opening Hours

Edit `app/components/StudioInfo.tsx` to change the opening hours display.

### Modify Time Slots

Edit `app/components/BookingForm.tsx` to change available time slots.

### Modify Services

Edit `app/components/BookingForm.tsx` to change available service types.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Make sure to set the environment variables in your hosting platform's settings.

## Security Notes

- Never commit `.env` file to version control
- Keep your Google service account key secure
- Consider implementing additional authentication for admin access
- Add rate limiting to prevent abuse in production

## Future Improvements

- User authentication
- Email notifications
- SMS reminders
- Payment integration
- Admin dashboard
- Calendar view
- Cancellation system
- Rescheduling feature
