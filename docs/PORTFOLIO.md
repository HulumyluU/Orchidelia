# Portfolio Page Documentation

## Overview
The portfolio page showcases Orhideia Photography's work through a grid of images. It's located at `/portfolio` and uses placeholder images from Unsplash via the `placeholderImages` utility.

## File Location
- **Page**: `app/portfolio/page.tsx`
- **Image Source**: `lib/placeholders.ts`

## Features

### 1. Page Header
- **Title**: "Портфоліо" (Portfolio)
- **Style**: `page-title` class (large, centered, uppercase)
- **Padding**: py-16 md:py-24

### 2. Image Grid
Responsive grid layout displaying portfolio images.

#### Grid Configuration
- **Mobile (1 column)**: `grid-cols-1`
- **Desktop (3 columns)**: `md:grid-cols-3`
- **Gap**: `gap-1 md:gap-2`
- **Row Height**: `auto-rows-[250px] md:auto-rows-[300px]`
- **Max Width**: 1200px

#### Image Properties
- **Source**: `placeholderImages.portfolio` array
- **Fill**: Uses Next.js `fill` prop for responsive sizing
- **Object Fit**: `object-cover`
- **Hover Effect**: `group-hover:scale-105` (zoom on hover)
- **Transition**: `duration-700` (smooth animation)
- **Sizes**: `(max-width: 768px) 100vw, 33vw`

#### Image Spanning
Some images span multiple columns/rows for visual interest:
- `col-span-2` - Spans 2 columns
- `row-span-2` - Spans 2 rows
- Default - 1 column, 1 row

### 3. Placeholder Images
Currently uses placeholder images from Unsplash. Images are defined in `lib/placeholders.ts`:

```typescript
portfolio: [
  { id: 1, image: '...', alt: '...', span: '' },
  { id: 2, image: '...', alt: '...', span: 'col-span-2' },
  // ... more images
]
```

## Styling

### Layout
- Full-width container
- Centered with max-width constraint
- Responsive padding

### Typography
- Page title: Large, uppercase, centered
- Uses `page-title` custom class

### Colors
- Background: White
- No additional color accents (images provide visual interest)

### Effects
- Hover zoom effect on images
- Smooth transition (700ms)
- Scale from 1 to 1.05

## Responsive Design

### Mobile (< 768px)
- Single column grid
- Full-width images
- Row height: 250px
- Gap: 4px

### Desktop (>= 768px)
- Three column grid
- Images take 33vw width
- Row height: 300px
- Gap: 8px

## Image Optimization

### Next.js Image Component
- Automatic optimization
- Responsive sizing
- Lazy loading (not priority)
- WebP conversion when supported

### Image Sizes
- Mobile: 100vw (full viewport width)
- Desktop: 33vw (one-third viewport width)

## Accessibility

### Alt Text
- Each image has descriptive alt text
- Currently generic placeholder descriptions
- Should be updated with actual image descriptions

### Keyboard Navigation
- Images are decorative (no interactive elements)
- Focus states not applicable

### Screen Readers
- Alt text provides context
- Grid structure announced

## Current Limitations

### Placeholder Images
- Using Unsplash placeholder images
- Not actual client work
- Generic alt text
- Fixed set of images (6 total)

### No Interactivity
- Images are not clickable
- No lightbox/modal view
- No filtering or categorization
- No image details on click

## Future Enhancements

### Image Management
- Replace with real client portfolio images
- Add image upload functionality
- Implement CMS for portfolio management
- Add image categories (weddings, portraits, events, etc.)
- Support for image albums/collections

### Interactivity
- Add lightbox/modal for full-size viewing
- Implement image details on click
- Add image filtering by category
- Implement search functionality
- Add image sharing options

### User Experience
- Add loading skeletons for images
- Implement lazy loading with intersection observer
- Add image zoom on click
- Support for swipe gestures on mobile
- Add image captions/descriptions

### Performance
- Implement image CDN
- Add progressive image loading
- Optimize image sizes for different devices
- Implement image caching strategy

### SEO
- Add structured data for images
- Implement image sitemap
- Add meta tags for social sharing
- Optimize image file names
- Add image alt text optimization

## Translation

All text is in Ukrainian:
- Page title: "Портфоліо"

## Integration with Other Features

### Navigation
- Linked from main navigation menu
- Accessible via "Портфоліо" link

### Footer
- Linked from footer navigation

### Home Page
- "Переглянути портфоліо" button links to this page

## Code Structure

```tsx
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
      <div className="py-16 md:py-24 px-6">
        <h1 className="page-title">Портфоліо</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-2 md:px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 auto-rows-[250px] md:auto-rows-[300px]">
          {placeholderImages.portfolio.map((item) => (
            <div key={item.id} className={`relative overflow-hidden ${item.span}`}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Dependencies

- `next/image` - Next.js Image component
- `@/lib/placeholders` - Placeholder image data
