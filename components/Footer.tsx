import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <div className="relative w-48 md:w-56 h-16 md:h-20 mx-auto">
              <Image
                src="/logo.jpg"
                alt="Orhideia Photography"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          {['Головна', 'Про нас', 'Портфоліо', 'Контакти', 'Блог'].map((item) => (
            <Link
              key={item}
              href={item === 'Головна' ? '/' : `/${item === 'Про нас' ? 'about' : item === 'Портфоліо' ? 'portfolio' : item === 'Контакти' ? 'book' : 'blog'}`}
              className="nav-link"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted font-light">
            Збараж
          </p>
          <p className="text-xs text-muted font-light">
            galynasovyk@gmail.com
          </p>
          <a 
            href="https://www.instagram.com/orchid_studio_zbarazh/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted font-light hover:text-gray-900 transition-colors"
          >
            @orchid_studio_zbarazh
          </a>
          <p className="text-xs text-muted font-light pt-4">
            &copy; {new Date().getFullYear()} Orhideia Photo Studio. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
