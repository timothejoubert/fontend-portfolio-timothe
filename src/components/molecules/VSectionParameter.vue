<template>
    <div :class="$style.root">
        <div :class="$style.head">
            <h3 v-if="section && !!section.title" :class="[$style.title, 'over-title-l']">{{ section.title }}</h3>
            <v-button
                v-if="section.displayHeaderButton"
                :class="[$style.reset, 'over-title-s']"
                theme="yellow"
                size="s"
                :name="section.title"
                :tabindex="!isUiOptionsOpen && '-1'"
                @update="reset"
                >Reset</v-button
            >
        </div>
        <div v-for="(parameter, indexContent) in parameters" :key="indexContent" :class="$style.content">
            <h4 v-if="parameter.title" :class="[$style['content-title'], 'over-title-s']">{{ parameter.title }}</h4>
            <v-input-factory
                v-for="(input, i) in parameter.children"
                :key="i"
                :is-visible="isUiOptionsOpen"
                :input-data="input"
                @reset="reset"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { mapGetters } from 'vuex'
import VButton from '~/components/atoms/VButton.vue'
import MutationType from '~/constants/mutation-type'
import { removeCssProp } from '~/utils/functions'

export default Vue.extend({
    name: 'VSectionParameter',
    components: { VButton },
    props: {
        section: Object as PropType<ParameterSection>,
    },
    computed: {
        ...mapGetters(['isUiOptionsOpen']),
        parameters(): ParameterContent[] {
            return this.section.parameters
        },
        isInterface(): boolean {
            return this.section.title === 'Interface'
        },
        isFilter(): boolean {
            return this.section.title === 'Project filters'
        },
    },
    methods: {
        reset() {
            if (this.isInterface) {
                removeCssProp(`--color-main`) //, Colors.MAIN)
                removeCssProp(`--color-bg`) //, Colors.BG)
                removeCssProp(`--color-accent`) //, Colors.ACCENT)
                removeCssProp(`--card-number`) //, Colors.ACCENT)
            }

            if (this.isFilter) {
                this.$store.commit(MutationType.SELECTED_FILTER, '')
            }
        },
    },
})
</script>

<style lang="scss" module>
.root {
    padding: rem(26) 0;
}

.head {
    display: flex;
    align-items: center;
    margin-bottom: rem(20);
}

.reset {
    margin-left: rem(16);
}

.title,
.reset {
    display: inline-block;
}

.content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &:not(:last-child) {
        margin-bottom: rem(15);
    }
}

.content-title {
    margin-right: rem(20);
    opacity: 0.35;
}

.input {
    &:not(:last-child) {
        margin-right: rem(18);
    }
}
</style>
