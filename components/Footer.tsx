import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="font-script text-4xl text-gray-900 leading-none block">
              Orhideia
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-gray-600 font-light ml-1 block mt-1">
              Photography
            </span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          {['Головна', 'Про нас', 'Портфоліо', 'Бронювання', 'Контакти', 'Блог'].map((item) => (
            <Link
              key={item}
              href={item === 'Головна' ? '/' : `/${item === 'Про нас' ? 'about' : item === 'Портфоліо' ? 'portfolio' : item === 'Бронювання' ? 'book' : item === 'Контакти' ? 'contact' : 'blog'}`}
              className="nav-link"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted font-light">
            Збараж, Україна
          </p>
          <p className="text-xs text-muted font-light">
            galynasovyk@gmail.com
          </p>
          <p className="text-xs text-muted font-light pt-4">
            &copy; {new Date().getFullYear()} Orhideia Photo Studio. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
