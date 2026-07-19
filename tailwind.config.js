/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070a12",
        panel: "#0d1320",
        primary: "#a3e635",
        neon: "#a3e635"
      },
      boxShadow: {
        premium: "0 26px 90px rgba(0, 0, 0, 0.45)",
        glow: "0 0 60px rgba(163, 230, 53, 0.2)"
      }
    }
  },
  plugins: []
};
