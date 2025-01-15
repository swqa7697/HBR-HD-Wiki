import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from './src/util/my-sitemap-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap()],
});
