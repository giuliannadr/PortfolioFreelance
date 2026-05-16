/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F4EFE6',
        ink: '#0A0A0A',
        orange: '#FF6F00',
        'warm-grey': '#8C7B6B',
        // legacy vars
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        card: "hsl(var(--card))",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        serif: ["'Playfair Display'", 'serif'],
      }
    },
  },
  plugins: [],
}
