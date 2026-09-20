# Orhideia Photography - Project Architecture

## Overview
Orhideia Photography is a Next.js 14 photography studio website built for a small town in Ukraine (Збараж). The site features Ukrainian language translation, booking system, contact forms, and portfolio display.

## Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Backend & Database
- **Supabase** - PostgreSQL database for bookings
- **Resend API** - Transactional email service

### Deployment
- **Netlify** - Hosting platform
- **Netlify CLI** - Deployment tool

## Project Structure

```
Orhideia/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── portfolio/         # Portfolio page
│   ├── contact/           # Contact page
│   ├── book/              # Booking page
│   ├── booking-confirmed/ # Booking confirmation page
│   ├── blog/              # Blog page
│   └── api/               # API routes
│       ├── book/          # Booking API
│       ├── confirm-booking/ # Booking confirmation
│       ├── availability/  # Time slot availability
│       └── contact/       # Contact form API
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Main navigation
│   ├── Footer.tsx         # Footer component
│   ├── PageHero.tsx       # Page hero banner
│   └── ImageCarousel.tsx # Image carousel
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Supabase client
│   ├── placeholders.ts    # Placeholder images
│   └── googleSheets_new.ts # Legacy (unused)
├── public/                # Static assets
│   └── hero_home.png      # Hero image
├── docs/                  # Project documentation
├── .env                   # Environment variables (local)
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
├── netlify.toml          # Netlify configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies
```

## Core Features

### 1. Booking System
- **Flow**: User fills form → Pending booking created → Email confirmation sent → User clicks link → Booking confirmed
- **Database Tables**:
  - `bookings` - Confirmed bookings
  - `pending_bookings` - Temporary bookings awaiting confirmation
- **Time Slots**: 9:00-17:00 (hourly)
- **Expiration**: 24 hours for confirmation

### 2. Contact Form
- Fields: Name, partner name, email, phone, session type, date, referral, venue, importance
- Email sent to: galynasovyk@gmail.com
- Validation: Required fields, email format, phone format

### 3. Portfolio
- Grid layout with placeholder images from Unsplash
- Responsive design (1-3 columns)
- Hover effects

### 4. Blog
- Static blog posts with placeholder content
- Ukrainian language
- Featured image carousel

### 5. Navigation & Footer
- Ukrainian menu items
- Responsive mobile menu
- Location: Збараж, Україна

## API Routes

### POST /api/book
Creates a pending booking and sends confirmation email.

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "serviceType": "string",
  "notes": "string"
}
```

**Response**: Success message or error

### GET /api/availability
Returns available time slots for a given date.

**Query Params**: `date=YYYY-MM-DD`

**Response**: Array of available time slots

### GET /api/confirm-booking
Confirms a pending booking via email link.

**Query Params**: `token=string`

**Response**: Redirects to booking-confirmed page

### POST /api/contact
Sends contact form email.

**Request Body**: Contact form fields

**Response**: Success or error message

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `RESEND_API_KEY` - Resend API key
- `NEXT_PUBLIC_BASE_URL` - Base URL for email links (e.g., https://orhideia.netlify.app)

## Database Schema

### bookings Table
- id
- client_name
- client_email
- phone_number
- booking_date
- booking_time
- service_type
- additional_notes
- created_at

### pending_bookings Table
- id
- client_name
- client_email
- phone_number
- booking_date
- booking_time
- service_type
- additional_notes
- confirmation_token
- expires_at
- created_at

## Styling System

### Custom Classes
- `page-title` - Large page heading
- `section-label` - Small uppercase label
- `btn-primary` - Primary button style
- `form-label` - Form field label
- `form-input` - Form input field
- `form-select` - Form select dropdown
- `nav-link` - Navigation link
- `text-muted` - Muted text color
- `text-muted-dark` - Darker muted text
- `text-gold` - Gold accent color
- `tracking-ultra` - Extra letter spacing
- `tracking-widest` - Wide letter spacing

### Color Palette
- Primary: #333 (dark gray)
- Accent: Gold
- Background: #F5F5F5 (light gray)
- White: #FFFFFF
- Muted: #666

## Deployment

### Build Command
```bash
npm run build
```

### Deploy Command
```bash
netlify deploy --prod
```

### Netlify Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Language & Localization

- **Primary Language**: Ukrainian
- **Location**: Збараж, Україна
- **Time Format**: 24-hour format (9:00, 10:00, etc.)
- **Date Format**: Ukrainian locale (uk-UA)

## Known Issues

- Dynamic server usage warnings for API routes using `nextUrl.searchParams` (expected behavior, not blocking)
- Legacy Google Sheets integration file exists but is unused

## Future Enhancements

Potential improvements:
- Add real portfolio images
- Implement blog CMS
- Add multi-language support
- Improve mobile experience
- Add analytics
- Implement admin dashboard for bookings

## Contact Information

- **Email**: galynasovyk@gmail.com
- **Phone**: +380971462799
- **Location**: Збараж, Україна
- **Live URL**: https://orhideia.netlify.app
- **GitHub**: https://github.com/HulumyluU/Orchidelia
