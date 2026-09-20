import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { placeholderImages } from '@/lib/placeholders';

const blogPosts = [
  {
    id: 1,
    title: 'Найкраща фотостудія в Збаражі',
    excerpt: 'Відкрийте найкращу фотостудію в Збаражі та що робить її унікальною для вашого особливого дня.',
    date: '4 липня 2026',
  },
  {
    id: 2,
    title: '10 порад для ідеальної портретної фотографії',
    excerpt: 'Вивчіть essential техніки для захоплення приголомшливих портретів, що справді відображають особистість вашого об\'єкта.',
    date: '15 червня 2024',
  },
  {
    id: 3,
    title: 'За лаштунками: Наша остання весільна зйомка',
    excerpt: 'Зазирніть за завісу, коли ми ділимося історією захоплення красивого літнього весілля.',
    date: '10 червня 2024',
  },
  {
    id: 4,
    title: 'Мистецтво фотографії продуктів',
    excerpt: 'Відкрийте, як професійна фотографія продуктів може підняти ваш бренд та збільшити продажі.',
    date: '5 червня 2024',
  },
  {
    id: 5,
    title: 'Техніки освітлення, які має знати кожен фотограф',
    excerpt: 'Опануйте основи освітлення, щоб підняти ваші фотографічні навички на новий рівень.',
    date: '20 травня 2024',
  },
  {
    id: 6,
    title: 'Підготовка до вашого фотосеансу',
    excerpt: 'Все, що вам потрібно знати, щоб підготуватися до вашого майбутнього фотосеансу з нами.',
    date: '15 травня 2024',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
      <div className="py-16 md:py-24 px-6">
        <h1 className="page-title">Блог</h1>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pb-20 space-y-16 md:space-y-24">
        {blogPosts.map((post, index) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden">
              <Image
                src={placeholderImages.blog[index]}
                alt={post.title}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
            <p className="text-xs uppercase tracking-ultra text-muted font-light mb-4 text-center">
              {post.date}
            </p>
            <h2 className="text-lg md:text-xl font-light uppercase tracking-widest text-gray-800 text-center mb-4 leading-relaxed">
              {post.title}
            </h2>
            <p className="font-serif text-gray-600 text-sm md:text-base text-center leading-relaxed max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
