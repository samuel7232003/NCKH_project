/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'welcome-bg': "url('image/background.png')"
      }
    },
  },
  plugins: [],
}

