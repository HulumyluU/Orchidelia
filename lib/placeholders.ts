const unsplash = (id: string, width: number, height?: number) => {
  const size = height ? `&w=${width}&h=${height}` : `&w=${width}`;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop${size}&q=90`;
};

export const placeholderImages = {
  hero: {
    studio: '/hero_home.png',
    wedding: unsplash('1519741497674-611481863552', 1600, 600),
    about: unsplash('1472099645785-5658abf4ff4e', 1600, 600),
  },
  carousel: [
    { src: unsplash('1519741497674-611481863552', 600, 900), alt: 'Wedding couple portrait' },
    { src: unsplash('1606216794074-735e91aa2c92', 600, 900), alt: 'Bride and groom embrace' },
    { src: unsplash('1606800052052-a08af7148866', 600, 900), alt: 'Wedding ceremony moment' },
    { src: unsplash('1519225421980-715cb0215aed', 600, 900), alt: 'Couple walking together' },
    { src: unsplash('1460978812857-470ed1c77af0', 600, 900), alt: 'Wedding celebration' },
    { src: unsplash('1511285560929-80b456fea0bc', 600, 900), alt: 'Romantic wedding portrait' },
  ],
  portfolio: [
    { id: 1, image: unsplash('1606800052052-a08af7148866', 600, 900), alt: 'Wedding ceremony', span: 'col-span-1 row-span-2' },
    { id: 2, image: unsplash('1519741497674-611481863552', 1200, 700), alt: 'Wedding couple', span: 'col-span-2 row-span-1' },
    { id: 3, image: unsplash('1606216794074-735e91aa2c92', 1200, 700), alt: 'Bride portrait', span: 'col-span-2 row-span-1' },
    { id: 4, image: unsplash('1519225421980-715cb0215aed', 600, 900), alt: 'Couple walking', span: 'col-span-1 row-span-2' },
    { id: 5, image: unsplash('1460978812857-470ed1c77af0', 1200, 600), alt: 'Wedding celebration', span: 'col-span-3 row-span-1' },
    { id: 6, image: unsplash('1531746020798-e6953c6e8e04', 600, 800), alt: 'Portrait session', span: 'col-span-1 row-span-1' },
    { id: 7, image: unsplash('1511285560929-80b456fea0bc', 800, 600), alt: 'Romantic portrait', span: 'col-span-2 row-span-1' },
  ],
  blog: [
    { id: 1, image: unsplash('1492684223066-81342ee5ff30', 1200, 700) },
    { id: 2, image: unsplash('1544005313-94ddf0286df2', 1200, 700) },
    { id: 3, image: unsplash('1519741497674-611481863552', 1200, 700) },
    { id: 4, image: unsplash('1523275335684-37898b6baf30', 1200, 700) },
    { id: 5, image: unsplash('1492691527719-9d1e07e534b4', 1200, 700) },
    { id: 6, image: unsplash('1531746020798-e6953c6e8e04', 1200, 700) },
  ],
} as const;
