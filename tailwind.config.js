/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { 
      backgroundImage: {
      'onboard': "url('./src/assets/background-home2.jpg')",
    },
    boxShadow: {
      'big': ' 5px 4px 4px 3px rgba(223, 220, 239, 0.65)',
    },
    colors: {
      'ligth': '#FFFEF9',
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
          "primary": "#2f126f",        
          "secondary": "#7f69f0",        
          "accent": "#14b8a6",        
          "neutral": "#23262e",        
          "base-100": "#131521",        
          "info": "#fe8fe3",        
          "success": "#2dd4bf",        
          "warning": "#fcd34d",        
          "error": "#db2777",
        },
      },
    ],
  },
};
