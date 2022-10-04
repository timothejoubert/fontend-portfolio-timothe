<template>
    <div :class="$style.root">
        <div v-if="projects" :class="$style['wrapper-projects']">
            <ul :class="$style.projects">
                <li v-for="(project, i) in projects" :key="i" :class="$style['wrapper-img']">
                    <!--                <router-link :to="`/projets/${project.slug}`">-->
                    <div @click.prevent="$emit('openProject', project.slug)">
                        <h1 v-if="project.title">{{ project.title }}</h1>
                        <p v-if="project.description">{{ project.description }}</p>
                        <v-image :strapi-image="project.thumbnail" />
                    </div>
                    <!--                </router-link>-->
                </li>
            </ul>
        </div>
        <div v-else>
            <h1>oups je suis pas Back-end... J'arrive pas à récupérer mes données.</h1>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VImage from '~/components/atoms/VImage.vue'
import { ProjectContent } from '~/utils/parseProjects'

export default Vue.extend({
    name: 'VHome',
    components: { VImage },
    computed: {
        ...mapGetters(['projectsData']),
        projects(): ProjectContent[] | undefined {
            return this.$store.state.projectsData
        },
    },
    methods: {
        onClick(event: MouseEvent): void {
            event.preventDefault()
            this.$emit('openProject', event.target)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    width: 100%;
}

.wrapper-projects {
    height: 100vh;
    -ms-overflow-style: none; /* IE and Edge */
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
}
.projects {
    display: grid;
    max-width: var(--max-width);
    min-height: 200vh;
    grid-auto-rows: min-content;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(var(--size-card), 1fr));
}

.project {
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
