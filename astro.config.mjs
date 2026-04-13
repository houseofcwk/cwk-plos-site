import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://houseofcwk.com',
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        // react-dom/server.edge is CJS-only and uses `require()` which breaks
        // in Vite's ESM SSR runner. Point to a local ESM shim that loads it
        // via createRequire so it works in both dev and prod (Cloudflare Workers).
        'react-dom/server': resolve(__dirname, 'src/shims/react-dom-server-edge.mjs'),
      },
    },
  },
});
