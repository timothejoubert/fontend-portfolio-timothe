const pkg = require('./package')

const server = {
  host: '0.0.0.0', // allow external access in dev mode
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',
  // ssr: true,

  dev: process.env.NODE_ENV !== 'production',

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

  server,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/scss/main'],

  // https://github.com/nuxt-community/style-resources-module#setup
  // share files in all project
  styleResources: {
    scss: ['@/scss/shared.scss'],
    hoistUseStatements: true,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/api-client.js'
    '~/plugins/vuePrlx.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt/postcss8
    '@nuxt/postcss8',
    // https://github.com/nuxt-community/style-resources-module#setup
    '@nuxtjs/style-resources',
    // https://vueuse.org/guide/#installation
    '@vueuse/nuxt',
  ],
  image: {
    domains: ['notion-static.com'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],
  sitemap: {
    hostname: 'https://justine-saez.netlify.app',
  },

  loading: '@/components/organisms/VLoadingPage.vue',
  /*   loading: {
      color: 'blue',
      height: '50px',
      throttle: 0,
      continuous: true,
      duration: 2000,
    }, */

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
