/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: {
          DEFAULT: "#ffffff",
        },
        green: {
          light: "#6fcf97",
          DEFAULT: "#154734",
          dark: "#219653",
          darker: "#1e874b",
        },
        primary: {
          DEFAULT: "#24292E",
        },
        warning: {
          DEFAULT: "#D1711C",
        },
        orange: {
          DEFAULT: "#E98300",
          dark: "#0B0B45",
        },
        red: {
          100: '#FFF5F5',
          200: '#FED7D7',
          300: '#FEB2B2',
          400: '#FC8181',
          500: '#F56565',
          600: '#E53E3E',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742A2A',
        },
        offWhite: {
          DEFAULT: "#fbf7f5",
        },
        grey: {
          DEFAULT: "#EAEAEA",
        }
      },
      extend: {
        boxShadow: {
          default: "0px 10px 20px rgba(150, 150, 187, 0.1)",
        },
        fontSize: {
          "2rem": "2rem",
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  