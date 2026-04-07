/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: "#8B7EC8",
        "sidebar-dark": "#7A6DB8",
        "sidebar-light": "#9D92D4",
        "main-bg": "#F4F3F8",
        surface: "#FFFFFF",
        "lime-card": "#D4E84D",
        "lime-dark": "#B8CC35",
        "purple-card": "#B8ADE8",
        "purple-card-light": "#D0C8F0",
        "text-dark": "#2D2B3D",
        "text-muted": "#8E8BA0",
        "grid-line": "#ECEAF4",
      },
      fontFamily: { body: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
};
