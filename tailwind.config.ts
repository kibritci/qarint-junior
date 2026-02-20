import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E11D48",
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#E11D48",
          600: "#BE123C",
        },
        sidebar: {
          bg: "#FAFAFA",
          hover: "#F3F4F6",
          active: "#F1F1F1",
        },
      },
      fontFamily: {
        display: ['"Nunito"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        "funny-shake": {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "15%": { transform: "translateX(-12px) rotate(-5deg)" },
          "30%": { transform: "translateX(12px) rotate(3deg)" },
          "45%": { transform: "translateX(-8px) rotate(-3deg)" },
          "60%": { transform: "translateX(8px) rotate(2deg)" },
          "75%": { transform: "translateX(-4px) rotate(-1deg)" },
        },
        "flip-in": {
          "0%": { transform: "rotateY(90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" },
        },
        "pop-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float-up": {
          "0%": { transform: "translateY(100vh) scale(0.8)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-10vh) scale(1)", opacity: "0" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.15)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "spring-back": {
          "0%": { transform: "translateX(0)" },
          "30%": { transform: "translateX(-20px)" },
          "50%": { transform: "translateX(10px)" },
          "70%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)" },
        },
        "gold-dust": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-40px) scale(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(225, 29, 72, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(225, 29, 72, 0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
        },
      },
      animation: {
        "funny-shake": "funny-shake 0.6s ease-in-out",
        "flip-in": "flip-in 0.4s ease-out",
        "pop-in": "pop-in 0.3s ease-out",
        "float-up": "float-up 4s ease-in-out forwards",
        "bounce-in": "bounce-in 0.4s ease-out",
        "spring-back": "spring-back 0.5s ease-out",
        "gold-dust": "gold-dust 0.8s ease-out forwards",
        "pulse-glow": "pulse-glow 2s infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "wiggle": "wiggle 0.3s ease-in-out",
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'game': '0 8px 24px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
export default config;
