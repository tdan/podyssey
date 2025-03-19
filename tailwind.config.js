/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flyonui/dist/js/*.js",
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

