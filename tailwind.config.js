/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Calm, soothing color palette
        ivory: '#FFFFF0',
        'warm-white': '#FEFDF8',
        'soft-beige': '#F7F5F0',
        'warm-beige': '#F5F5DC',
        sage: '#9CAF88',
        'sage-light': '#B8C9A8',
        'sage-dark': '#7D8C6F',
        charcoal: '#2C2C2C',
        'warm-gray': '#6B7280',
        'soft-gray': '#9CA3AF',
        muted: '#A1A1AA',
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        medium: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};