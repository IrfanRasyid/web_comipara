/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF80AB',
          50: '#FFF7FA',
          100: '#FFEAF1',
          200: '#FFD3E1',
          300: '#FFB8CF',
          400: '#FF9FC0',
          500: '#FF80AB', // primary pastel pink
          600: '#F86E9B',
        },
        pastel: {
          bg: '#FFF7FA',
          card: '#FFFFFF',
          border: '#F2E8F5',
          blue: '#D5E6F5',
          purple: '#E9D8FD',
          green: '#DFF3E3',
          yellow: '#FFF4CC'
        }
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(255, 128, 171, 0.25)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
