/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        segoe: ['"Segoe UI"', "sans-serif"],
        crimson: ["Crimson Text", "serif"],
      },
    },
  },
  plugins: [],
};
