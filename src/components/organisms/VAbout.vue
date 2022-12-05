<template>
    <div :class="$style.root">
        <v-html-parser v-if="about.description" :class="[$style.description, 'body-l']" :content="about.description" />

        <div v-if="sections" :class="$style.sections">
            <v-about-section v-for="(section, indexSection) in sections" :key="indexSection" :section="section" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import VAboutSection from '~/components/molecules/VAboutSection.vue'
import VHtmlParser from '~/components/atoms/VHtmlParser.vue'

export default Vue.extend({
    name: 'VAbout',
    components: { VAboutSection, VHtmlParser },
    props: {
        about: Object as PropType<AboutBlock>,
    },
    computed: {
        sections(): AboutSection[] | false {
            return !!this.about?.sections?.length && this.about.sections
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    max-width: rem(960);
    margin: 0 auto;
}

.description {
    padding: rem(80) 0;
    color: lightgrey;
    word-break: break-word;

    & > b {
        padding: rem(8) rem(9) rem(9);
        background-color: var(--color-about-yellow-bg);
        border-radius: rem(5);
        color: var(--color-about-yellow);
        font-weight: inherit;
        white-space: nowrap;
    }

    & > b:nth-last-child(-n + 3) {
        background-color: var(--color-about-purple-bg);
        color: var(--color-about-purple);
    }

    @include media('>=md') {
        padding: rem(115) 0 rem(105);

        & > b {
            padding: rem(10) rem(12) rem(13);
        }
    }
}
.sections {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
