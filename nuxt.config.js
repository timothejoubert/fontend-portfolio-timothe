export default {
  // Target: https://go.nuxtjs.dev/config-target
  mode: 'static',

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-srcdir
  // define if this file isn't same folder as nuxt front folder
  // srcDir: 'front',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'google-site-verification', content: 'o5sD6l8eVydQy3O8y0D3ETIcgafZZZwbNwKjh_1qimc' },
    ],
    link: [
      // favicon
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicon/site.webmanifest' },
      { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },

  serverMiddleware: [
    // {path: '/api', handler: '~/api/index.js'}
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/scss/main'],

  // https://github.com/nuxt-community/style-resources-module#setup
  // share files in all project
  styleResources: {
    scss: ['@/scss/shared.scss'],
    hoistUseStatements: true,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt/postcss8
    '@nuxt/postcss8',
    // https://github.com/nuxt-community/style-resources-module#setup
    '@nuxtjs/style-resources',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/strapi',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],

  // env: {
  //   strapiBaseUri: process.env.API_URL || "http://localhost:1337"
  // },

  strapi: {
    url: process.env.STRAPI_API_URL || 'http://localhost:1337/api',
    entities: ['projects', 'about'],
  },

  // https://image.nuxtjs.org/providers/strapi
  // image: {
  //   strapi: {
  //     baseURL: process.env.STRAPI_URL + 'uploads' || 'http://localhost:1337/uploads/',
  //   },
  // },

  // loading: '@/components/organisms/VLoadingPage.vue',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
      cssModules: {
        modules: {
          localIdentName: '[local]--[Frida]_[hash:base64:4]',
        },
      },
    },
  },
}
