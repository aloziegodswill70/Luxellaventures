/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#138A36",
        secondary: "#F4A300",
        surface: "#F9FAFB",
        dark: "#1F2937",
      },
    },
  },
  plugins: [],
};
