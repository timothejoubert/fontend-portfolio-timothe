<template>
  <nuxt-link
    v-if="!!projectData"
    :to="`/projets/${projectData.slug}`"
    :class="[$style.root, cardIndex % 2 && $style['root--odd']]"
  >
    <div v-if="!!projectData?.type?.options.length" :class="$style.types">
      <span v-for="type in projectData.type.options" :key="type.id" :class="$style.type" class="tag-s">{{
        type.name
      }}</span>
    </div>
    <div ref="image" :class="$style['wrapper-media']" :style="imageStyle">
      <img
        v-if="projectData.thumbnail"
        :class="$style.media"
        :src="projectData.thumbnail.url"
        :alt="projectData.thumbnail.name"
        :lazy="isLazyLoad"
        rel="preload"
      />
    </div>
    <h1 v-if="projectData.name" class="title-card" :class="$style.title">
      {{ cardIndex + '. ' + projectData.name }}
    </h1>
    <v-rich-text :content="projectData.shortDescription" :class="$style['description']" class="body-s" />
  </nuxt-link>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import type { PropType } from 'vue'
import { ProjectData } from '~/utils/api/notion-custom-type'
import VRichText from '~/components/atoms/VRichText.vue'
// import { getMeta } from '~/utils/functions'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/generals'

export interface ImageSize {
  ratio?: number
  width?: number
  height?: number
}

interface CardProject extends Vue {
  imageSize?: ImageSize
}

interface ImageContent {
  width: number
  height: number
}
export interface ImageResponse {
  type: string
  path: ImageContent[]
}
export default (Vue as VueConstructor<Vue & CardProject>).extend({
  name: 'VCardProject',
  components: { VRichText },
  props: {
    cardIndex: Number,
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
    },
  },
  data() {
    return {
      loaded: false,
      imageSize: {} as ImageSize,
    }
  },
  computed: {
    isLazyLoad(): boolean | string {
      return !toBoolean(GeneralsConst.LAZY_LOAD_IMAGE) && 'false'
    },
    imageStyle(): Record<string, string> {
      const paddingBottom = (this.imageSize?.ratio || 0) * 100 + '%' || '100%'
      return { 'padding-bottom': '0' }
    },
  },
  watch: {
    'imageSize.ratio'() {
      this.loaded = true
    },
  },
  async mounted() {
    if (this.projectData?.thumbnail?.url) {
      const image = new Image()
      image.src = this.projectData.thumbnail.url
      await this.waitImageLoaded(image)
        .then((data) => {
          const promiseResponse = data as ImageResponse
          if (promiseResponse.path[0] && promiseResponse.type === 'load') {
            const img = promiseResponse.path[0]
            this.imageSize = {
              ratio: img.height / img.width,
              width: img.width,
              height: img.height,
            }
          }
        })
        .catch((error) => console.log('error when load img', error))

      if (image.complete) this.loaded = true
    }
  },
  methods: {
    waitImageLoaded(imageElement: HTMLImageElement) {
      return new Promise((resolve, reject) => {
        imageElement.onload = resolve
        imageElement.onerror = reject
      })
    },
  },
})
</script>

<style lang="scss" module>
.root {
  grid-column: 2 / span 4;
  padding: 25px;
  margin-bottom: 600px;
  display: block;
  background-color: color(white);
  //transition: transform 400ms;

  &--odd {
    grid-column: 7 / span 5;
  }

  &:hover {
    //transform: rotate(0) !important;
  }
}

.root > *:not(:first-child) {
  margin-top: 15px;
}

.types {
  display: flex;
  flex-wrap: wrap;
}

.type {
  background-color: color(main-orange);
  color: color(light-yellow);
  border-radius: 20px;
  padding: 6px 15px;

  &:not(:last-child) {
    margin-right: 15px;
  }
}

.wrapper-media,
.media {
  width: 100%;
  background-color: color(grey-50);
}

.wrapper-media {
  position: relative;
}

.media {
  //position: absolute;
  top: 0;
  left: 0;
  transition: grayscale 400ms;
  //filter: grayscale(1);

  .root:hover {
    filter: grayscale(0);
  }
}

.title {
  font-size: 3rem;
  color: color(main-orange);
}

.description {
  color: color(main-orange);
}
</style>
