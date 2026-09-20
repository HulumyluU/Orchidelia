import Image from 'next/image';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholders';

const videos = [
  '/video1.mp4',
  '/video2.mp4',
  '/video3.mp4',
];

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
            Про нас
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="section-label mb-8">Фотограф Збараж</p>
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-widest text-gray-800 text-center mb-12 font-normal">
          Наша історія
        </h2>

        <div className="font-serif text-gray-700 text-base md:text-lg leading-relaxed space-y-8">
          <p>
            Заснована з пристрастю до захоплення найцінніших моментів життя, фотостудія Orhideia
            обслуговує клієнтів з відмінністю та майстерністю вже понад десятиліття. Наша команда
            досвідчених фотографів приносить креативність, технічну експертизу та гострий погляд на
            деталі в кожну зйомку.
          </p>
          <p>
            Ми віримо, що кожне фото розповідає історію, і ми зобов&apos;язані допомогти вам
            розповісти свою найкрасивішим чином. Від інтимних портретів до грандіозних подій,
            ми підходимо до кожного проекту з відданістю та ентузіазмом.
          </p>
          <p>
            Надавати виняткові фотографічні послуги, що перевищують очікування наших клієнтів,
            створюючи вічні образи, що зберігають спогади для майбутніх поколінь. Ми прагнемо
            зробити кожну фотосесію комфортним та приємним досвідом, що призводить до приголомшливих
            фотографій, які ви будете цінувати назавжди.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {[
            { title: 'Якість', desc: 'Ми ніколи не йдемо на компроміси щодо якості нашої роботи, використовуючи найкраще обладнання та техніки.' },
            { title: 'Креативність', desc: 'Ми приносимо свіжі перспективи та інноваційні підходи до кожного проекту.' },
            { title: 'Професіоналізм', desc: 'Ми підтримуємо найвищі стандарти професіоналізму у всіх наших взаєминах.' },
            { title: 'Задоволення клієнтів', desc: 'Ваше задоволення - наш пріоритет, і ми робимо все можливе для його досягнення.' },
          ].map((item) => (
            <div key={item.title} className="text-center py-8 px-4">
              <h3 className="text-xs uppercase tracking-widest text-gold mb-4 font-light">{item.title}</h3>
              <p className="font-serif text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/book" className="btn-primary inline-block">
            Забронювати сеанс
          </Link>
        </div>

        {/* Video Section */}
        <div className="mt-24">
          <h2 className="text-xl md:text-2xl font-light uppercase tracking-widest text-gray-800 text-center mb-12">
            Наш процес роботи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  src={video}
                  controls
                  className="w-full h-full object-cover"
                >
                  Ваш браузер не підтримує відео.
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
