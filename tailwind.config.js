/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b0bac3", 
        secondary: "#e6f3ff",
        yellow: "#f2d335", 
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
      fontSize: {
        sm: '14px',
        base: '18px',
        lg: '20px',
        xl: '26px',
      },
    },
  },
  plugins: [],
}
