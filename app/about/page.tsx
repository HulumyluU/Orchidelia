import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholders';

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
      <div className="relative w-full h-[280px] md:h-[380px]">
        <Image
          src={placeholderImages.hero.about}
          alt="Photographer at work"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-light uppercase tracking-ultra text-white">
            About
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="section-label mb-8">Toronto Ontario Photographer</p>
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-gray-800 text-center mb-12 font-normal">
          Our Story
        </h2>

        <div className="font-serif text-gray-700 text-base md:text-lg leading-relaxed space-y-8">
          <p>
            Founded with a passion for capturing life&apos;s most precious moments, Orhideia Photo
            Studio has been serving clients with excellence and artistry for over a decade. Our team
            of experienced photographers brings creativity, technical expertise, and a keen eye for
            detail to every shoot.
          </p>
          <p>
            We believe that every photograph tells a story, and we&apos;re committed to helping you
            tell yours in the most beautiful way possible. From intimate portraits to grand events,
            we approach each project with dedication and enthusiasm.
          </p>
          <p>
            To provide exceptional photography services that exceed our clients&apos; expectations,
            creating timeless images that preserve memories for generations to come. We strive to
            make every photoshoot a comfortable, enjoyable experience that results in stunning
            photographs you&apos;ll cherish forever.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {[
            { title: 'Quality', desc: 'We never compromise on the quality of our work, using the best equipment and techniques.' },
            { title: 'Creativity', desc: 'We bring fresh perspectives and innovative approaches to every project.' },
            { title: 'Professionalism', desc: 'We maintain the highest standards of professionalism in all our interactions.' },
            { title: 'Customer Satisfaction', desc: 'Your satisfaction is our top priority, and we go above and beyond to achieve it.' },
          ].map((item) => (
            <div key={item.title} className="text-center py-8 px-4">
              <h3 className="text-xs uppercase tracking-widest text-gold mb-4 font-light">{item.title}</h3>
              <p className="font-serif text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/book" className="btn-primary inline-block">
            Book a Session
          </Link>
        </div>
      </div>
    </div>
  );
}
