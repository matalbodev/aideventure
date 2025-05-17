/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daisyui: {
    themes: [
      'light',
      'dark',
      // You can still keep default themes, but custom theme will be handled by the CSS
    ],
  },
  plugins: [require("daisyui")],
}
