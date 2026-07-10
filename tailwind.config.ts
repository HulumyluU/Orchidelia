import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: "#B8956A",
          light: "#C9A87C",
        },
        muted: {
          DEFAULT: "#999999",
          dark: "#888888",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
    },
  },
  plugins: [],
};
export default config;
