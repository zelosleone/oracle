import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        celestial: "var(--celestial)",
        "celestial-dark": "var(--celestial-dark)",
        scroll: "var(--scroll)",
        azure: "var(--azure)",
        sacred: "var(--sacred)",
        lapis: "var(--lapis)",
        papyrus: "var(--papyrus)",
      },
      fontFamily: {
        hieroglyph: ["var(--font-geist-sans)", "serif"],
      },
      backgroundImage: {
        'papyrus-pattern': "url('data:image/svg+xml,%3Csvg...')" // The pattern is already defined in globals.css
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;