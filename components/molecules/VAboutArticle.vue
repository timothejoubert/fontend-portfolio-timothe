<template>
    <div :class="$style.root">
        <h3 :class="[$style.title, 'body-m']">{{ article.title }}</h3>
        <p :class="[$style.body, 'body-s']">{{ article.body }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
    name: 'VAboutArticle',
    props: {
        article: Object as PropType<AboutArticle>,
    },
    computed: {
        // articles(): AboutArticle[] | false {
        //     return !!this.articles?.length && this.articles
        // },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    width: rem(300);

    &:not(:last-child) {
        padding-bottom: rem(23);
    }
}

.title {
    padding-bottom: rem(6);
}

.body {
    opacity: 0.6;
}
</style>
