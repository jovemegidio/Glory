/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#b8d4fe',
          300: '#85b8fd',
          400: '#4a94fa',
          500: '#1a6df5',
          600: '#0d52d6',
          700: '#0f41ae',
          800: '#133890',
          900: '#153276',
          950: '#0e1f4d',
        },
        accent: {
          50: '#fdf4f3',
          100: '#fce7e4',
          200: '#fad3cd',
          300: '#f5b3a9',
          400: '#ed8677',
          500: '#e15d4c',
          600: '#cd4130',
          700: '#ac3425',
          800: '#8e2e22',
          900: '#762b22',
          950: '#40130e',
        },
        gold: {
          50: '#fefbe8',
          100: '#fef7c3',
          200: '#feee89',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
