<template>
  <footer :class="$style.footer">
    <div :class="$style.infos">
      <h1 v-if="title">{{ title }}</h1>
      <div v-if="!!links" :class="links">
        <a v-for="(link, i) in links" :key="i" :href="link.url">{{
          link.url
        }}</a>
      </div>
    </div>
    <div v-if="displayProjects && !!projects.length" :class="$style.projects">
      <nuxt-link
        v-for="(project, i) in projects"
        :key="i"
        :to="`/projets/${project.slug}`"
        :class="$style['project-list']"
      >
        <img :src="project.thumbnail.url" :alt="project.thumbnail.name" />
      </nuxt-link>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { mapGetters } from 'vuex'
import { ProjectData } from '~/utils/api/notion-custom-type'

export interface FooterLinkContent {
  url?: string
  name?: string
  externalLink?: boolean
}

export default Vue.extend({
  name: 'VFooter',
  props: {
    title: String,
    links: Array as PropType<FooterLinkContent[]>,
    displayProjects: { type: Boolean, default: false },
  },
  computed: {
    ...mapGetters(['projectsData']),
    projects(): ProjectData[] {
      return this.projectsData?.filter(
        (project: ProjectData) => project.slug !== this.$route.params.slug
      )
    },
  },
})
</script>

<style lang="scss" module>
.footer {
  border-top: 1px solid color(main-orange);
  padding: 15px 0;
}

.infos {
  display: flex;
  justify-content: space-between;
}

.projects {
  display: flex;
  margin: 30px 0 20px;
  column-gap: 20px;
}

.project-list {
  display: block;
  aspect-ratio: 1 / 1;
  width: 120px;
  filter: grayscale(1);

  &:hover {
    filter: grayscale(0);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
