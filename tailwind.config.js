/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(109.6deg, rgba(0,56,68,1) 11.2%, #1f4351E5 42%, #07172EE5 71.5%, rgba(0,56,68,1) 100.2%)",
        "progress-bar": "linear-gradient(to right, #04C3FF, #79DEFE, #79DEFF)",
        "notify-item": "linear-gradient(to top, #A0C3C3A0, #79DEFE20, #79DEFF00)",
        "notify-new-item": "linear-gradient(to top, #04C3FFA0, #79DEFE20, #79DEFF80)",
      },
      keyframes: {
        "image-check": {
          "0%, 100%": { transform: "translate(0)", opacity: 0.1 },
          "50%": { transform: "translateY(100%)", opacity: 0.1 },
        },
        toastIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        toastOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        pulse: {
          "0%, 100%": { transform: "scale(100%)" },
          "50%": { transform: "scale(200%)", opacity: 0.8 },
        },
      },
      animation: {
        "image-check": "image-check 12s infinite",
        pulse: "pulse 1s infinite",
        toastIn: "toastIn 0.3s ease-out forwards",
        toastOut: "toastOut 0.3s ease-out forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({});
    },
  ],
};
