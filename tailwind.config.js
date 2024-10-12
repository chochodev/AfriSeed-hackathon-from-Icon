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
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: '#A65E30',
  			// ': '.colors,
        //         ...defaultTheme.colors,: ',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}