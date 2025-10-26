/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/index.tsx", "./app/components/**/*.{js,jsx,ts,tsx}", "./app/screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: { extend: {
    colors: {
      primary: '#5B7E98',
    },
  }, 
},
  plugins: [],
};