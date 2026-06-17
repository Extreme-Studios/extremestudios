/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070a12",
        panel: "#0d1320",
        primary: "#3b82f6",
        violet: "#8b5cf6"
      },
      boxShadow: {
        premium: "0 26px 90px rgba(0, 0, 0, 0.45)",
        glow: "0 0 60px rgba(59, 130, 246, 0.16)"
      }
    }
  },
  plugins: []
};
