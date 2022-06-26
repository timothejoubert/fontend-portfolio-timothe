<template >
    <div v-if="isCardDataLoaded" :class="$style.root">
      <div v-for="project in projectInfo" :key="project.id" >
        <v-card-project v-bind="{project}"/>
      </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import {ProjectData} from "~/pages/index.vue";
import {NotionDatabaseContent, NotionDateProperty} from "~/netlify/responseDataType";
import VCardProject from "~/components/molecules/VCardProject.vue";

export interface ProjectCardInfo {
  id: string | null
  name?: string | null
  url: string | null
  cover?: string | null
  annee?: string | number | null
  focus?: boolean | null
  thumbnail: string | null
}

export default Vue.extend({
  name: 'VListProject',
  components: {VCardProject},

  props: {
    projectList: [] as PropType<ProjectData[]>,
  },
  data(){
    return {
      projectLength: 64,
    }
  },
  computed: {
    projectInfo(): ProjectCardInfo[] | undefined {
      const parseCard = this.projectList?.map((project) => {
        const {id, name, url, cover, annee, focus, thumbnail } = project || {}
        return { id, name, url, cover, annee, focus, thumbnail }
      })

      return parseCard
    },
    isCardDataLoaded(): boolean {
      return !!this.projectInfo?.length
    }
  }
})
</script>

<style lang="scss" module>
.root {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
