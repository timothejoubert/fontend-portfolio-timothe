<template>
    <section :class="$style.project">
        <h1 v-if="project">Project page: {{ project.title }}</h1>
        <p>page static project</p>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProjectContent } from '~/utils/parseProjects'

export default Vue.extend({
    name: 'Project',
    components: {},
    data() {
        return {
            project: {} as ProjectContent,
        }
    },
    mounted() {
        const pageSlug = this.$route.params.slug
        const projects = this.$store.state.projectsData
        this.project = projects.filter((project: ProjectContent) => project.slug === pageSlug)[0]
    },
})
</script>

<style lang="scss" module>
.project {
    position: relative;
    top: 0;
    width: 50vw;
    height: 100vh;
    border-left: 1px solid var(--color-main);
    background-color: var(--color-bg);
}
</style>
