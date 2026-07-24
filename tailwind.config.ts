import type { Config } from "tailwindcss";

export default {
  darkMode: "media",
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    borderRadius: {
      none: "0px",
      DEFAULT: "0px",
      sm: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      "3xl": "0px",
      full: "0px",
    },
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "sans-serif"],
        grotesk: ["Bebas Neue", "sans-serif"],
        manrope: ["IBM Plex Sans", "sans-serif"],
      },
      colors: {
        yellow: {
          brand: "#143DFF",
          DEFAULT: "#143DFF",
        },
        black: {
          brand: "#FFFFFF",
          DEFAULT: "#FFFFFF",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
        border: "#FFFFFF",
        input: "#FFFFFF",
        ring: "#143DFF",
        background: "#143DFF",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#143DFF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          foreground: "#143DFF",
        },
        primaryWarm: {
          DEFAULT: "#FFF3E0",
          foreground: "#2B1F14",
        },
        secondaryDeep: {
          DEFAULT: "#D62828",
          foreground: "#FFF3E0",
        },
        muted: {
          DEFAULT: "#143DFF",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#143DFF",
          foreground: "#FFFFFF",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 30s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "blink": "blink 1s step-end infinite",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
