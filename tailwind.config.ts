import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        petroleo: { DEFAULT: '#0E5A5F', escuro: '#0A4246', claro: '#2E7D80' },
        menta: { DEFAULT: '#9FE3C8', claro: '#DDF5EB', escuro: '#4FB892' },
        offwhite: '#FAF7F0',
        manteiga: { DEFAULT: '#FFE59A', claro: '#FFF4CF' },
        tinta: '#1F3436',
        coral: '#E4876B',
      },
      fontFamily: { sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'] },
      borderRadius: { '4xl': '2rem' },
      boxShadow: { card: '0 10px 30px -12px rgba(14, 90, 95, 0.25)' },
    },
  },
  plugins: [],
};
export default config;
