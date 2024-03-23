/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        principal: ["Rubik", "sans-serif"],
      },
      colors: {
        blanco: "#ffffff",
        rojo: "#FF283F",
        bordo: "#6F0720",
        negro: "#0B0C0E",
        rosita: "#FF6F7F",
        gris: "#E1E3E5",
      },
    },
  },
  plugins: [],
};
