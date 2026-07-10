import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel';
import { placeholderImages } from '@/lib/placeholders';

export default function Home() {
  return (
    <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
      {/* Hero Image */}
      <section className="w-full">
        <div className="relative w-full h-[280px] md:h-[380px] lg:h-[450px]">
          <Image
            src={placeholderImages.hero.studio}
            alt="Photo studio session"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Featured Blog Post Style Section */}
      <section className="py-16 md:py-20 px-6 text-center">
        <p className="text-xs uppercase tracking-ultra text-muted font-light mb-6">
          July 4, 2026
        </p>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light uppercase tracking-widest text-gray-800 max-w-4xl mx-auto leading-relaxed">
          Top Photography Studios in Toronto, Ontario
        </h2>
      </section>

      {/* Carousel Section */}
      <section className="py-8 md:py-12">
        <ImageCarousel />
      </section>

      {/* Brand Section */}
      <section className="py-16 md:py-24 px-6 text-center max-w-3xl mx-auto">
        <p className="section-label mb-6">
          Toronto Ontario Wedding Photographer
        </p>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest text-gray-800 mb-6 font-normal">
          Orhideia Photography
        </h1>
        <p className="section-label mb-12">
          Capturing the Authentic You
        </p>

        <div className="font-serif text-gray-700 text-base md:text-lg leading-relaxed space-y-8">
          <p>
            For many, the thought of getting in front of a camera can be daunting.
            But you deserve to feel comfortable every step of the way.
          </p>
          <p>So let&apos;s make that happen.</p>
          <p>
            I encourage individuality, playfulness, and spontaneity to capture your{' '}
            <strong className="font-semibold">candid emotion</strong>,{' '}
            <strong className="font-semibold">personality</strong>, and{' '}
            <strong className="font-semibold">one of a kind connection</strong>.
            That way you can enjoy every second of this once-in-a-lifetime experience.
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/book" className="btn-primary inline-block text-center">
            Book a Session
          </Link>
          <Link
            href="/portfolio"
            className="inline-block text-center px-8 py-3 uppercase text-xs tracking-widest text-gray-800 border border-gray-800 hover:bg-gray-800 hover:text-white transition-colors font-light"
          >
            View Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}
