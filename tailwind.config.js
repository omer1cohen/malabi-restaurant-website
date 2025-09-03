/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./menu.html", 
    "./order.html",
    "./simple.html",
    "./debug.html",
    "./assets/js/**/*.js"
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
        }
      },
      fontFamily: {
        'hebrew': ['Heebo', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'luxury-pulse': 'luxuryPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite'
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
        luxuryPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.01)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      boxShadow: {
        'luxury': '0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        'luxury-hover': '0 4px 16px rgba(0, 0, 0, 0.08), 0 16px 64px rgba(236, 72, 153, 0.15), 0 32px 80px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
      },
      backdropBlur: {
        'glass': '10px'
      }
    },
  },
  plugins: [],
}