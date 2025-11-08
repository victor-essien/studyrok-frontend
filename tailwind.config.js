/** @type {import('tailwindcss').Config} */
export default {
  // Include index.html and all source files where Tailwind classes may appear
  // (TSX/TS/JSX/JS and HTML). The previous glob only matched .html and .js
  // under src which misses React TSX files, so no utilities were generated.
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
