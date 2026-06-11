/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bridge: {
          50: "#f3f7ff",
          500: "#3257d3",
          600: "#2643b8",
          700: "#1d3596",
        },
      },
      fontFamily: {
        sans: ["'JetBrains Mono'", "system-ui", "sans-serif"],
        display: ["'Fraunces'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
