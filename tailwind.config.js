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
        gold:   '#FF8C00',
        ink:    '#000000',
        paper:  '#FFFFFF',
        quill:  '#1A1A2E',
        cream:  '#FFFFFF',
      },
    },
  },
  plugins: [],
}
