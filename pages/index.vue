<template>
    <div :class="$style.root">
        <v-home />
        <!--        <h1>home page</h1>-->
        <!--        &lt;!&ndash;      <pre v-if="projects">{{ projects }}</pre>&ndash;&gt;-->
        <!--        <ul v-if="projects" :class="$style.projects">-->
        <!--            <li v-for="(project, i) in projects" :key="i" :class="$style['wrapper-img']">-->
        <!--                <router-link :to="`/projets/${project.slug}`">-->
        <!--                    <h1 v-if="project.title">{{ project.title }}</h1>-->
        <!--                    <p v-if="project.description">{{ project.description }}</p>-->
        <!--                    <v-image :strapi-image="project.thumbnail" />-->
        <!--                </router-link>-->
        <!--            </li>-->
        <!--        </ul>-->
        <!--        <div v-else>-->
        <!--            <h1>oups je suis pas Back-end... J'arrive pas à récupérer mes données.</h1>-->
        <!--        </div>-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VHome from '~/components/organisms/VHome.vue'

export default Vue.extend({
    name: 'Index',
    components: { VHome },
})
</script>

<style lang="scss" module>
.root {
    user-select: auto;
}
</style>
