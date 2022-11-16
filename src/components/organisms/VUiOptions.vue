<template>
    <section :class="rootClasses" :aria-hidden="isOpen.toString()">
        <v-section-parameter v-for="(section, i) in sections" :key="i" :section="section" :class="$style.section" />
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import VSectionParameter from '~/components/molecules/VSectionParameter.vue'
import UI_PARAMETERS from '~/data/ui-options-data'

export default Vue.extend({
    name: 'VUiOptions',
    components: { VSectionParameter },
    props: {
        isOpen: Boolean,
    },
    computed: {
        rootClasses(): (string | boolean | undefined)[] {
            return [this.$style.root, this.isOpen && this.$style['root--open']]
        },
        sections(): ParameterSection[] {
            return UI_PARAMETERS
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: absolute;
    z-index: 10;
    top: 0;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 0 var(--padding-border);
    background-color: var(--color-bg);
    transform: translateY(-100%);
    transition: transform 0.6s;

    &--open {
        transform: translateY(calc(var(--top-bar-height) * 1px));
    }
}
.section {
    flex: 1 0 50%;

    @include media('>=md') {
        //flex: 0 0 50%;
        &:nth-child(2) {
            padding-left: 10px;
        }
    }
}
</style>
