<template>
    <div :class="$style.root">
        <v-bold-markdown
            v-if="about.description"
            :class="[$style.description, 'body-l']"
            :content="about.description"
        />

        <div v-if="sections" :class="$style.sections">
            <v-about-section v-for="(section, indexSection) in sections" :key="indexSection" :section="section" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import VAboutSection from '~/components/molecules/VAboutSection.vue'
import VBoldMarkdown from '~/components/atoms/VBoldMarkdown.vue'

export default Vue.extend({
    name: 'VAbout',
    components: { VAboutSection, VBoldMarkdown },
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

    @include media('>=md') {
        padding: rem(115) 0 rem(105);
    }
}

.sections {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
