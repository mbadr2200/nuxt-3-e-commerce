/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode:'class',
  theme: {
    container:{
      center:true,
    },
    extend: {
      colors:{
        primary: 'rgb(var(--primary-color) / <alpha-value>)',
        secondary: 'rgb(var(--secondary-color) / <alpha-value>)',
        success: 'rgb(var(--success-color) / <alpha-value>)',
        danger: 'rgb(var(--danger-color) / <alpha-value>)',
        warning: 'rgb(var(--warning-color) / <alpha-value>)',
        info: 'rgb(var(--info-color) / <alpha-value>)',
        light: 'rgb(var(--light-color) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}

