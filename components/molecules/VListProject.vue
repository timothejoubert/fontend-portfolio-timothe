<template >
    <main id="main" :class="$style.root" v-if="projectDataList">
      <template v-for="(projectData,i) in projectDataList">
        <v-card-project v-bind="{projectData}" :card-index="i" :key="i"/>
      </template>
  </main>

</template>

<script lang="ts">
import Vue from 'vue'
import VCardProject from "~/components/molecules/VCardProject.vue";
import { mapGetters } from 'vuex'
import { ProjectData } from '~/utils/api/notion-custom-type';

export default Vue.extend({
  name: 'VListProject',
  components: { VCardProject },
  computed: {
    ...mapGetters(['projectsData', 'introDone']),
    projectDataList(): ProjectData[] {
      return this.projectsData?.map((project: ProjectData) => {
        const {id, name, url, thumbnail, date, shortDescription, type } = project || {}
        return { id, name, url, thumbnail, date, shortDescription, type }
      })
    },
  }
})
</script>

<style lang="scss" module>
.root {
  //display: grid;
  //grid-template-columns: repeat(2, 1fr);
  //max-width: 900px;
  padding-top: 400px;
  display: flex;
  flex-direction: column;
}
</style>
