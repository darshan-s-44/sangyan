/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f0',
          100: '#feeddb',
          200: '#fedab6',
          300: '#fdbf86',
          400: '#fc9b51',
          500: '#fb7d26',
          600: '#ec6215',
          700: '#c44811',
          800: '#9c3915',
          900: '#7e3015',
        },
        navy: {
          800: '#0f172a',
          900: '#0a0f1d',
          950: '#050811',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
