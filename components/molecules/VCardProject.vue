<template>
  <nuxt-link
    v-if="!!projectData"
    :to="`/projets/${projectData.slug}`"
    :class="[$style.root, cardIndex % 2 && $style['root--odd']]"
  >
    <div v-if="!!projectData?.type?.options.length" :class="$style.types">
      <span
        v-for="type in projectData.type.options"
        :key="type.id"
        :class="$style.type"
        class="tag-s"
        >{{ type.name }}</span
      >
    </div>
    <div :class="$style['wrapper-media']">
      <img
        v-if="projectData.thumbnail"
        :class="$style.media"
        :src="projectData.thumbnail.url"
        :alt="projectData.thumbnail.name"
        :lazy="isLazyLoad"
      />
    </div>
    <h1 v-if="projectData.name" class="title-card" :class="$style.title">
      {{ cardIndex + '. ' + projectData.name }}
    </h1>
    <v-rich-text
      :content="projectData.shortDescription"
      :class="$style['description']"
      class="body-s"
    />
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ProjectData } from '~/utils/api/notion-custom-type'
import VRichText from '~/components/atoms/VRichText.vue'
// import { getMeta } from '~/utils/functions'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/generals'

export default Vue.extend({
  name: 'VCardProject',
  components: { VRichText },
  props: {
    cardIndex: Number,
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
    },
  },
  computed: {
    isLazyLoad(): boolean | string {
      return !toBoolean(GeneralsConst.LAZY_LOAD_IMAGE) && 'false'
    },
  },
  /*  async mounted() {
    const img = await (this.projectData?.thumbnail?.url &&
      getMeta(this.projectData.thumbnail.url))

    console.log(img?.width, img?.height, 'ratio ', img?.width / img?.height)
  }, */
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

.media {
  transition: grayscale 400ms;
  filter: grayscale(1);

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
