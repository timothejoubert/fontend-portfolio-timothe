<template>
    <div :class="$style.root">
        <div :class="[$style['main-layout'], !!currentProject && $style['main-layout--minify']]">
            <v-header />
            <v-home @openProject="openProject" />
            <v-about />
        </div>
        <transition name="project-modal">
            <v-project v-if="!!currentProject" :project="currentProject" @closeProject="closeProject" />
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VHeader from '~/components/organisms/VHeader.vue'
import VHome from '~/components/organisms/VHome.vue'
import VProject from '~/components/organisms/VProject.vue'
import { ProjectContent } from '~/utils/parseProjects'

export default Vue.extend({
    components: { VHeader, VHome, VProject },
    data() {
        return {
            currentProject: undefined as ProjectContent | undefined,
        }
    },
    computed: {
        ...mapGetters(['projectsData']),
        projects(): ProjectContent[] | undefined {
            return this.$store.state.projectsData
        },
    },
    methods: {
        openProject(value: string): void {
            console.log(value)
            this.currentProject = this.projects?.filter((project: ProjectContent) => project.slug === value)[0]
        },
        closeProject(): void {
            this.currentProject = undefined
            console.log('close project', this.currentProject)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    overflow: hidden;
    height: 100vh;
    color: var(--color-main);
}

.main-layout {
    position: relative;
    max-width: var(--max-width);
    flex: 0 0 100%;
    padding: 0 20px;
    margin: 0 auto;
    transition: all 1.2s ease(out-quart);

    &--minify {
        flex: 0 0 50%;
    }
}
</style>
