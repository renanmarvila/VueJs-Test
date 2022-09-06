import { defineConfig } from 'vite-plugin-windicss';
import typography from 'windicss/plugin/typography';

const config = defineConfig({
  darkMode: 'class',
  plugins: [typography()],
  attributify: true,
  theme: {
    extend: {
      screens: {
        xs: '530px',
      },
      colors: {
        'lightergreen': '#97ce4c',
        'darkergreen': '#7eb431',
      },
      fontFamily: {
      },
    },
  },
});

export default config;
