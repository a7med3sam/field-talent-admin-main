/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main': {
          DEFAULT: '#115e59',
          dark: '#1d353b',
        },
        'main-light':{
          DEFAULT:'#cfdfde'

        },
        'text': {
          DEFAULT: '#374151',
          dark: '#f3f4f6'
        },
        'dark': {
          DEFAULT: '#1f2937',
          light: '#212a33',
        },
        's-dark': {
          DEFAULT: '#4b5563',
          light: '#6b7280',
        },
        'light-dark': {
          DEFAULT: '#9ca3af',
          dark: '#6b7280',
        },
        's-light': {
          DEFAULT: '#f3f4f6',
          dark: '#d1d5db',
        },
        'accent': {
          DEFAULT: '#10b981',
          dark: '#059669',
        }
      }
    }
  },
  plugins: [daisyui],
  darkMode: "class",
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#115e59",
          "primary-focus": "#0d4b47",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "#0d4b47",
          "primary-focus": "#115e59",
        },
      },
    ],
  },
};