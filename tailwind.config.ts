import type { Config } from "tailwindcss";

const config: Config = {
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
        secondBackground: "#B1B1B1",
        foreground: "var(--foreground)",
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
