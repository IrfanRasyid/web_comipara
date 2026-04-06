/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        manga: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        manga: {
          yellow: '#FFD166', // vibrant yellow from image
          blue: '#4A90E2', // strong blue from image
          red: '#EF476F',
          black: '#111111',
          white: '#F5EBDD',
          gray: '#E5E5E5',
          light: '#F8F9FA'
        }
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(17, 17, 17, 1)',
        'neo-hover': '8px 8px 0px 0px rgba(17, 17, 17, 1)',
        'neo-sm': '2px 2px 0px 0px rgba(17, 17, 17, 1)',
        'neo-white': '4px 4px 0px 0px rgba(245, 235, 221, 1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
