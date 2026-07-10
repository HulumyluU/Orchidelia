import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholders';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
      <div className="py-16 md:py-24 px-6">
        <h1 className="page-title">Portfolio</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-2 md:px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 auto-rows-[250px] md:auto-rows-[300px]">
          {placeholderImages.portfolio.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden ${item.span}`}
            >
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
