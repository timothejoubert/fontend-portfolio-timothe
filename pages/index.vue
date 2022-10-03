<template>
  <div :class="$style.home">
    <h1>home</h1>
    <div>
      <!--      <ul v-if="!!projects">-->
      <!--        <li v-for="project in projects" :key="project.id">-->
      <!--          <h1>-->
      <!--            <nuxt-link :to="`/projets/${project.attributes.title}`">-->
      <!--              {{ project.attributes.title }}-->
      <!--            </nuxt-link>-->
      <!--          </h1>-->
      <!--        </li>-->
      <!--      </ul>-->
      <pre v-if="projects">{{ projects }}</pre>
      <ul v-if="projects">
        <li v-for="(project, i) in projects" :key="i" :class="$style['wrapper-img']">
          <v-image :strapi-image="project.thumbnail"></v-image>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import parseProjects from '~/utils/parseProjects'
import VImage from '~/components/atoms/VImage.vue'

export default Vue.extend({
  name: 'Index',
  components: { VImage },
  // layout: 'home',
  computed: {
    ...mapGetters(['projectsData']),
    projects(): ProjectContent[] {
      console.log(parseProjects(this.$store.state.projectsData))
      return parseProjects(this.$store.state.projectsData)
    },
  },
})
</script>

<style lang="scss" module>
.home {
  position: relative;
  width: 100%;
}
.wrapper-img {
  width: 100%;

  img {
    width: 100%;
  }
}
</style>
