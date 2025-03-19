import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Primary colors
      primary: "#B290BF", // Purple
      secondary: "#000000", // Black
      accent: "#FFFFFF", // White
      customPurple: "#B290BF",

      // Additional shades of purple
      "purple-light": "#9B79D5", // Lighter purple
      "purple-dark": "#4C2889", // Darker purple

      // Gray tones
      "gray-light": "#F7F7F7", // Light gray
      "gray-dark": "#2D2D2D", // Dark gray

      // Accent and hover colors
      "accent-light": "#F1F1F1", // Light accent (for hover effects)
      "accent-dark": "#B3B3B3", // Dark accent (for text or icons)

      // Complementary color
      "blue-light": "#3B82F6", // Light blue for calls to action or links
      "blue-dark": "#1D4ED8", // Darker blue for highlighting

      // Neutral colors
      "neutral-light": "#E5E5E5", // Light neutral tone
      "neutral-dark": "#333333", // Dark neutral for subtle details

      // Background gradient images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // Font family
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      // Animations
      animation: {
        gradient: "gradientMove 8s ease infinite",
      },

      // Custom keyframes for the gradient animation
      keyframes: {
        gradientMove: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
