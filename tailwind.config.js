/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
    },
    extend: {
      colors: {
        'lg-red': {
          DEFAULT: '#A50034',
          deep: '#6E0A26',
          dark: '#4A0719',
          soft: '#C8385F',
        },
        'champagne-gold': {
          DEFAULT: '#D9A441',
          light: '#EFD29A',
          bright: '#F5B942',
          deep: '#8F6516',
        },
        ink: {
          DEFAULT: '#231F20',
          soft: '#4B4548',
          mute: '#7A7275',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', '"Pretendard Variable"', 'Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display Variable"', '"Pretendard Variable"', 'Georgia', 'serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(120, 20, 50, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'glass-sm': '0 2px 10px rgba(120, 20, 50, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
        glow: '0 0 0 1px rgba(165, 0, 52, 0.55), 0 0 22px rgba(245, 185, 66, 0.45)',
        column: '0 0 90px rgba(60, 0, 20, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #A50034 0%, #D9486B 45%, #F5B942 100%)',
        'gold-sheen': 'linear-gradient(135deg, #F8E3B0 0%, #E7B965 50%, #F5D68F 100%)',
        'title-gradient': 'linear-gradient(100deg, #4A0719 0%, #6E0A26 45%, #9C1A41 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      maxWidth: {
        app: '430px',
      },
    },
  },
  plugins: [],
}
