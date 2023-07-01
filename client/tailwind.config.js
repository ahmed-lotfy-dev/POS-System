const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
    mytheme: {

      "primary": "#93c5fd",
      "secondary": "#fef08a",
      "accent": "#a5b4fc",
      "neutral": "#6366f1",
      "base-100": "#f3f4f6",
      "info": "#374151",
      "success": "#166534",
      "warning": "#ca8a04",
      "error": "#ef4444",
    },
  },
}