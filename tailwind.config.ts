import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'var-primary-500': '#1C68FF',
        'var-primary-600': '#1653CC',
        'var-enable': '#DEDEDE',
        'var-enable-400': '#B3B3B3',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },

      spacing: {
        // 버튼 패딩 추가
        'btn-sm-y': '1.8rem',
        'btn-md-y': '1.4rem',
        'btn-lg-y': '2rem',
      },

      fontSize: {
        // 버튼 폰트 크기 추가
        'btn-sm': '1.8rem',
        'btn-md': '1.4rem',
        'btn-lg': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
