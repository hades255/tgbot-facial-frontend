/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(109.6deg, rgba(0,56,68,1) 11.2%, #1f4351E5 42%, #07172EE5 71.5%, rgba(0,56,68,1) 100.2%)",
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
