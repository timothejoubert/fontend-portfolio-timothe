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
        class="tag-m"
        >{{ type.name }}</span
      >
    </div>
    <div :class="$style['wrapper-media']">
      <img
        v-if="projectData.thumbnail"
        :class="$style.media"
        :src="projectData.thumbnail.url"
        :alt="projectData.thumbnail.name"
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
import { MediaContent, parseMedia, parseTitle } from '~/utils/block-parser'
import { NotionPropertiesTitle } from '~/utils/api/notion-block-type'
import { getMeta } from '~/utils/functions'

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
  async mounted() {
    const img = await (this.projectData?.thumbnail?.url &&
      getMeta(this.projectData.thumbnail.url))

    console.log(img?.width, img?.height, 'ratio ', img?.width / img?.height)
  },
})
</script>

<style lang="scss" module>
.root {
  grid-column: 2 / span 4;
  padding: 25px;
  margin-bottom: 160px;
  display: block;
  background-color: color(white);
  transition: transform 400ms;

  &--odd {
    grid-column: 7 / span 5;
  }

  &:hover {
    transform: rotate(0) !important;
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
  &:not(:last-child) {
    margin-right: 15px;
  }
}

.wrapper-media,
.media {
  width: 100%;
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
