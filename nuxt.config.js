import fs from 'fs'
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin'

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-srcdir
    // define if this file isn't same folder as nuxt front folder
    srcDir: 'src',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: process.env.APP_TITLE,
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
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
            { rel: 'manifest', href: '/favicon/site.webmanifest' },
            { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#da532c' },
        ],
    },

    serverMiddleware: [
        // {path: '/api', handler: '~/api/index.js'}
    ],

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/scss/main'],

    // https://github.com/nuxt-community/style-resources-module#setup
    styleResources: {
        scss: ['@/scss/_style-resources.scss'],
        hoistUseStatements: true,
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    // plugins: [
    //     '@/plugins/cloudinary.js',
    // ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: ['@/components', '@/components/atoms', '@/components/molecules', '@/components/organisms'],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://github.com/nuxt/postcss8
        '@nuxt/postcss8',
        // https://github.com/nuxt-community/svg-module
        '@nuxtjs/svg',
        // https://github.com/nuxt-community/style-resources-module#setup
        '@nuxtjs/style-resources',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://sitemap.nuxtjs.org/guide/setup
        '@nuxtjs/strapi',
        // '@nuxtjs/sitemap',
        '@nuxt/image',
        // https://cloudinary.nuxtjs.org/setup
        '@nuxtjs/cloudinary',
    ],

    // image provider
    // image: {
    //     cloudinary: {
    //         baseURL: '',
    //     },
    // },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_NAME,
        apiKey: process.env.CLOUDINARY_KEY,
        apiSecret: process.env.CLOUDINARY_SECRET,
        useComponent: true,
    },

    // env: {
    //   strapiBaseUri: process.env.API_URL || "http://localhost:1337"
    // },

    strapi: {
        url: process.env.STRAPI_API_URL || 'http://localhost:1337/api',
        entities: ['projects', 'about'],
    },

    // https://fr.nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
    publicRuntimeConfig: {
        appTitle: process.env.APP_TITLE,
        baseUrl: process.env.APP_BASE_URL,
    },

    // https://image.nuxtjs.org/providers/strapi
    // image: {
    //   strapi: {
    //     baseURL: process.env.STRAPI_URL + 'uploads' || 'http://localhost:1337/uploads/',
    //   },
    // },
    // https://github.com/nuxt-community/svg-module
    svg: {
        svgSpriteLoader: {
            extract: true,
            runtimeGenerator: require.resolve('./src/utils/svg/sprite-component-generator.js'),
            spriteFilename: 'image/sprite.[hash:8].svg',
        },
    },

    // loading: '@/components/organisms/VLoadingPage.vue',

    // https://storybook.nuxtjs.org/api/options
    storybook: {
        port: 4000,
        stories: ['~/stories/**/*.stories.js'],
        parameters: {
            viewport: {
                viewports: {
                    iPhoneSE: {
                        name: 'iPhone SE',
                        styles: {
                            width: '375px',
                            height: '660px',
                        },
                    },
                    iPadPortrait: {
                        name: 'iPad portrait',
                        styles: {
                            width: '768px',
                            height: '1024px',
                        },
                    },
                    iPadLandscape: {
                        name: 'iPad landscape',
                        styles: {
                            width: '1024px',
                            height: '768px',
                        },
                    },
                },
            },
        },
        addons: [
            {
                name: '@storybook/preset-scss',
                options: {
                    cssLoaderOptions: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]',
                    },
                },
            },
        ],
    },

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
        plugins: [
            new SpriteLoaderPlugin({
                plainSprite: true,
                spriteAttrs: {
                    id: 'svg-sprite',
                },
            }),
        ],
    },
}
