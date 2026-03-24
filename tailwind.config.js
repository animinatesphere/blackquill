/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      colors: {
        gold:   '#C9A84C',
        ink:    '#0B0B0F',
        paper:  '#F5F0E8',
        quill:  '#1A1A2E',
        cream:  '#EDE8DC',
      },
    },
  },
  plugins: [],
}
