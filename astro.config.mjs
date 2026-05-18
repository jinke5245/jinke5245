// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import process from 'node:process';

const site = process.env.PUBLIC_SITE ?? 'https://jinke.dev';
const publicBase = process.env.PUBLIC_BASE;

if (publicBase === '') {
  throw new Error('PUBLIC_BASE must be unset or a non-empty path.');
}

if (publicBase !== undefined && !publicBase.startsWith('/')) {
  throw new Error('PUBLIC_BASE must start with a leading slash.');
}

if (publicBase !== undefined && publicBase.endsWith('/')) {
  throw new Error('PUBLIC_BASE must not end with a trailing slash.');
}

// https://astro.build/config
export default defineConfig({
  site,
  base: publicBase,
  integrations: [mdx(), sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
});
