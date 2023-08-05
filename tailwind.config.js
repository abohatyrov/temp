/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages-sections/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#__next",
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-namu)', ...fontFamily.sans],
        namu: ['var(--font-namu)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
