<template>
    <div :class="$style.root">
        <div :class="[$style['main-layout'], isProjectOpen && $style['main-layout--minify']]">
            <v-header @toggle-options="toggleOptions" />
            <v-user-options :open="isOptionsOpen" />
            <v-nav-project />
            <div
                :class="[
                    $style.footer,
                    isProjectOpen && $style['footer--minify'],
                    isAboutOpen && $style['footer--expand'],
                ]"
            >
                <v-footer />
                <nuxt v-if="isAboutOpen" :class="$style['about-content']" />
            </div>
        </div>
        <transition name="project-modal">
            <nuxt v-if="isProjectOpen" :class="$style['project-content']" />
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router/types/router'
import VHeader from '~/components/organisms/VHeader.vue'
import VNavProject from '~/components/organisms/VNavProject.vue'
import { ProjectContent } from '~/utils/parseProjects'

export default Vue.extend({
    components: { VHeader, VNavProject },
    data() {
        return {
            isProjectOpen: false,
            isOptionsOpen: false,
            isAboutOpen: false,
            currentProject: undefined as ProjectContent | undefined,
        }
    },
    mounted() {
        this.initRoute()
    },
    watch: {
        $route(to: Route, _from: Route) {
            // const wasProject = from.path.includes('project')
            // const wasAbout = from.path.includes('about')

            this.isProjectOpen = to.path.includes('project') // || (to.path.includes('about') && wasProject)
            this.isAboutOpen = to.path.includes('about')
            // console.log(this.isAboutOpen, wasProject)

        },
    },
    methods: {
        toggleOptions(): void {
            this.isOptionsOpen = !this.isOptionsOpen
        },
        initRoute(): void {
            this.isProjectOpen = this.$route.path.includes('project') // || (to.path.includes('about') && wasProject)
            this.isAboutOpen = this.$route.path.includes('about')
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    color: var(--color-main);
}

.main-layout,
.footer {
    width: 100%;
    transition: width 1.2s ease(out-quart);

    &--minify {
        width: 50%;
    }
}

.main-layout {
    position: relative;
    padding: 0 20px;
}

.footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: var(--top-bar-height);
    padding: rem(20) rem(30);
    border-top: 1px solid var(--color-main);
    background-color: var(--color-bg);
    transition: height 1.2s ease(out-quart), width 1.2s ease(out-quart);

    &--expand {
        height: calc(100vh - var(--top-bar-height));
    }
}
</style>
