import flowbite from 'flowbite-react/tailwind';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(), scrollbarHide],
};
