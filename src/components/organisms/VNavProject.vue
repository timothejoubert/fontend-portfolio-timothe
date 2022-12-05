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
import { isDate, isPromoteFilter, isRandomFilter } from '~/utils/get-input-type'

export default Vue.extend({
    name: 'VNavProject',
    components: { VProjectCard },
    data() {
        return {
            defaultColumnCard: 3,
            activeProject: '',
            randomizeValue: '',
            projectOrder: false,
            isPromoted: false,
        }
    },
    computed: {
        ...mapGetters(['projectsData']),
        tagFilter(): string[] {
            return this.$store.state.selectedFilter
        },
        activeFilter(): string[] {
            return this.$store.state.activeFilters
        },
        allProject(): ProjectContent[] | [] {
            if (!this.$store.state.projectsData) return []
            return [...new Array(1)].map(() => this.$store.state.projectsData).flat()
        },
        isPromoteActive(): boolean {
            return (
                !!this.activeFilter?.length &&
                !!this.activeFilter?.filter((filter: string) => isPromoteFilter(filter))?.length
            )
        },
        activeRandomize(): boolean {
            return (
                !!this.activeFilter?.length &&
                !!this.activeFilter?.filter((filter: string) => isRandomFilter(filter))?.length
            )
        },
        isOrderedActive(): boolean {
            return (
                !!this.activeFilter?.length && !!this.activeFilter?.filter((filter: string) => isDate(filter))?.length
            )
        },
        projects(): ProjectContent[] | [] {
            let projects = this.allProject

            if (this.tagFilter?.length) {
                projects = this.allProject.filter((project: ProjectContent) => {
                    return project.tags?.some((tag) => this.tagFilter.includes(tag.slug))
                })
            }

            if (this.activeRandomize) projects = projects.sort(() => 0.5 - Math.random())
            if (this.isPromoteActive) projects = projects.filter((project: ProjectContent) => project.promoted)

            projects = this.isOrderedActive
                ? projects.sort(
                      (previousProject, nextProject) => Number(nextProject.date) - Number(previousProject.date)
                  )
                : projects.sort(
                      (previousProject, nextProject) => Number(previousProject.date) - Number(nextProject.date)
                  )
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
    },
    beforeDestroy() {},
    methods: {
        getActiveRoute() {
            this.activeProject = this.$route.params.slug
        },
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
