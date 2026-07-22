import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "../../shared/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7e6",
          100: "#ffeec2",
          200: "#ffdc80",
          300: "#ffc94d",
          400: "#ffb61f",
          500: "#f69b00",
          600: "#d87d00",
          700: "#ad6100",
          800: "#804700",
          900: "#542d00"
        }
      }
    }
  },
  plugins: []
};

export default config;