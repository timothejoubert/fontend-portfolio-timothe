<template>
  <main :class="$style.root">
    <h1 :class="$style.title" class="text-h1">Notion Nuxt Todo</h1>

    <v-card-project />

  </main>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { NotionDatabaseContent, NotionDateProperty } from '~/netlify/responseDataType'
import VCardProject from '~/components/molecules/VCardProject.vue'
import Vue from "vue";

type StringOrMultiple = string | string[] | null

export interface ProjectData {
  id: string | null
  pageName?: string | null
  url: string | null
  cover?: string | null
  date?: NotionDateProperty | null
  annee?: string | number | null
  techno?: StringOrMultiple | null
  cadre: StringOrMultiple
  media: string[] | null
  github: string | null
  domaines: StringOrMultiple
  focus?: boolean | null
  Lien: string | null
  thumbnail: string | null
}

export default Vue.extend({
  name: 'index',
  components: {VCardProject},
  data() {
    return {
      isLoaded: false,
    }
  },
  mounted() {
    window.setTimeout( () => this.checkContentLoaded, 3000 )
  },
  computed: {
  },
  methods: {
    checkContentLoaded(): void {
      this.isLoaded = true
    }
  },
}
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100vh;
}
.title {
  color: color(orange);
}

</style>
