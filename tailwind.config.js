/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      animation: {
        line: 'line-expand 5s ease-in-out infinite', // Line animation
      },
      keyframes: {
        'line-expand': {
          '0%, 100%': { width: '0%' }, // Starts and ends with 0% width
          '50%': { width: '100%' }, // Middle expands to full width
        },
      },
    },
  },
  plugins: [],
}





