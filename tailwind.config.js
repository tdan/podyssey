/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flyonui/flyonui.js",
  ],
  theme: {
    extend: {},
  },
  flyonui: {
    themes: ["soft", "light", "dark"],
    darkTheme: "dark",
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin"),
  ],
}

