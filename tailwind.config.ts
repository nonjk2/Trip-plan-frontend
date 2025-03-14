import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/swiper/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'var-primary-300': '#77A4FF',
        'var-primary-500': '#1C68FF',
        'var-primary-600': '#1653CC',
        'var-primary-50': '#F0F5FF',
        'var-enable': '#DEDEDE',
        'var-enable-400': '#B3B3B3',
        'var-enable-300': '#F7F7F7',
        'var-enable-text': '#939393',
        'var-enable-bg': '#F6F6F6',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        jalnan: ['Jalnan', 'sans-serif'],
        nanumSquare: ['NanumSquareOTF', 'sans-serif'],
      },

      spacing: {
        'btn-sm-y': '1.8rem',
        'btn-md-y': '1.4rem',
        'btn-lg-y': '2rem',
      },

      fontSize: {
        'btn-sm': '1.8rem',
        'btn-md': '1.4rem',
        'btn-lg': '2rem',
      },
      letterSpacing: {
        '2percent': '0.02em',
      },
      boxShadow: {
        container: '0 2px 16px rgba(0, 0, 0, 0.05)',
        reviewCard: '0px 0px 10px 0px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config;
