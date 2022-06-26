<template>

    <div :class="$style.card" v-if="!!projectInfo">

        <h1 v-if="projectInfo.name" class="text-h2">{{ projectInfo.name }} </h1>
        <p v-if="false">{{ projectInfo }} </p>

        <div :class="$style['wrapper-media']">
          <img v-if="projectInfo.thumbnail" :class="$style.media" :src="projectInfo.thumbnail" alt="">
        </div>

      </div>

</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import {ProjectData} from "~/pages/index.vue";
import {NotionDatabaseContent, NotionDateProperty} from "~/netlify/responseDataType";

export interface ProjectMainInfo {
  id: string | null
  name?: string | null
  url: string | null
  cover?: string | null
  annee?: string | number | null
  focus?: boolean | null
  thumbnail: string | null
}

export default Vue.extend({
  name: 'VCardProject',
  props: {
      project: {} as PropType<ProjectData>,
  },
  computed: {
    projectInfo(): ProjectMainInfo {
      console.log(this.project)
      const {id, name, url, cover, annee, focus, thumbnail } = this.project || {}
      return { id, name, url, cover, annee, focus, thumbnail }
    },
  }
})
</script>

<style lang="scss" module>
.wrapper-media {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  background-color: lightgrey;
  aspect-ratio: 1 /1;
  width: 200px;
}
.media{
  width: 100%;
}
</style>
