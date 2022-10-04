<template>
    <section :class="$style.project">
        <h1 v-if="project">Project page: {{ project.title }}</h1>
        <p @click="onClick">close</p>
        <div :class="$style.content"></div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ProjectContent } from '~/utils/parseProjects'

export default Vue.extend({
    name: 'VProject',
    components: {},
    props: {
        project: Object as PropType<ProjectContent>,
    },
    methods: {
        onClick(): void {
            this.$emit('closeProject')
        },
    },
})
</script>

<style lang="scss" module>
.project {
    position: relative;
    top: 0;
    height: 100vh;
    flex: 0 0 50%;
    padding: 30px;
    border-left: 1px solid var(--color-main);
    background-color: var(--color-bg);
    overflow-x: hidden;
    overflow-y: scroll;
}
.content {
    height: 200vh;
}
</style>
