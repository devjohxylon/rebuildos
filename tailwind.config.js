/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: "#FFF5F8",
          hotpink: "#FF69B4",
          lavender: "#C4B5FD",
          mint: "#67E8B5",
          butter: "#FDE68A",
          blush: "#FFB6C1",
          rose: "#FF8FAB",
          cream: "#FFF8F0",
          lilac: "#E8D5F5",
          sky: "#BAE6FD",
        },
      },
      fontFamily: {
        fredoka: ["Fredoka"],
        comic: ["ComicNeue"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
