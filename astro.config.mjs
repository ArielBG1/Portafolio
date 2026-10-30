// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: reemplazar por el dominio definitivo cuando esté configurado en Vercel.
  site: 'https://arielbogado.vercel.app',
  output: 'static',

  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  env: {
    schema: {
      PUBLIC_WEB3FORMS_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },

  integrations: [
    icon(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
