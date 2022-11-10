import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'

export default Vue.extend({
    data() {
        return {
            pageData: {} as PageData,
        }
    },
    head(): MetaInfo {
        const meta = [
            {
                hid: 'description',
                name: 'description',
                content: this.pageData?.metaDescription || 'fallback de description dans mixin page',
            } as PageMetaPropertyName,
            ...createFacebookMeta(this.getFacebookMetaOptions()),
            ...createTwitterMeta(this.getTwitterMetaOptions()),
            { hid: 'version', name: 'version', content: this.$config.version || '' },
        ]

        return {
            htmlAttrs: {
                lang: 'fr',
            },
            title: this.metaTitle,
            meta,
        }
    },
    computed: {
        isHomePage(): boolean {
            return this.$route.fullPath === '/' || this.$route.name === 'index'
        },
        isProject(): boolean {
            return this.pageData['@type'] === 'project'
        },
        isAbout(): boolean {
            return this.pageData['@type'] === 'about'
        },
        metaTitle(): string {
            return this.pageData?.title
                ? this.$config.appTitle + ' | ' + this.pageData.title
                : (this.pageData?.title ? this.pageData.title + ' | ' : '') + this.$config.appTitle
        },
    },
    watch: {
        $route() {
            console.log('route change')
        },
    },
    methods: {
        getMetaImage(): string | undefined {
            return this.pageData?.thumbnail?.data?.attributes?.url || '/images/share.jpg'
        },
        getPageUrl(): string {
            return this.$config.baseURL + this.$route.fullPath.substring(1)
        },
        getTwitterMetaOptions(): TwitterMetaOptions {
            return {
                title: this.metaTitle,
                description: this.pageData?.metaDescription || '',
                url: this.getPageUrl(),
                image: this.getMetaImage(),
            }
        },
        getFacebookMetaOptions(): FacebookMetaOptions {
            return {
                title: this.metaTitle,
                description: this.pageData?.metaDescription || '',
                url: this.getPageUrl(),
                siteName: this.$config.appTitle,
                image: this.getMetaImage(),
            }
        },
    },
})
