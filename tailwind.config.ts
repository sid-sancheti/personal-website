/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oxanium: ["Oxanium", "sans-serif"],
        exo: ["Exo", "sans-serif"],
      }
    },
  },
  // plugins: [
  //   require("@tailwindcss/typography"),
  //   require("tailwind-scrollbar-hide"),
  // ],
};
