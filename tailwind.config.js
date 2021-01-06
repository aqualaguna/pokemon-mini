const colors = require("tailwindcss/colors");

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose[800],
        pokeball: "#E3350D",
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["hover", "active"],
    },
  },
  plugins: [],
};
