# Contact Page Documentation

## Overview
The contact page allows potential clients to reach out to Orhideia Photography for inquiries about photography services. It's located at `/contact` and uses a client-side form that submits to the `/api/contact` API endpoint.

## File Location
- **Page**: `app/contact/page.tsx`
- **API**: `app/api/contact/route.ts`
- **Component**: Uses `PageHero` component for header

## Features

### 1. Contact Form
The form collects detailed information about potential clients and their photography needs.

#### Form Fields

**Required Fields:**
- **First Name** (Ім'я) - Client's first name
- **Last Name** (Прізвище) - Client's last name
- **Email** (Email) - Client's email address
- **Phone** (Телефон) - Client's phone number
- **Session Type** (Тип сеансу) - Dropdown selection
- **Referral** (Як ви про мене дізналися?) - How they found the studio

**Optional Fields:**
- **Partner's First Name** (Ім'я партнера) - For couples
- **Partner's Last Name** (Прізвище партнера) - For couples
- **Date** (Дата) - Preferred date for session
- **Venue** (Де ви одружуєтесь?) - Wedding/event venue information
- **Importance** (Наскільки важлива для вас весільна фотографія?) - Photography importance notes

#### Session Type Options
- Весільна фотографія (Wedding Photography)
- Портретний сеанс (Portrait Session)
- Фотографія подій (Event Photography)
- Комерційна фотографія (Commercial Photography)
- Інше (Other)

#### Referral Options
- Instagram
- Google пошук (Google Search)
- Рекомендація друга (Friend Referral)
- Wedding Wire
- Інше (Other)

### 2. Page Hero
- **Title**: "Контакти" (Contact)
- **Image**: Uses `placeholderImages.hero.wedding`
- **Alt**: "Wedding couple"

### 3. Introductory Text
The page includes welcoming text emphasizing inclusivity and diversity:

**Heading**: "Ви заслуговуєте на найкраще." (You deserve the absolute best.)

**Body Text**:
- Emphasizes diversity and inclusivity
- Welcomes couples of all backgrounds, genders, and identities
- Encourages clients to fill out the form
- Promises 48-hour response time

### 4. Contact Information Display
Located in the left column:
- **Location**: Збараж, Україна
- **Email**: galynasovyk@gmail.com
- **Phone**: +380971462799

## Form Validation

### Client-Side
- HTML5 required attribute on required fields
- Email type for email field
- Tel type for phone field

### Server-Side (API)
- Required field validation
- Email format validation (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Phone format validation (regex: `/^[\d\s\-\+\(\)]{10,}$/`)

## User Experience

### Loading State
- Button shows "Надсилання..." (Sending...) while submitting
- Button disabled during submission
- Visual feedback with opacity change

### Success Message
- Green background with success message
- "Повідомлення успішно надіслано! Ми зв'яжемося з вами протягом 48 годин."
- Form resets after successful submission

### Error Message
- Red background with error message
- Shows specific error from API
- Form remains populated for retry

## Styling

### Layout
- Two-column grid on desktop (md:grid-cols-5)
- Left column: Intro text and contact info (2/5)
- Right column: Contact form (3/5)
- Single column on mobile

### Colors
- Background: #F5F5F5 (light gray)
- Form background: White
- Success: Green-50 background, green-800 text
- Error: Red-50 background, red-800 text

### Typography
- Labels: `form-label` class (uppercase, tracking-widest)
- Inputs: `form-input` class
- Selects: `form-select` class
- Intro heading: text-sm uppercase tracking-widest
- Body text: font-serif, leading-relaxed

## API Integration

### Submission Flow
1. User fills form and clicks submit
2. Form data collected in state
3. POST request to `/api/contact`
4. API validates and sends email
5. Success/error message displayed
6. Form reset on success

### Request Payload
```json
{
  "firstName": "string",
  "lastName": "string",
  "partnerFirst": "string",
  "partnerLast": "string",
  "email": "string",
  "phone": "string",
  "sessionType": "string",
  "date": "string",
  "referral": "string",
  "venue": "string",
  "importance": "string"
}
```

## Email Notification

### Recipient
- galynasovyk@gmail.com

### Email Content
- Subject: "Нове повідомлення з контактної форми від [Name]"
- Sections:
  - Contact Information (name, email, phone)
  - Partner Information (if provided)
  - Session Details (type, date, referral)
  - Venue Information (if provided)
  - Photography Importance (if provided)

## Accessibility

### Form Labels
- All fields have associated labels
- Required fields marked with asterisk (*)
- Labels use `for` attribute linking to input IDs

### Keyboard Navigation
- Tab order follows visual layout
- Submit button accessible via keyboard
- Focus states on all interactive elements

### Screen Readers
- Semantic HTML structure
- ARIA labels where needed
- Error messages announced to screen readers

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Full-width inputs
- Stacked form fields

### Tablet (768px - 1024px)
- Two-column grid
- Adjusted padding
- Optimized spacing

### Desktop (> 1024px)
- Two-column grid (2/5 + 3/5)
- Maximum width container
- Enhanced spacing

## Translation

All text is in Ukrainian:
- Page title: "Контакти"
- Form labels: Ukrainian
- Button text: "Надіслати повідомлення"
- Messages: Ukrainian
- Intro text: Ukrainian

## Future Enhancements

- Add file upload for inspiration images
- Implement date picker for preferred date
- Add captcha/spam protection
- Save form data to localStorage for recovery
- Add real-time validation feedback
- Implement multi-step form for complex inquiries
- Add social media contact options
- Include map integration for location
