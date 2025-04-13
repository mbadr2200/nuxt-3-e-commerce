// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@primevue/nuxt-module',
    '@vueuse/nuxt'
  ],
  css: [
    './assets/css/tailwind.css'
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  imports: {
    dirs: ['composables/**', 'utils/**', 'composables/api/**', 'stores/*.ts'],
    presets: [
      {
        from: 'consola',
        imports: [
          {
            name: 'default',
            as: 'consola',
          },
        ],
      },
    ],
  },
  i18n: {
    vueI18n: '../locales/i18n.config.ts',
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
    },
    locales: [
      {
        code: 'en',
        language: 'en-US',
        direction: 'ltr',
        icon: 'flag:us-1x1',
      },
      {
        code: 'ar',
        language: 'ar',
        name: 'Arabic',
        direction: 'rtl',
        icon: 'flag:sa-1x1',
      },
    ],
  },
  image:{
    quality:80,
    format: ['webp'],
  },
  runtimeConfig:{
    public:{
      baseUrl:import.meta.env.BASE_URL
    }
  },
  primevue: {
    options: {
        theme: {
            preset: Aura,
            options: {
              darkModeSelector: '.dark',
            }
        }
    }
}
})