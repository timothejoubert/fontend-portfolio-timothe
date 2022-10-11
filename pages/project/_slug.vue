<template>
    <section :class="$style.project">
        <div ref="wrapper" :class="$style['project-inner']">
<!--            <pre>{{ project }}</pre>-->
            <h1 v-if="project">Project page: {{ project.title }}</h1>
            <p v-if="project.description">{{ project.description }}</p>
            <nuxt-link to="/">close</nuxt-link>
            <ul v-if="medias.length">
                <li v-for="(media, i) in medias" :key="i">
                    <v-image :strapi-image="media" />
                    <!--<pre>{{media}}</pre>-->
                </li>
            </ul>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProjectContent } from '~/utils/parseProjects'
// import VCounterDom from '~/components/atoms/VCounterDom.vue'

export default Vue.extend({
    name: 'Project',
    components: {},
    data() {
        return {
            project: {} as ProjectContent,
        }
    },
    computed: {
        medias(): ImageAttributes[] {
            const thumb = this.project.thumbnail
            const others =
                this.project?.medias?.filter((media: ImageAttributes) => {
                    return !!media
                }) ?? []
            if (thumb && !!others.length) return others.splice(0, 0, thumb)
            return [thumb]
        },
    },
    mounted() {
        const pageSlug = this.$route.params.slug
        const projects = this.$store.state.projectsData
        this.project = projects.filter((project: ProjectContent) => project.slug === pageSlug)[0]
        console.log('project data ', this.project)
        this.initDataIndex()
    },
    methods: {
        initDataIndex(): void {
            const children = Array.from((this.$refs.wrapper as HTMLElement).children).filter(
                (child) => child.nodeName !== '#text'
            )
            children.forEach((element, i) => element.setAttribute('data-index', String(i)))
        },
    },
})
</script>

<style lang="scss" module>
.project {
    position: relative;
    min-height: 100vh;
    flex: 1;
    border-left: 1px solid var(--color-main);
    background-color: var(--color-bg);
}

.project-inner {
    width: 100%;
    min-width: 50vw;
    padding: rem(40);
}
</style>
