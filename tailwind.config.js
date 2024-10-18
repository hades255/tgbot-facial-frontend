/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "image-check": {
          "0%, 100%": { transform: "translate(0)", opacity: 0.8 },
          "50%": { transform: "translateY(100%)", opacity: 0.8 },
        },
        toastIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        toastOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "image-check": "image-check 12s infinite",
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
