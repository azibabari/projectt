/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6BAE75',
          dark: '#5a9362',
        },
        secondary: {
          DEFAULT: '#FBB034',
          dark: '#e69b23',
        },
        blue: {
          DEFAULT: '#1E3A8A',
        },
        gray: {
          light: '#F2F4F7',
        },
        accent: {
          DEFAULT: '#FF7043',
          dark: '#ff5722',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};