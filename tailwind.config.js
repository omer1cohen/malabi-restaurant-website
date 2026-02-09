/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'malabi': {
          50:  '#fff1f4',
          100: '#ffe4ec',
          200: '#fecadd',
          300: '#fba8c9',
          400: '#f472b6', // primary
          500: '#ec5b9f',
          600: '#db3d86', // hover
          700: '#b52a6a',
          'cream': '#FFF8F3',
          'rose': '#FFE4E8',
          'pistachio': '#D6E8D0',
          'gold': '#FFD87A',
          'pomegranate': '#C94C6D',
          'cocoa': '#4A3728',
          'charcoal': '#5A5A5A'
        },
        'pistachio': {
          400: '#84cc16',
          500: '#65a30d'
        },
        // Design system colors
        'cream-white': '#FFF8F3',
        'rose-water': '#FFE4E8',
        'pistachio-mint': '#D6E8D0',
        'golden-saffron': '#FFD87A',
        'deep-pomegranate': '#C94C6D',
        'rich-cocoa': '#4A3728',
        'silk-cream': '#F9F6F0',
        'milk-swirl': '#FDF9F4',
        'soft-charcoal': '#5A5A5A',
        'delicate-gray': '#8B8680'
      },
      fontFamily: {
        'hebrew': ['Heebo', 'sans-serif'],
        'display': ['Heebo', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'luxury-pulse': 'luxuryPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'cart-bounce': 'cartBounce 0.4s ease-out',
        'pop': 'pop 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        luxuryPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.01)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        cartBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' }
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      boxShadow: {
        'luxury': '0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        'luxury-hover': '0 4px 16px rgba(0, 0, 0, 0.08), 0 16px 64px rgba(236, 72, 153, 0.15), 0 32px 80px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        'card': '0 4px 20px rgba(74, 55, 40, 0.08)',
        'card-hover': '0 8px 40px rgba(74, 55, 40, 0.12)'
      },
      backdropBlur: {
        'glass': '10px',
        'heavy': '20px'
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    },
  },
  plugins: [],
}
