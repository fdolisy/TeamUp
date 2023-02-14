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
  