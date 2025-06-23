/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        accent: 'hsl(200, 70%, 70%)',
        Lime: 'hsl(61, 20%, 52%)',
        Wed: 'hsl(4, 69%, 50%)',
        White: 'hsl(0, 0%, 100%)',
        Slate50: '#f8fafc',
        Slate100: 'hsl(202, 86%, 94%)',
        Slate300: 'hsl(203, 41%, 72%)',
        Slate500: 'hsl(200, 26%, 54%)',
        Slate700: 'hsl(200, 24%, 40%)',
        Slate800: '#314158',
        Slate900: 'hsl(202, 55%, 16%)',
        Slate900Transparent: 'hsl(202, 55%, 16%, 80%)',
      },
    },
  },
  plugins: [],
}
