# Changelog - Orhideia Photography

All notable changes to the Orhideia Photography project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Project documentation structure in `/docs` folder
- ARCHITECTURE.md with complete project overview
- TASKS.md for task queue management
- API_HANDLER.md with API documentation
- CONTACT.md with contact page documentation
- PORTFOLIO.md with portfolio page documentation
- BOOKING.md with booking system documentation
- CHANGELOG.md for tracking changes

## [1.0.0] - 2026-09-09

### Added
- Initial Next.js 14 project setup with App Router
- Home page with hero section and brand content
- About page with company story and values
- Portfolio page with image grid layout
- Contact page with comprehensive form
- Booking page with two-step confirmation system
- Booking confirmation page
- Blog page with placeholder posts
- Navigation component with mobile menu
- Footer component with links and contact info
- PageHero component for page headers
- ImageCarousel component for image display
- Supabase integration for database (bookings, pending_bookings tables)
- Resend API integration for email sending
- API routes:
  - POST /api/book - Create pending booking
  - GET /api/confirm-booking - Confirm booking via email
  - GET /api/availability - Check time slot availability
  - POST /api/contact - Send contact form email
- Netlify deployment configuration
- Environment variable setup (.env.example)
- Tailwind CSS styling
- TypeScript configuration
- Placeholder images from Unsplash

### Changed
- Translated entire website from English to Ukrainian
- Updated location from Toronto, Ontario to Збараж, Україна
- Changed time format from AM/PM to 24-hour format
- Updated all form labels and messages to Ukrainian
- Translated email templates to Ukrainian
- Updated date formatting to Ukrainian locale (uk-UA)

### Fixed
- Removed legacy Google Sheets integration file (lib/googleSheets_new.ts)
- Fixed build errors caused by Google Sheets constructor

### Security
- Implemented confirmation token system for booking verification
- Added 24-hour expiration for pending bookings
- Implemented double-booking prevention
- Added email and phone validation

### Deployment
- Deployed to Netlify (https://orhideia.netlify.app)
- Configured Netlify CLI deployment
- Set up environment variables on Netlify
- Configured Next.js plugin for Netlify

---

## Version Format

- **Major**: Breaking changes or major feature additions
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, small improvements

---

## Categories

### Added
New features or functionality

### Changed
Changes to existing functionality

### Deprecated
Soon-to-be removed features

### Removed
Removed features

### Fixed
Bug fixes

### Security
Security-related changes

### Deployment
Deployment and infrastructure changes

---

## Notes

- All dates are in YYYY-MM-DD format
- Changes are listed in reverse chronological order
- Each version includes a brief summary of changes
