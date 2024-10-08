/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme');
import { defaultTheme } from 'tailwindcss/defaultTheme';

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,svelte}"],
  theme: {
    boxShadow: {
      'small': '0 2px 5px rgba(0, 0, 0, 0.2)',
      'inset-glow': 'inset 0 0 0 2px rgba(255, 255, 255, 0.5)',
    },
    screens: {
      'sm': '480px',
      'smd': '680px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px'
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F6F9FF',
          '100': '#e6ecf8',
          '200': '#c7d7f0',
          '300': '#96b5e3',
          '400': '#5e8fd2',
          '500': '#3a71bd',
          '600': '#2957a0',
          '700': '#234781',
          '800': '#203d6c',
          '900': '#20365a',
          '950': '#15223c'
        },

        secondary: '#F2B49B',
        tertiary: '#A65E30',
        // ...defaultTheme.colors
      },
    }
  },
  plugins: [],
}