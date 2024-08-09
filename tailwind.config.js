/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-light': '#D4EDEE',
        'primary': '#32C0C6',
        'primary-dark': '#329599',
        'placeholder': '#8C8C8C',
        'grey-neutral': '#616161',
        'grey-dark': '#4E4E4E',
        'light': '#FFFFFF',
        'matte': '#F3F3F5',
        'border': '#E9ECEF',
        'line': '#E9ECEF',
        'success': '#5CB85C',
        'check': '#5CB85C',
        'warning': '#FFB22B',
        'danger': '#FC4B6C',
      },
      fontSize: {
        'h1': ['21px', { lineHeight: '31px' }], // Heading 1
        'h2': ['18px', { lineHeight: '28px' }], // Heading 2
        'h3': ['18px', { lineHeight: '28px' }], // Heading 3
        'h4': ['16px', { lineHeight: '24px' }], // Heading 4
        'h5': ['16px', { lineHeight: '24px' }], // Heading 5
        'md': ['14px', { lineHeight: '20px' }],
        'sm': ['12px', { lineHeight: '18px' }],
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

