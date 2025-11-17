/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        uiu: {
          blue: "#0F2B5B",
          lightBlue: "#1E427F",
          crimson: "#E04F00",
          crimsonHover: "#BF360C",
          bg: "#F0F2F5",
          glass: "rgba(255, 255, 255, 0.85)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in": "slideIn 0.4s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slight": "bounceSlight 2s infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceSlight: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
