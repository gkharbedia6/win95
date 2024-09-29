/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'old_windows_green': '#118282',
        'old_windows_blue': '#03177F',
        'old_windows_gray': '#C3C3C3',
      },
      fontFamily: {
        'primary': ['W95FA', 'sans-serif'],
      },
    },
  },
  plugins: [],
}