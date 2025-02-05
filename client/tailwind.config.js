module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: ["1.4rem", { lineHeight: "2rem" }],
        sm: ["1.6rem", { lineHeight: "2.4rem" }],
        base: ["1.8rem", { lineHeight: "2.8rem" }],
        lg: ["2rem", { lineHeight: "3rem" }],
        xl: ["2.4rem", { lineHeight: "3.2rem" }],
        "2xl": ["3.2rem", { lineHeight: "4rem" }],
        "3xl": ["4rem", { lineHeight: "5rem" }],
        "4xl": ["4.8rem", { lineHeight: "5.6rem" }],
        "5xl": ["6.4rem", { lineHeight: "1" }],
        "6xl": ["8rem", { lineHeight: "1" }],
        "7xl": ["9.6rem", { lineHeight: "1" }],
      },
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateX(100%)", opacity: "0" },
        "100%": { transform: "translateX(0)", opacity: "1" },
      },
      slideOut: {
        "0%": { transform: "translateX(0)", opacity: "1" },
        "100%": { transform: "translateX(100%)", opacity: "0" },
      },
    },
    animation: {
      "slide-in": "slideIn 0.5s ease-out",
      "slide-out": "slideOut 0.5s ease-in",
    },
  },
  plugins: [],
};
