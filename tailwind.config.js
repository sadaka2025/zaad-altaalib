/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        arabic: ['"Cairo"', 'sans-serif'],
      },
    },
  },
  plugins: [scrollbar],
  plugins: [scrollbar],
variants: {
  scrollbar: ['rounded', 'dark'],
},

};
