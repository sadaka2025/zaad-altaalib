/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,     // ✅ لتوسيط الحاوية تلقائيًا
      padding: "1rem",  // ✅ لإعطاء هامش داخلي جيد
    },
  },
  plugins: [],
};
