import Image from 'next/image';

interface PageHeroProps {
  title: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function PageHero({ title, imageSrc, imageAlt = '' }: PageHeroProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-ultra text-white">
          {title}
        </h1>
      </div>
    </div>
  );
}
