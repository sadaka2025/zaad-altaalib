/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      // Fonts
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        arabic: ['"Cairo"', 'sans-serif'],
        amiri: ['Amiri', 'serif'], // ✅ ajout de la police Amiri
      },

      // Keyframes pour l'animation des sphères
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-3deg)' },
        },
      },

      // Animation
      animation: {
        'float-sphere1': 'float1 15s ease-in-out infinite',
        'float-sphere2': 'float2 15s ease-in-out infinite 3s',
        'float-sphere3': 'float3 15s ease-in-out infinite 6s',
      },

      // Background radial
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(circle at 30% 30%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [scrollbar],
};
