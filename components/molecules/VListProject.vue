<template>
  <main v-if="projectDataList" id="main" :class="$style.root">
    <template v-for="(projectData, i) in projectDataList">
      <v-card-project v-bind="{ projectData }" :key="i" :card-index="i" />
    </template>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VCardProject from '~/components/molecules/VCardProject.vue'
import { ProjectData } from '~/utils/api/notion-custom-type'

export default Vue.extend({
  name: 'VListProject',
  components: { VCardProject },
  computed: {
    ...mapGetters(['projectsData', 'introDone']),
    projectDataList(): ProjectData[] {
      return this.projectsData?.map((project: ProjectData) => {
        const { id, name, url, thumbnail, date, shortDescription, type } =
          project || {}
        return { id, name, url, thumbnail, date, shortDescription, type }
      })
    },
  },
})
</script>

<style lang="scss" module>
.root {
  padding-top: 400px;
  display: flex;
  flex-direction: column;
}
</style>
