/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  darkMode: "media",

  theme: {
    extend: {
      colors: {
        palette: {
          light: {
            background: "#F7F8FA",
            surface: "#FFFFFF",
            elevated: "#F1F3F5",
            border: "#E6E8EE",
            selected: "#E6E8EE",
            primary: "#101828",
            secondary: "#667085",
            tertiary: "#98A2B3",
            placeholder: "#667085",
          },
          dark: {
            background: "#050810",
            surface: "#121A2B",
            elevated: "#182136",
            border: "#243048",
            selected: "#243048",
            primary: "#F8FAFC",
            secondary: "#C7D2E0",
            tertiary: "#90A4C4",
            placeholder: "#90A4C4",
          },
        },

        theme: {
          background: "var(--app-background)",
          surface: "var(--app-surface)",
          elevated: "var(--app-elevated)",
          border: "var(--app-border)",
          selected: "var(--app-selected)",
          primary: "var(--app-primary)",
          secondary: "var(--app-secondary)",
          tertiary: "var(--app-tertiary)",
          placeholder: "var(--app-placeholder)",
          accent: "var(--app-accent)",
          warning: "var(--app-warning)",
          danger: "var(--app-danger)",
        },

        bg: "var(--app-background)",
        surface: "var(--app-surface)",
        card: "var(--app-elevated)",
        border: "var(--app-border)",

        // Brand
        brand: {
          50: "#EEF4FF",
          100: "#D9E6FF",
          200: "#BBD2FF",
          300: "#91B5FF",
          400: "#6B96FF",
          500: "#4A7DFF",
          600: "#2F6BFF",
          700: "#2457D6",
          800: "#1F47AD",
          900: "#1D3B87",
        },

        // Accent
        accent: {
          500: "#20C997",
          600: "#12B886",
          700: "#0CA678",
        },

        // Light/dark neutral palette
        gray: {
          50: "#F7F8FA",
          100: "#F1F3F5",
          200: "#E6E8EE",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },

        navy: {
          700: "var(--app-border)",
          800: "var(--app-elevated)",
          900: "var(--app-surface)",
          950: "var(--app-background)",
        },

        // Semantic states
        success: {
          50: "#E6FCF5",
          100: "#C3FAE8",
          500: "#20C997",
          600: "#12B886",
          700: "#0CA678",
        },

        warning: {
          50: "#FFF9DB",
          100: "#FFF3BF",
          500: "#FCC419",
          600: "#F59F00",
          700: "#E67700",
        },

        danger: {
          50: "#FFF5F5",
          100: "#FFE3E3",
          500: "#FF6B6B",
          600: "#E03131",
          700: "#C92A2A",
        },

        info: {
          50: "#E7F5FF",
          100: "#D0EBFF",
          500: "#4DABF7",
          600: "#339AF0",
          700: "#228BE6",
        },

        // Finance-specific semantic colors
        money: {
          positive: "#12B886",
          negative: "#E03131",
          neutral: "#667085",
          pending: "#F59F00",
        },

        // Transaction categories
        category: {
          food: "#F59F00",
          transport: "#339AF0",
          housing: "#845EF7",
          health: "#E03131",
          shopping: "#F06595",
          utilities: "#12B886",
          income: "#2F9E44",
          transfer: "#868E96",
          entertainment: "#5C7CFA",
          savings: "#20C997",
          other: "#ADB5BD",
        },

        // Theme semantic aliases
        light: {
          background: "var(--app-background)",
          surface: "var(--app-surface)",
          elevated: "var(--app-elevated)",
          border: "var(--app-border)",
          selected: "var(--app-selected)",
          primary: "var(--app-primary)",
          secondary: "var(--app-secondary)",
          tertiary: "var(--app-tertiary)",
        },

        dark: {
          background: "var(--app-background)",
          surface: "var(--app-surface)",
          elevated: "var(--app-elevated)",
          border: "var(--app-border)",
          selected: "var(--app-selected)",
          primary: "var(--app-primary)",
          secondary: "var(--app-secondary)",
          tertiary: "var(--app-tertiary)",
        },
      },

      fontFamily: {
        sans: ["Inter"],
        display: ["Inter"],
        mono: ["SpaceMono"],
      },

      fontSize: {
        "display-xl": ["40px", { lineHeight: "48px", fontWeight: "600" }],
        "display-lg": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        h1: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        h2: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h3: ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
      },

      spacing: {
        0.5: "2px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        18: "72px",
        20: "80px",
      },

      borderRadius: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "28px",
        "2xl": "32px",
      },

      borderWidth: {
        hairline: "1px",
        focus: "2px",
      },

      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.06)",
        elevated: "0 6px 16px rgba(16, 24, 40, 0.10)",
        modal: "0 16px 32px rgba(16, 24, 40, 0.16)",
        floating: "0 12px 24px rgba(47, 107, 255, 0.24)",
      },

      opacity: {
        disabled: "0.38",
        muted: "0.64",
        overlay: "0.48",
      },

      zIndex: {
        base: "0",
        header: "10",
        dropdown: "20",
        sheet: "30",
        modal: "40",
        toast: "50",
      },

      screens: {
        phone: "390px",
        tablet: "768px",
      },
    },
  },

  plugins: [],
};
