<template>
    <component :is="component" v-if="component" v-bind="inputProps" @update="update" />
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { throttle } from 'throttle-debounce'
import VButton from '~/components/atoms/VButton.vue'
import VInput from '~/components/atoms/VInput.vue'
import VSlider from '~/components/atoms/VSlider.vue'
import VToggle from '~/components/atoms/VToggle.vue'
import {
    isCardSlider,
    isColorInput,
    isColorThemeSelect,
    isPromoteFilter,
    isRandomFilter,
    isTagFilter,
} from '~/utils/get-input-type'
import MutationType from '~/constants/mutation-type'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'
import { getBreakpointValue } from '~/utils/media'
import { setCssProp } from '~/utils/functions'

export default Vue.extend({
    name: 'VInputFactory',
    components: { VButton, VInput, VSlider, VToggle },
    props: {
        inputData: Object as PropType<InputParameter>,
        isVisible: Boolean,
    },
    computed: {
        component(): string | undefined {
            const { type } = this.inputData
            if (!type) return

            return type === 'color' || type === 'input' || type === 'url' || type === 'textarea' || type === 'email'
                ? 'v-input'
                : type === 'slider'
                ? 'v-slider'
                : type === 'select'
                ? 'v-select'
                : type === 'button'
                ? 'v-button'
                : type === 'toggle'
                ? 'v-toggle'
                : ''
        },
        maxCardNumber(): number {
            let cardNumber = 8
            const windowWidth = this.$store.state.windowWidth
            if (windowWidth < getBreakpointValue('md')) cardNumber = 2
            if (windowWidth > getBreakpointValue('md') && windowWidth < getBreakpointValue('lg')) cardNumber = 4
            if (windowWidth > getBreakpointValue('lg') && windowWidth < getBreakpointValue('hd')) cardNumber = 6
            return cardNumber
        },
        inputProps(): Record<string, any> {
            const defaultAttributes = {
                ...this.inputData,
                isVisible: this.isVisible,
                class: [this.$style.input, 'over-title-s'],
            }

            if (this.component === 'v-button') {
                return {
                    ...defaultAttributes,
                    rounded: true,
                    theme: 'light',
                    size: 'm',
                }
            }

            if (isCardSlider(this.inputData.name)) {
                return {
                    ...defaultAttributes,
                    min: '1',
                    step: '1',
                    max: this.maxCardNumber + '',
                }
            }
            return defaultAttributes
        },
    },
    methods: {
        update({ name, value }: Record<string, string>) {
            if (isColorInput(name)) {
                const cssVarName = name.replace('Color', '')
                setCssProp(`--${cssVarName}`, value)
            }

            if (isColorThemeSelect(name)) {
                if (value === '') this.$emit('reset')
                value.split(',').forEach((colorsEntry: string) => {
                    const indexSeparator = colorsEntry.indexOf(':')
                    const key = colorsEntry.substring(0, indexSeparator).toLowerCase()
                    const value = colorsEntry.substring(indexSeparator + 1, colorsEntry.length)
                    setCssProp(`--color-${key}`, value)
                })
            }

            if (isTagFilter(name)) {
                this.$store.commit(MutationType.SELECTED_FILTER, value)
            }

            if (isRandomFilter(name)) {
                eventBus.$emit(EventType.RANDOMIZE_PROJECTS)
            }

            if (isPromoteFilter(name)) {
                eventBus.$emit(EventType.FILTER_BEST_PROJECTS)
            }

            if (isCardSlider(name)) {
                setCssProp('--card-number', value)
            }
        },
    },
})
</script>
<style lang="scss" module>
.input {
    &:not(:last-child) {
        margin-right: rem(18);
    }
}
</style>
