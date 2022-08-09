<template>
  <div>
    <nuxt-link to="/">Retour accueil</nuxt-link>
    <section :class="$style.project">
      <div :class="$style.head">
        <v-rich-text
          v-if="project.description"
          :class="$style.description"
          class="body-l"
          :content="project.description"
        />
        <div v-if="mainTag" :class="$style['main-tag']" class="tag-m">
          {{ mainTag.name }}
        </div>
        <h1 class="text-h1" :class="$style.name">{{ project.name }}</h1>
        <div :class="$style['thumbnail-wrapper']">
          <img
            v-if="project.thumbnail"
            :class="$style.thumbnail"
            :src="project.thumbnail.url"
            :alt="project.thumbnail.name"
          />
        </div>
      </div>

      <div v-if="!!carouselMedia?.length" :class="$style['image-list']">
        <div :class="$style['container-images']">
          <div
            v-for="(img, i) in carouselMedia"
            :key="img.alt + '-' + i"
            :class="$style['wrapper-image']"
          >
            <img :src="img.url" :alt="img.name" :class="$style.image" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { ProjectData } from '~/utils/api/notion-custom-type'
import { MediaContent, SelectOptionParsed } from '~/utils/block-parser'
import VRichText from '~/components/atoms/VRichText.vue'
import { ComponentWithCustomOptionsConstructor } from '~/utils/types/options'

interface VProjectOptions {
  mediaCarousel: number
}

export default (
  Vue as ComponentWithCustomOptionsConstructor<VProjectOptions>
).extend({
  name: 'Project',
  components: { VRichText },
  mediaCarousel: 5,
  computed: {
    ...mapGetters(['projectsData']),
    project(): ProjectData | undefined {
      return (this.projectsData as ProjectData[]).find(
        (project) => this.$route.params?.slug === project.slug
      )
    },
    mainTag(): SelectOptionParsed | undefined {
      return this.project?.type?.options?.[0]
    },
    carouselMedia(): MediaContent[] | undefined {
      return this.project?.imageList?.slice(0, this.$options.mediaCarousel)
    },
    othersMedia(): MediaContent[] | null {
      const medias = this.project?.imageList
      if (!medias && medias.length) return null
      return medias.slice(this.$options.mediaCarousel, medias.length)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
})
</script>

<style lang="scss" module>
.project {
}

.head {
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(12, 1fr);
  align-content: flex-start;
  min-height: 100vh;
  padding: 200px 0 50px 0;
}

.description {
  grid-column: 1 / span 5;
  grid-row: 1 / span 3;
  margin-top: 35px;
  text-indent: 45px;
  font-weight: 300;
  font-style: italic;
}

.main-tag,
.name,
.thumbnail-wrapper {
  grid-column: 7 / -1;
}

.main-tag {
  color: color(main-orange);
  text-transform: uppercase;
}

.name {
  margin: 15px 0;
}

.thumbnail-wrapper {
  grid-row: 3 / 6;
  max-height: 600px;
  overflow: hidden;
}

.thumbnail {
  object-fit: contain;
  height: 100%;
  width: auto;
}

.image-list {
  height: 100vh;
  padding: 200px 0;
}

.container-images {
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

  .container-images:hover &:not(:hover) {
    filter: grayscale(1);
  }

  &:hover {
    flex: 95vw;
    filter: grayscale(0);
    height: 120%;
    //transform: translateY(-30px);
  }
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
