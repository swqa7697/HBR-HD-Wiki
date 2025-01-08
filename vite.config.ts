import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import { sitemapRoutes } from './src/util/site-routes';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://wiki.hbr-hd.com',
      dynamicRoutes: sitemapRoutes.map((route) => route.path),
      changefreq: 'monthly',
      priority: undefined,
      exclude: ['/api'],
    }),
  ],
});
