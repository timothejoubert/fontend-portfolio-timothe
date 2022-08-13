import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { nameIfy } from '~/utils/functions'
import { ProjectData } from '~/utils/api/notion-custom-type'

export default Vue.extend({
  data() {
    return {
      baseUrl: 'https://justine-saez.netlify.app/',
      metaDescription:
        'Illustratrice mordue des courbes féminines et des couleurs, je dessine des corps et des sentiments. Je m’amuse aussi à gribouiller des instants cocasses du quotidien.',
      SocialDescription:
        'Illustratrice mordue des courbes féminines et des couleurs, je dessine des corps et des sentiments. Je m’amuse aussi à gribouiller des instants cocasses du quotidien.',
    }
  },
  head(): MetaInfo {
    const meta = [
      {
        hid: 'description',
        name: 'description',
        content: this.metaDescription,
      } as PageMetaPropertyName,
      ...createFacebookMeta(this.getFacebookMetaOptions()),
      ...createTwitterMeta(this.getTwitterMetaOptions()),
      { hid: 'version', name: 'version', content: this.$config.version || '' },
    ]

    return {
      htmlAttrs: {
        lang: 'fr',
      },
      title: this.getMetaTitle(),
      meta,
    }
  },
  computed: {
    ...mapGetters(['projectsData']),
    project(): ProjectData | undefined {
      return (this.projectsData as ProjectData[]).find((project) => this.$route.params?.slug === project.slug)
    },
    isHomePage(): boolean {
      return this.$route.fullPath === '/' || this.$route.name === 'index'
    },
    isMoreProjectPage(): boolean {
      return this.$route.name === 'VMoreProject'
    },
  },
  methods: {
    getMetaTitle(): string {
      if (this.isHomePage) return 'Portfolio | Justine Saez'
      if (this.isMoreProjectPage) return 'En voir plus '

      const fullPath = this.$route.fullPath.substring(1)
      const mainRoute = fullPath.substring(0, fullPath.indexOf('/')) || ''
      const subRoute = nameIfy(this.$route.params.slug) || ''

      return `${subRoute} - ${mainRoute}` || 'Portfolio | Justine Saez'
    },
    getMetaImage(): string | undefined {
      // TODO add meta image for Index && more project
      return this.project?.thumbnail?.url || require('~/static/images/justine-saez.jpeg') || '/images/justine-saez.jpg'
    },
    getPageUrl(): string {
      return this.$config.baseURL + this.$route.fullPath.substring(1)
    },
    getTwitterMetaOptions(): TwitterMetaOptions {
      return {
        title: this.getMetaTitle(),
        description: this.SocialDescription,
        url: this.getPageUrl(),
        image: this.getMetaImage(),
      }
    },
    getFacebookMetaOptions(): FacebookMetaOptions {
      return {
        title: this.getMetaTitle(),
        description: this.SocialDescription,
        url: this.getPageUrl(),
        siteName: this.getMetaTitle(),
        image: this.getMetaImage(),
      }
    },
  },
})
