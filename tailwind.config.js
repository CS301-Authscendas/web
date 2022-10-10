/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    letterSpacing: {
      widest: '.5em'
    },
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        custom: {
          blue: {
            default: '#5C73DB',
            light: '#4763E4',
            lighter: '#639cf7'
          },
          white: {
            light: '#F5F5F5',
            dark: '#F0F2F5'
          }
        }
      }
    }
  },
  plugins: []
};
