import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold:   "#D4A017",
          blue:   "#2563EB",
          green:  "#10B981",
          orange: "#F59E0B",
          purple: "#8B5CF6",
        },
        bg: {
          primary:   "#FFFFFF",
          secondary: "#F2EDE7",
        },
        text: {
          primary:   "#111827",
          secondary: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glass:        "0 8px 32px rgba(0,0,0,0.08)",
        card:         "0 2px 12px rgba(0,0,0,0.04)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.10)",
        gold:         "0 8px 24px rgba(212,160,23,0.30)",
        blue:         "0 8px 24px rgba(37,99,235,0.25)",
      },
      animation: {
        "fade-in":   "fadeIn 0.5s ease-in-out",
        "slide-up":  "slideUp 0.6s ease-out",
        "float":     "float 4s ease-in-out infinite",
        "float-alt": "floatAlt 4.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:   { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:  { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float:    { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        floatAlt: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(8px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
