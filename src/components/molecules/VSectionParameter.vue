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
                ref="input-factory"
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
                removeCssProp(`--color-main`)
                removeCssProp(`--color-bg`)
                removeCssProp(`--color-accent`)
                removeCssProp(`--card-number`)
                const inputGridSize = (this.$refs['input-factory'] as Vue[]).filter(
                    (inputInstance) => inputInstance.$props.inputData.name === 'grid-size'
                )?.[0]
                ;(inputGridSize as any)?.resetSelectedTheme()
            }

            if (this.isFilter) {
                this.$store.commit(MutationType.SELECTED_FILTER, [])
                this.$store.commit(MutationType.ACTIVE_FILTERS, [])
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
    margin-left: rem(20);
    font-weight: 500;
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
    min-width: rem(80);
    margin-right: rem(25);
    margin-bottom: rem(7);
    opacity: 0.35;
}

.input {
    &:not(:last-child) {
        margin-right: rem(18);
    }
}
</style>
