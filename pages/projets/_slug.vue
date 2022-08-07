<template>
  <div>
    <nuxt-link to="/">Retour accueil</nuxt-link>
    <h1>{{ project.name }}</h1>
    <div v-if="project.imageList" :class="$style.images">
      <img :src="img.url" :alt="img.name" v-for="img in project.imageList" :class="$style.image" :key="img.slug">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { ProjectData } from '~/utils/api/notion-custom-type'

export default Vue.extend({
  name: 'Project',
  computed: {
    ...mapGetters(['projectsData']),
    project(): ProjectData | undefined {
      return (this.projectsData as ProjectData[]).find(
        (project) => this.$route.params?.slug === project.slug
      )
    },
  },
})
</script>

<style lang="scss" module>
.images {
  display: flex;
  flex-wrap: wrap;
}
.image {
  width: 33%;
}
</style>
