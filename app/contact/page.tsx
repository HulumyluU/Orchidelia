import PageHero from '@/components/PageHero';
import { placeholderImages } from '@/lib/placeholders';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-[72px] md:pt-[80px]">
      <PageHero
        title="Контакти"
        imageSrc={placeholderImages.hero.wedding}
        imageAlt="Wedding couple"
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-white p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column - Intro Text */}
            <div className="md:col-span-2">
              <h2 className="text-sm uppercase tracking-widest text-muted-dark font-light mb-8 leading-relaxed">
                Ви заслуговуєте на найкраще.
              </h2>
              <div className="font-serif text-gray-700 text-sm md:text-base leading-relaxed space-y-6">
                <p>
                  Чи плануєте ви інтимну втечу, грандіозне святкування або
                  щось між цим, я тут, щоб захопити суть вашої любовної історії.
                  Різноманітність та інклюзивність є в основі того, що я роблю – кожна любовна історія
                  унікальна і заслуговує на святкування. Я вітаю пари всіх походжень,
                  гендерів та ідентичностей.
                </p>
                <p>
                  Зв'яжіться з нами для планування вашого фотосеансу.
                  Не можу дочекатися, щоб почути про вашу любов та обговорити, як ми можемо зробити ваш
                  день незабутнім.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted font-light">
                  Збараж, Україна
                </p>
                <p className="text-xs text-muted font-light">
                  galynasovyk@gmail.com
                </p>
                <p className="text-xs text-muted font-light">
                  +380971462799
                </p>
              </div>
            </div>

            {/* Right Column - Contact Info Placeholder */}
            <div className="md:col-span-3">
              <div className="space-y-8">
                <h3 className="text-sm uppercase tracking-widest text-muted-dark font-light mb-6">
                  Контактна інформація
                </h3>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <p className="text-xs uppercase tracking-widest text-muted font-light mb-2">
                      Локація
                    </p>
                    <p className="font-serif text-gray-700 text-sm">
                      Збараж, Україна
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-4">
                    <p className="text-xs uppercase tracking-widest text-muted font-light mb-2">
                      Email
                    </p>
                    <p className="font-serif text-gray-700 text-sm">
                      galynasovyk@gmail.com
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-4">
                    <p className="text-xs uppercase tracking-widest text-muted font-light mb-2">
                      Телефон
                    </p>
                    <p className="font-serif text-gray-700 text-sm">
                      +380971462799
                    </p>
                  </div>

                  <div className="border-b border-gray-100 pb-4">
                    <p className="text-xs uppercase tracking-widest text-muted font-light mb-2">
                      Робочий час
                    </p>
                    <p className="font-serif text-gray-700 text-sm">
                      9:00 - 17:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
