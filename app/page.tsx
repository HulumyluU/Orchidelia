import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel';
import { placeholderImages } from '@/lib/placeholders';

const videos = [
  '/video1.mp4',
  '/video2.mp4',
  '/video3.mp4',
  '/video4.mp4',
  '/video5.mp4',
];

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
          4 липня 2026
        </p>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light uppercase tracking-widest text-gray-800 max-w-4xl mx-auto leading-relaxed">
          Фотостудія в Збаражі
        </h2>
      </section>

      {/* Carousel Section */}
      <section className="py-8 md:py-12">
        <ImageCarousel />
      </section>

      {/* Video Section */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light uppercase tracking-widest text-gray-800 text-center mb-12">
            Наш процес роботи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Ваш браузер не підтримує відео.
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="py-16 md:py-24 px-6 text-center max-w-3xl mx-auto">
        <p className="section-label mb-6">
          Весільний фотограф Збараж, Україна
        </p>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest text-gray-800 mb-6 font-normal">
          Orhideia Photography
        </h1>
        <p className="section-label mb-12">
          Захоплення вашої справжньої сутності
        </p>

        <div className="font-serif text-gray-700 text-base md:text-lg leading-relaxed space-y-8">
          <p>
            Для багатьох думка про те, щоб опинитися перед камерою, може бути лякаючою.
            Але ви заслуговуєте на те, щоб почуватися комфортно на кожному етапі.
          </p>
          <p>Тож давайте зробимо це.</p>
          <p>
            Я заохочую індивідуальність, грайливість та спонтанність, щоб захопити ваші{' '}
            <strong className="font-semibold">щирі емоції</strong>,{' '}
            <strong className="font-semibold">особистість</strong> та{' '}
            <strong className="font-semibold">унікальний зв&apos;язок</strong>.
            Таким чином ви зможете насолоджуватися кожною секундою цього незабутнього досвіду.
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/book" className="btn-primary inline-block text-center">
            Забронювати сеанс
          </Link>
          <Link
            href="/portfolio"
            className="inline-block text-center px-8 py-3 uppercase text-xs tracking-widest text-gray-800 border border-gray-800 hover:bg-gray-800 hover:text-white transition-colors font-light"
          >
            Переглянути портфоліо
          </Link>
        </div>
      </section>
    </div>
  );
}
