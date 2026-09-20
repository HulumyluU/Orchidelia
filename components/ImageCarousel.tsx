'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholders';

export default function ImageCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {placeholderImages.carousel.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] h-[420px] md:h-[480px] lg:h-[540px] relative"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 280px, 360px"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 px-2">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="text-gray-800 hover:text-gray-600 transition-colors p-2"
          aria-label="Scroll left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="text-gray-800 hover:text-gray-600 transition-colors p-2"
          aria-label="Scroll right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
