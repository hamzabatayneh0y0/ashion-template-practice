/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx,scss,html}"],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["var(--font-arabic)"],
      },
      animation: {
        fade: "fade 1s ease-in-out forwards",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  darkMode: "class",
};
