import PageHero from '@/components/PageHero';
import { placeholderImages } from '@/lib/placeholders';

export default function Book() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-[72px] md:pt-[80px]">
      <PageHero
        title="Контакти"
        imageSrc={placeholderImages.hero.studio}
        imageAlt="Photo studio"
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-white p-8 md:p-12 lg:p-16">
          <div className="text-center mb-12">
            <p className="section-label mb-4">Зв'яжіться з нами</p>
            <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-widest text-gray-800 font-normal">
              Контактна інформація
            </h2>
            <p className="font-serif text-gray-600 text-sm mt-4 leading-relaxed">
              Зв'яжіться з нами для планування вашого фотосеансу
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xs uppercase tracking-widest text-muted-dark font-light mb-3">
                Email
              </h3>
              <a 
                href="mailto:galynasovyk@gmail.com" 
                className="font-serif text-gray-700 text-sm hover:text-gray-900 transition-colors"
              >
                galynasovyk@gmail.com
              </a>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xs uppercase tracking-widest text-muted-dark font-light mb-3">
                Телефон
              </h3>
              <a 
                href="tel:+380971462799" 
                className="font-serif text-gray-700 text-sm hover:text-gray-900 transition-colors"
              >
                +380971462799
              </a>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-xs uppercase tracking-widest text-muted-dark font-light mb-3">
                Instagram
              </h3>
              <a 
                href="https://www.instagram.com/orchid_studio_zbarazh/" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-gray-700 text-sm hover:text-gray-900 transition-colors"
              >
                @orchid_studio_zbarazh
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xs uppercase tracking-widest text-muted-dark font-light mb-4 text-center">
              Локація
            </h3>
            <p className="font-serif text-gray-700 text-sm text-center">
              Збараж, Україна
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-xs uppercase tracking-widest text-muted-dark font-light mb-4 text-center">
              Робочий час
            </h3>
            <p className="font-serif text-gray-700 text-sm text-center">
              9:00 - 17:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
