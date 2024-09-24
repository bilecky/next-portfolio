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
      screens: {
        fold: "345px",
      },
      colors: {
        mainFontColor: "#FBFCF8",
        background: "var(--background)",
        secondBackground: "#B1B1B1",
        foreground: "var(--foreground)",
      },
      fontSize: {
        "section-header": "10rem", // Dodanie niestandardowej wielkości czcionki
      },
    },
  },
  plugins: [],
};

export default config;
