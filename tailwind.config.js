/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      colors: {
        gold:   '#ff735e',
        coral:  '#ff735e',
        lime:   '#d2e879',
        stone:  '#f0eee7',
        ivory:  '#fffefa',
        ink:    '#20211f',
        paper:  '#f5f3ee',
        quill:  '#1A1A2E',
        cream:  '#fffefa',
      },
    },
  },
  plugins: [],
}
