/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { 
      backgroundImage: {
      'onboard-2': "url('./src/assets/bg-onboard-2.jpg')",
      'onboard-3': "url('./src/assets/bg-onboard-3.jpg')",
      'onboard-4': "url('./src/assets/bg-onboard-4.jpg')",
      'onboard-5': "url('./src/assets/bg-onboard-5.jpg')",
      'onboard-6': "url('./src/assets/bg-onboard-6.jpg')",
    },
    boxShadow: {
      'big': ' 5px 4px 4px 3px rgba(223, 220, 239, 0.65)',
      'float': ' 10px 10px 9px -4px rgba(255,255,255,0.74)',
    },
    colors: {
      'light': '#FFFEF9',
      'dark': '#1A1A1A',
      'midLigth': '#D2D7D9',
    },
  },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {          
          "primary": "#005591",                   
          "secondary": "#497d91",                   
          "accent": "#ffcc1d",                   
          "neutral": "#4a5154",                   
          "base-100": "#011627",                   
          "info": "#26baff",                   
          "success": "#2dd4bf",                   
          "warning": "#F18805",                   
          "error": "#ca452c",
              },
      },
    ],
  },
};
