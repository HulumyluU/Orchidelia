import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { placeholderImages } from '@/lib/placeholders';

const blogPosts = [
  {
    id: 1,
    title: 'Top Photography Studios in Toronto, Ontario',
    excerpt: 'Discover the best photography studios in Toronto and what makes each one unique for your special day.',
    date: 'July 4, 2026',
  },
  {
    id: 2,
    title: '10 Tips for Perfect Portrait Photography',
    excerpt: 'Learn the essential techniques for capturing stunning portraits that truly reflect your subject\'s personality.',
    date: 'June 15, 2024',
  },
  {
    id: 3,
    title: 'Behind the Scenes: Our Latest Wedding Shoot',
    excerpt: 'Take a peek behind the curtain as we share the story of capturing a beautiful summer wedding.',
    date: 'June 10, 2024',
  },
  {
    id: 4,
    title: 'The Art of Product Photography',
    excerpt: 'Discover how professional product photography can elevate your brand and increase sales.',
    date: 'June 5, 2024',
  },
  {
    id: 5,
    title: 'Lighting Techniques Every Photographer Should Know',
    excerpt: 'Master the fundamentals of lighting to take your photography skills to the next level.',
    date: 'May 20, 2024',
  },
  {
    id: 6,
    title: 'Preparing for Your Photo Session',
    excerpt: 'Everything you need to know to prepare for your upcoming photography session with us.',
    date: 'May 15, 2024',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
      <div className="py-16 md:py-24 px-6">
        <h1 className="page-title">Blog</h1>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pb-20 space-y-16 md:space-y-24">
        {blogPosts.map((post, index) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="relative w-full h-[240px] md:h-[320px] mb-8 overflow-hidden">
              <Image
                src={placeholderImages.blog[index].image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
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
