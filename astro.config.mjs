// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind(), react(), icon()],
  vite: {
    server: {
      allowedHosts: ["polaris"]
    },
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge",
      } : undefined,
    },
  },
});