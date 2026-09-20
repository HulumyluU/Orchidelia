import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholders';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
      <div className="py-16 md:py-24 px-6">
        <h1 className="page-title">Портфоліо</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-2 md:px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {placeholderImages.portfolio.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={400}
                height={600}
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
