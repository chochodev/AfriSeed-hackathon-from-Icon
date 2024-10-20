/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
// import { defaultTheme } from 'tailwindcss/defaultTheme';

module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,jsx,ts,tsx,svelte}"],
  theme: {
  	boxShadow: {
  		small: '0 2px 5px rgba(0, 0, 0, 0.2)',
  		'inset-glow': 'inset 0 0 0 2px rgba(255, 255, 255, 0.5)'
  	},
  	screens: {
  		sm: '480px',
  		smd: '680px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1440px'
  	},
  	extend: {
  		colors: {
  			primary: {
  				'100': '#d5f0ff',
  				'200': '#b3e1ff',
  				'300': '#85cbff',
  				'400': '#56a6ff',
  				'500': '#2f80ff',
  				'600': '#0c54ff',
  				'700': '#0049ff',
  				'800': '#0642cd',
  				'900': '#103f9f',
  				'950': '#0a235c',
  				DEFAULT: '#e8f7ff'
  			},
  			secondary: '#F2B49B',
  			tertiary: '#A65E30',
        ...defaultTheme.colors,
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}