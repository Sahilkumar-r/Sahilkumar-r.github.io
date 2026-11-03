import type { Config } from "tailwindcss";

// Spacing is restricted to the owner's token table (Skills/SKILL.md B2). Any other spacing class does not compile.
// 0 / 2 / 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 px
const spacing = {
  0: "0px",
  0.5: "2px", // Spacing-25
  1: "4px", // Spacing-50
  2: "8px", // Spacing-75
  3: "12px", // Spacing-100
  4: "16px", // Spacing-200
  6: "24px", // Spacing-300
  8: "32px", // Spacing-400
  10: "40px", // Spacing-500
  12: "48px", // Spacing-600
  16: "64px", // Spacing-700
  20: "80px", // Spacing-800
  24: "96px", // Spacing-900
};

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    spacing,
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        band: "rgb(var(--band) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        "line-strong": "rgb(var(--line-strong) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)", // filled surfaces (white text on top)
        link: "rgb(var(--link) / <alpha-value>)", // text and icons that can be checked
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        base: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
