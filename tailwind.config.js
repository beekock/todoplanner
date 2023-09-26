/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        dimmed: 'rgba(0,0,0,0.2)',
        darkblue: 'rgb(21,37,64)',
        primary: '#f7cc31',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
