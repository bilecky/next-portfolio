import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector", // Wybieramy strategię selektora, aby ręcznie kontrolować tryb ciemny

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: ".5rem",
    },
    extend: {
      keyframes: {
        "modal-open": {
          "0%": {
            opacity: "0",
            transform: "translate(0, -10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0, 0)",
          },
        },
        "modal-overlay-open": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "modal-open": "modal-open 0.3s ease-out",
        "modal-overlay-open": "modal-overlay-open 0.3s ease-out",
      },

      fontFamily: {
        mainHeaderFont: ["var(--font-power-grotesk)", "sans-serif"],
        mainFont: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      screens: {
        fold: "345px",
      },
      colors: {
        mainFontColor: "#FBFCF8",
        background: "#222222",
        secondBackground: "#FBFCF8",
        // foreground: "var(--foreground)",
        blackSectionText: "#b8b8b8",
      },
      fontSize: {
        mobile: "3.8rem",
        "section-header": "10rem", // Dodanie niestandardowej wielkości czcionki
      },
    },
  },
  plugins: [],
};

export default config;
