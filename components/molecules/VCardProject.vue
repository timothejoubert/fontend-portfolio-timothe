<template>
  <div
    v-if="!!projectData"
    :class="[$style.card, cardIndex % 2 && $style['card--odd']]"
  >
    <nuxt-link :to="`/projets/${projectData.slug}`" :class="$style.card__inner">
      <div :class="$style.infos">
        <h1 v-if="projectData.name" class="title-card" :class="$style.title">
          {{ projectData.name }}
          <img
            :src="require('~/static/icons/arrow-project.png')"
            alt="icon arrow link inside project"
            :class="$style['arrow-project']"
          />
        </h1>
        <div v-if="!!projectData?.type?.options.length" :class="$style.types">
          <span
            v-for="type in projectData.type.options"
            :key="type.id"
            :class="$style.type"
            class="tag-m"
            >{{ type.name }}</span
          >
        </div>
        <v-rich-text
          :content="projectData.shortDescription"
          :class="$style['description']"
          class="body-s"
        />
      </div>

      <div :class="$style['wrapper-media']">
        <img
          v-if="projectData.thumbnail"
          :class="$style.media"
          :src="projectData.thumbnail.url"
          :alt="projectData.thumbnail.name"
        />
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ProjectData } from '~/utils/api/notion-custom-type'
import VRichText from '~/components/atoms/VRichText.vue'
import { MediaContent, parseMedia, parseTitle } from '~/utils/block-parser'
import { NotionPropertiesTitle } from '~/utils/api/notion-block-type'

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
  // methods: {
  //   async getPageContent(id: string) {
  //     const postResponse = await fetch('/.netlify/functions/projectPage', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         pageId: id,
  //       }),
  //     }).then((res) => res.json())
  //
  //     console.log({ postResponse })
  //   },
  // },
})
</script>

<style lang="scss" module>
.card {
  margin: 0 auto 200px auto;
  max-width: 1100px;
  padding: 0 40px;
  transform: rotate(-5deg);
  transition: transform 400ms ease-out;

  &:not(.card--odd):hover {
    transform: rotate(-2deg);
  }

  &.card--odd {
    transform: rotate(5deg);
    &:hover {
      transform: rotate(3deg);
    }
  }
}

.card__inner {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.infos {
  order: 1;
  margin-left: 30px;
  color: color(main-orange);
  max-width: 530px;

  .card--odd & {
    order: 0;
    margin-right: 30px;
    text-align: right;
  }
}

.title {
  display: inline;
}

.arrow-project {
  position: relative;
  width: 55px;
  height: 55px;
  top: 5px;

  img {
    width: 100%;
  }
}
.types {
  margin: 15px 0;
}
.type {
  padding: 3px 12px;
  border-radius: 24px;
  background-color: color(main-orange);
  color: color(white);

  &:not(:last-child) {
    margin-right: 10px;
  }
}

.description {
  margin-top: 15px;
  display: block;
  color: color(main-orange);
}

.wrapper-media {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  min-height: 200px;
  background-color: lightgrey;
  //aspect-ratio: 1 /1;
  width: 400px;

  &::after {
    position: absolute;
    content: '';
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    object-fit: cover;
    height: 100%;
    opacity: 0;
    //mix-blend-mode: screen;
    mix-blend-mode: exclusion;
    background: url('~static/images/texture-scratch.gif');

    .card:hover & {
      opacity: 0.2;
    }
  }
}

.media {
  width: 100%;
}
</style>
