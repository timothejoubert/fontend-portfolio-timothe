<template>
  <section :class="$style.project">
    <div :class="$style.head">
      <div :class="$style['left-column']">
        <v-rich-text
          v-if="project.description"
          :class="$style.description"
          class="body-l"
          :content="project.description"
        />
        <div v-if="!!otherTags && !!otherTags?.length" :class="$style['all-tag']">
          <span v-for="type in otherTags" :key="type.id" :class="$style.type" class="tag-s">{{ type.name }}</span>
        </div>
      </div>
      <div v-if="mainTag" :class="$style['main-tag']" class="tag-m">
        {{ mainTag.name }}
      </div>
      <div :class="$style['wrapper-head']">
        <h1 class="text-h1" :class="$style.name">{{ project.name }}</h1>
        <v-rich-text v-if="project.series" :content="project.series" :class="$style.series" />
      </div>
      <v-rich-text
        v-if="project.shortDescription"
        :content="project.shortDescription"
        :class="$style['short-description']"
      />
      <div :class="$style['thumbnail-wrapper']">
        <div :class="$style['thumbnail-inner']">
          <img
            v-if="project.thumbnail"
            :class="$style.thumbnail"
            :src="project.thumbnail.url"
            :alt="project.thumbnail.name"
          />
        </div>
      </div>
      <v-rich-text :content="project.thumbnailInfo" :class="$style['thumbnail-info']" />
    </div>

    <div v-if="!!carouselMedia?.length" :class="$style['carousel']">
      <div :class="$style['carousel-inner']">
        <div v-for="(img, i) in carouselMedia" :key="img.alt + '-' + i" :class="$style['wrapper-image']">
          <img :src="img.url" :alt="img.name" :class="$style['carousel-img']" />
        </div>
      </div>
    </div>

    <template v-if="!!othersMedia && !!othersMedia?.length">
      <v-masonry enabled>
        <div :class="$style['list']">
          <v-masonry-item v-for="(media, i) in othersMedia" :key="i">
            <div :class="$style['list-image-wrapper']">
              <img :src="media.url" :alt="media.name" :class="$style.image" />
            </div>
          </v-masonry-item>
        </div>
      </v-masonry>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { ProjectData } from '~/utils/api/notion-custom-type'
import { MediaContent, SelectOptionParsed } from '~/utils/block-parser'
import VRichText from '~/components/atoms/VRichText.vue'
import { ComponentWithCustomOptionsConstructor } from '~/utils/types/options'
import Page from '~/mixins/Page'
import VMasonry from '~/components/molecules/VMasonry.vue'
import VMasonryItem from '~/components/molecules/VMasonryItem.vue'
import { getBreakpointValue } from '~/utils/media'
import { ImageResponse } from '~/components/molecules/VCardProject.vue'

interface VProjectOptions {
  mediaCarousel: number
}

const staticMedias = [
  {
    alt: 'serie1-5_capture.png',
    name: 'serie1 5 capture',
    url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f588595-2ebf-4070-ad20-bd156f9dd75c/serie1-5_capture.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220813%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220813T173228Z&X-Amz-Expires=3600&X-Amz-Signature=c5582b4c975cb2f338cb2e38558f3f8be0e58246ea99401e91038eb235d8a938&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
  {
    alt: 'serie1-5_capture.png',
    name: 'serie1 5 capture',
    url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f588595-2ebf-4070-ad20-bd156f9dd75c/serie1-5_capture.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220813%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220813T173228Z&X-Amz-Expires=3600&X-Amz-Signature=c5582b4c975cb2f338cb2e38558f3f8be0e58246ea99401e91038eb235d8a938&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
  {
    alt: 'serie1-5_capture.png',
    name: 'serie1 5 capture',
    url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f588595-2ebf-4070-ad20-bd156f9dd75c/serie1-5_capture.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220813%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220813T173228Z&X-Amz-Expires=3600&X-Amz-Signature=c5582b4c975cb2f338cb2e38558f3f8be0e58246ea99401e91038eb235d8a938&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
  {
    alt: 'serie1-5_capture.png',
    name: 'serie1 5 capture',
    url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f588595-2ebf-4070-ad20-bd156f9dd75c/serie1-5_capture.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220813%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220813T173228Z&X-Amz-Expires=3600&X-Amz-Signature=c5582b4c975cb2f338cb2e38558f3f8be0e58246ea99401e91038eb235d8a938&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
  {
    alt: 'serie1-5_capture.png',
    name: 'serie1 5 capture',
    url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f588595-2ebf-4070-ad20-bd156f9dd75c/serie1-5_capture.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220813%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220813T173228Z&X-Amz-Expires=3600&X-Amz-Signature=c5582b4c975cb2f338cb2e38558f3f8be0e58246ea99401e91038eb235d8a938&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
  {
    alt: 'serie1-5_capture.png',
    name: 'serie1 5 capture',
    url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f588595-2ebf-4070-ad20-bd156f9dd75c/serie1-5_capture.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220813%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220813T173228Z&X-Amz-Expires=3600&X-Amz-Signature=c5582b4c975cb2f338cb2e38558f3f8be0e58246ea99401e91038eb235d8a938&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
  {
    alt: 'serie1-5_capture.png',
    name: 'serie1 5 capture',
    url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f588595-2ebf-4070-ad20-bd156f9dd75c/serie1-5_capture.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220813%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220813T173228Z&X-Amz-Expires=3600&X-Amz-Signature=c5582b4c975cb2f338cb2e38558f3f8be0e58246ea99401e91038eb235d8a938&X-Amz-SignedHeaders=host&x-id=GetObject',
  },
] as MediaContent[]

// mixins(Page)
export default (Vue as ComponentWithCustomOptionsConstructor<VProjectOptions>).extend({
  name: 'Project',
  components: { VRichText, VMasonry, VMasonryItem },
  mixins: [Page],
  data() {
    return {
      imagesLoaded: false,
    }
  },
  mediaCarousel: 5,
  computed: {
    ...mapGetters(['projectsData']),
    project(): ProjectData | undefined {
      return (this.projectsData as ProjectData[]).find((project) => this.$route.params?.slug === project.slug)
    },
    mainTag(): SelectOptionParsed | undefined {
      return this.project?.type?.options?.[0]
    },
    otherTags(): SelectOptionParsed[] | undefined {
      return this.project?.type?.options.filter((_tag: SelectOptionParsed, i: number) => i !== 0)
    },
    carouselMedia(): MediaContent[] | undefined {
      return this.project?.imageList?.slice(0, this.$options.mediaCarousel)
    },
    othersMedia(): MediaContent[] | null {
      const medias = this.project?.imageList
      if (!medias && !medias?.length) return null
      return medias.slice(this.$options.mediaCarousel, medias.length)
    },
    isDesktop(): boolean {
      return this.$store.state.windowWidth >= getBreakpointValue('md')
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
      // this.getPosition()
      if (this.othersMedia) this.fetchImageLoad()
    })
  },
  updated() {
    // if (this.othersMedia && !this.imagesLoaded) this.fetchImageLoad()
  },
  methods: {
    createImageElement(): HTMLImageElement[] {
      const medias = this.othersMedia
      const images = medias.map(() => new Image())
      images.forEach((img: HTMLImageElement) => (img.src = medias.url))
      return images
    },
    async fetchImageLoad() {
      const images = this.createImageElement()
      console.log('image url', images.src)
      await this.waitImageLoaded(images).then((data: any) => {
        console.log(data)
        // const promiseResponse = data as ImageResponse
        // if (promiseResponse.path[0] && promiseResponse.type === 'load') {
        //   const img = promiseResponse.path[0]
        //   console.log(img.width, img.height)
        //   this.imageSize = {
        //     ratio: img.height / img.width,
        //     width: img.width,
        //     height: img.height,
        //   }
        // }
      })
      //   .catch((error) => console.log('error when load img', error))

      // Promise.all(promiseArray).then((values) => {
      //   console.log(values)
      // })
    },
    waitImageLoaded(imageElement: HTMLImageElement | HTMLImageElement[]) {
      if (Array.isArray(imageElement)) {
        console.log(imageElement)
        return imageElement.map((img) => {
          return new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          imageElement.onload = resolve
          imageElement.onerror = reject
        })
      }
    },
    getPosition() {
      const medias = this.$refs.list as HTMLElement[]

      if (!medias?.length) return

      const rectLeftPos = medias.map((item) => item.getBoundingClientRect().x)
      const leftColumns = [...new Set(rectLeftPos)]

      // console.log(rectLeftPos, leftColumns)

      medias.forEach((item, index) => {
        const columnIndex = leftColumns.findIndex((leftValue) => leftValue === rectLeftPos[index])
        item.classList.add(this.$style[`column-${columnIndex}`])
      })
    },
  },
})
</script>

<style lang="scss" module>
.project {
  padding: 0 calc(var(--padding-border) / 2);
}

.head {
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(12, 1fr);
  align-content: flex-start;
  min-height: 100vh;
  padding: 100px 0 50px 0;
}

.left-column {
  grid-column: 1 / span 5;
  grid-row: 4 / span 3;
}

.description {
  margin-top: 35px;
  text-indent: 45px;
  font-weight: 300;
  font-style: italic;
}

.all-tag {
  margin-top: 40px;
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

.main-tag,
.wrapper-head,
.thumbnail-wrapper,
.short-description,
.thumbnail-info {
  grid-column: 7 / -1;
}

.wrapper-head {
  display: flex;
  align-items: flex-end;
}

.series {
  margin-bottom: 20px;
}

.main-tag {
  color: color(main-orange);
  text-transform: uppercase;
}

.name {
  margin: 15px 0;
}

.short-description {
  margin-bottom: 20px;
}

.thumbnail-wrapper {
  z-index: 1;
  padding: 60px;
  background-color: white;
  max-width: 650px;
}

.thumbnail-inner {
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.thumbnail {
  object-fit: contain;
  width: 100%;
  height: auto;
}

.thumbnail-info {
  margin-top: 15px;
}

.carousel {
  height: 100vh;
  padding: 200px 0;
}

.carousel-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
}

.wrapper-image {
  position: relative;
  overflow: hidden;
  flex: 15%;
  height: 100%;
  background-color: color(grey-50);
  transition: all 800ms;

  &:not(:last-child) {
    margin-right: 25px;
  }

  .carousel-inner:hover &:not(:hover) {
    filter: grayscale(1);
  }

  &:hover {
    flex: 95vw;
    filter: grayscale(0);
    height: 120%;
    //transform: translateY(-30px);
  }
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  //align-items: flex-end;
  //grid-gap: 30px;
  margin: 200px 0 300px;

  //column-count: 3;
  //column-gap: 30px;
}

.list-image-wrapper {
  position: relative;
  grid-column: span 1;

  //-webkit-column-break-inside: avoid;
  margin-bottom: 30px;
  //column-fill: balance;

  &.column-0 {
    top: -100px;
  }

  &.column-1 {
    top: 40px;
  }

  &.column-2 {
    top: -40px;
  }
}

.image {
  width: 100%;
}
</style>
