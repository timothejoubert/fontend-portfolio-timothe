<template>

    <div :class="[$style.card, cardIndex % 2 && $style['card--odd']]" v-if="!!projectInfo">
      <nuxt-link to="/" :class="$style.card__inner">

        <div :class="$style.infos">
          <h1 v-if="projectInfo.name" class="title-card" :class="$style.title">
            {{ projectInfo.name }}
            <img :src="require('~/static/icons/arrow-project.png')" alt="icon arrow link inside project" :class="$style['arrow-project']">
          </h1>
          <p :class="$style['short-description']">Des corps congestionnés par la feuille</p>
        </div>

        <div :class="$style['wrapper-media']">
          <img v-if="projectInfo.thumbnail[0].url" :class="$style.media" :src="projectInfo.thumbnail[0].url" :alt="projectInfo.thumbnail[0].name" />
        </div>
      </nuxt-link>
    </div>

</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ProjectData } from "~/types/api-type.d.ts";
// import {NotionDatabaseContent, NotionDateProperty} from "~/netlify/responseDataType";

export interface MediaContent {
  url?: string | null
  alt?: string | null
}

export interface ProjectMainInfo {
  id?: string | null
  name?: string | null
  url?: string | null
  cover?: string | null
  annee?: string | number | null
  focus?: boolean | null
  thumbnail?: MediaContent[] | null
}

export default Vue.extend({
  name: 'VCardProject',
  props: {
      cardIndex: 0,
      project: {} as PropType<ProjectData>,
  },
  computed: {
    projectInfo(): ProjectMainInfo {
      //console.log(this.project)
      const {id, name, url, cover, annee, focus, thumbnail } = this.project || {}
      return { id, name, url, cover, annee, focus, thumbnail }
    },
  },
  methods: {
    async getPageContent(id: string) {
      const postResponse = await fetch('/.netlify/functions/projectPage', {
        method: 'POST',
        body: JSON.stringify({
          pageId: id,
        }),
      }).then((res) => res.json())

      console.log({ postResponse })
    },
  }
})
</script>

<style lang="scss" module>

.card {
  margin: 0 auto 300px auto;
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
.short-description {
  @include noi;
  font-weight: 300;
  margin-top: 10px;
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

.media{
  width: 100%;
}
</style>
