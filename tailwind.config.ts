import type { Config } from "tailwindcss";

const config: Config = {
  // STRICT CONSTRAINT: Light theme only. No dark mode variant or class.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // 20px mobile
        sm: "1.5rem",       // 24px
        md: "2rem",         // 32px
        lg: "2.5rem",       // 40px
        xl: "3rem",         // 48px desktop
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px", // max-width 1280px
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "#F8FAF9",
          subtle: "#F0F4F2",
          pure: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAF9",
          elevated: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          muted: "#64748B",
        },
        border: {
          DEFAULT: "#E2E8E4",
          light: "#EEF2F0",
          dark: "#CBD5CD",
        },
        primary: {
          DEFAULT: "#0F172A",
          hover: "#1E293B",
          foreground: "#FFFFFF",
        },
        wellness: {
          DEFAULT: "#1E5E4B", // Botanical Medical Sage Green
          hover: "#164738",
          light: "#E8F3EE",
          subtle: "#F2F7F4",
          secondary: "#7FA899",
          dark: "#12382C",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        elevated: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        dropdown: "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
        glow: "0 0 20px -3px rgba(113, 139, 120, 0.15)",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
