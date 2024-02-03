/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sign-up': "url('images/sign-up/signup.jpg')"
      }  
    },
  },
  plugins: [('flowbite/plugin')],
}