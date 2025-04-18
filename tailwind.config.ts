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
      padding: {
        DEFAULT: "1.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      padding: {
        descriptionPadding: "1.25rem",
        contactFormPadding: "2rem",
      },
      maxWidth: {
        buttonsMaxWidth: "200px",
        contentWidth: "725px", // Własna szerokość dla tekstu
      },
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
        doto: ["var(--font-doto)", "sans-serif"],
      },
      screens: {
        "max-fold": { max: "344px" },
        xs: "360px",
        "landscape-short": {
          raw: "(orientation: landscape) and (max-height: 800px)",
        },
        "social-buttons-footer-visibility": {
          raw: "(orientation: landscape) and (min-height: 921px) and (min-width: 1280px)",
        },
      },
      colors: {
        mainFontColor: "#FBFCF8",
        background: "#222222",
        secondBackground: "#FBFCF8",
        thirdBackground: "#a6aba5",
        // foreground: "var(--foreground)",
        blackSectionText: "#b8b8b8",
      },
      fontSize: {
        "fold-text": "3rem",
        SingleProjectDescriptionFont: ".925rem",
        mobile: "3.8rem",
        "section-header-lg": "8rem", // Dodanie niestandardowej wielkości czcionki
        "section-header-xl": "9rem",
        "section-header-2xl": "10rem",
      },
    },
  },
  plugins: [],
};

export default config;
