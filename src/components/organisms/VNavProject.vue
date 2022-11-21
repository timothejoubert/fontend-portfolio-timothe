<template>
    <nav :class="$style.root">
        <ul v-if="projects.length" ref="grid" :class="$style.projects">
            <li v-for="(project, projectIndex) in projects" :key="projectIndex">
                <v-project-card :index="projectIndex" :project="project" :active-project="activeProject" />
            </li>
        </ul>
        <ul v-else :class="$style.projects">
            <li
                v-for="i in defaultColumnCard"
                :key="i"
                :class="$style.placeholder"
                :style="{ '--placeholder-delay': i }"
            ></li>
        </ul>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VProjectCard from '~/components/molecules/VProjectCard.vue'
import { getCssProp } from '~/utils/functions'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'

export default Vue.extend({
    name: 'VNavProject',
    components: { VProjectCard },
    data() {
        return {
            defaultColumnCard: 3,
            activeProject: '',
            isRandomized: false,
            isPromoted: false,
        }
    },
    computed: {
        ...mapGetters(['projectsData']),
        filter(): string {
            return this.$store.state.selectedFilter
        },
        allProject(): ProjectContent[] | [] {
            // console.log(this.$store.state.projectsData)
            if (!this.$store.state.projectsData) return []
            return [...new Array(4)].map(() => this.$store.state.projectsData).flat()
        },
        projects(): ProjectContent[] | [] {
            let projects = this.allProject

            if (this.filter) {
                projects = this.allProject.filter((project: ProjectContent) => {
                    return project.tags?.some((tag) => tag.slug === this.filter)
                })
            }

            if (this.isRandomized) {
                projects = projects.sort(() => 0.5 - Math.random())
                // this.restoreData('randomize')
            }

            if (this.isPromoted) {
                projects = projects.filter((project: ProjectContent) => project.promoted)
                // this.restoreData('promoted')
            }
            console.log('computed projects, length: ', projects.length)
            return projects
        },
    },
    watch: {
        $route() {
            this.getActiveRoute()
        },
    },
    mounted() {
        this.getActiveRoute()
        this.updateEmptyCardNumber()
        eventBus.$on(EventType.RANDOMIZE_PROJECTS, this.randomizeProjects)
        eventBus.$on(EventType.FILTER_BEST_PROJECTS, this.filterBestProjects)
    },
    beforeDestroy() {
        eventBus.$off(EventType.RANDOMIZE_PROJECTS, this.randomizeProjects)
        eventBus.$off(EventType.FILTER_BEST_PROJECTS, this.filterBestProjects)
    },
    methods: {
        updateEmptyCardNumber() {
            this.defaultColumnCard = Number(getCssProp('--card-number') || 4) * 3
            // const cardSize = Math.ceil(parseFloat(getCssProp('--size-card')))
            // const gutter = this.$refs?.grid
            //     ? Math.ceil(parseFloat(getComputedStyle(this.$refs.grid as HTMLElement)?.gap))
            //     : 20
            // const wrapperWidth =
            //     this.$store.state.windowWidth - Math.ceil(parseFloat(getCssProp('--padding-border'))) * 2
            // const column = Math.floor(wrapperWidth / cardSize)
            // const totalGutterWidth = gutter * (column - 1)
            // return Math.floor((wrapperWidth - totalGutterWidth) / cardSize) * 3
        },
        getActiveRoute() {
            this.activeProject = this.$route.params.slug
        },
        randomizeProjects() {
            this.isRandomized = !this.isRandomized
        },
        filterBestProjects() {
            this.isPromoted = !this.isPromoted
        },
        restoreData(data: string) {
            switch (data) {
                case 'randomize':
                    this.isRandomized = false
                    break
                case 'promoted':
                    this.isPromoted = false
                    break
            }
        },
    },
})
</script>

<style lang="scss" module>
.root {
    height: 100vh;
    padding: rem(52) 0 rem(220);
    -ms-overflow-style: none; /* IE and Edge */
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
}
.projects {
    display: grid;
    //max-width: var(--max-width);
    padding: 0 var(--padding-border);
    grid-auto-rows: min-content;
    grid-gap: 20px;
    //grid-template-columns: repeat(auto-fit, minmax(var(--size-card), 1fr));
    grid-template-columns: repeat(var(--card-number), 1fr);
}

.placeholder {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: rem(300);
    //background-color: var(--color-main);
    border-top-right-radius: rem(60);
    color: var(--color-bg);

    @include media('>=md') {
        height: rem(320);
    }

    @include media('>=xl') {
        height: rem(370);
    }

    &::after {
        position: absolute;
        background: linear-gradient(45deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.05) 100%);
        content: '';
        inset: 0;
        opacity: 1;
        transition: opacity 0.5s ease(out-quad);
    }

    //&::after {
    //    position: absolute;
    //    top: 0;
    //    left: 0;
    //    width: 100%;
    //    height: 100%;
    //    animation: placeholder-waiting 1.6s infinite calc(20ms * var(--placeholder-delay, 1)) ease(in-out-cubic);
    //    background-image: linear-gradient(
    //        to right,
    //        transparent 0%,
    //        rgba(255, 255, 255, 0.8) 15%,
    //        rgba(255, 255, 255, 0.8) 25%,
    //        transparent 40%
    //    );
    //    background-position: 120% 0;
    //    background-size: 120% 100%;
    //    content: '';
    //}
}

@keyframes placeholder-waiting {
    100% {
        background-position: -480% 0;
    }
}
</style>
