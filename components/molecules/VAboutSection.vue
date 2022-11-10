<template>
    <div v-if="section" :class="$style.root">
        <h2 v-if="section.title" :class="[$style.title, 'over-title-xs']">{{ section.title }}</h2>
        <v-about-article v-for="(article, indexArticle) in section.articles" :key="indexArticle" :article="article" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import VAboutArticle from '~/components/molecules/VAboutArticle.vue'

export default Vue.extend({
    name: 'VAboutArticles',
    components: { VAboutArticle },
    props: {
        section: Object as PropType<AboutSection>,
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    width: max(50%, 380px);
    margin-bottom: rem(90);

    @include media('>=md') {
        width: rem(300);
    }
}

.title {
    padding-bottom: rem(38);
    opacity: 0.4;
    text-transform: uppercase;
}
</style>
