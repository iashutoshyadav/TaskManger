/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#1a4d3c",
          DEFAULT: "#0F3D2E",
          dark: "#0a2a20",
        },
        accent: {
          light: "#4ade80",
          DEFAULT: "#22c55e",
          dark: "#16a34a",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}

