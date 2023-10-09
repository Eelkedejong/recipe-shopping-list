/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    colors: {
      'black': '#333',
      'blue': '#6291F4'
    },
    extend: {
      fontFamily: {
        'titan-one': ['"Titan One"', 'regular'],
        'varela': ['"Varela Round"', 'regular'],
      }
    },
  },
  plugins: [],
}

