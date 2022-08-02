<template >
    <main id="main" :class="$style.root" v-if="projectInfo">
      <template v-for="(project,i) in projectInfo">
        <v-card-project v-bind="{project}" :card-index="i" :key="i"/>
      </template>
  </main>

</template>

<script lang="ts">
import Vue from 'vue'
import VCardProject, {MediaContent} from "~/components/molecules/VCardProject.vue";
import { mapGetters } from 'vuex'

export interface ProjectCardInfo {
  name?: any | null
  id?: string | null
  url?: string | null
  cover?: string | null
  annee?: string | number | null
  focus?: boolean | null
  thumbnail?: MediaContent[] | null
}

export default Vue.extend({
  name: 'VListProject',
  components: { VCardProject },
  computed: {
    ...mapGetters(['projectsData', 'introDone']),
    projectInfo(): ProjectCardInfo[] {
      return this.projectsData?.map((project: ProjectCardInfo) => {
        const {id, name, url, cover, annee, focus, thumbnail } = project || {}
        return { id, name, url, cover, annee, focus, thumbnail }
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
