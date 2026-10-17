/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#090a0f',
        surface: '#12141c',
        f1: '#ff1801',
        cricket: '#1d72fe',
        football: '#00f59b',
      }
    },
  },
  plugins: [],
  daisyui: { themes: ["dark"] },
}
