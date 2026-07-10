'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Book', href: '/book' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="bg-white fixed w-full top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-center py-5 md:py-6">
          <Link href="/" className="group flex-shrink-0">
            <span className="font-script text-3xl md:text-4xl text-gray-900 leading-none block">
              Orhideia
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-gray-600 font-light ml-1 block mt-0.5">
              Photography
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${
                  pathname === item.href ? 'text-gray-900 font-normal' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-gray-800 transition-transform ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-px bg-gray-800 transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-gray-800 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-link ${
                    pathname === item.href ? 'text-gray-900 font-normal' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
