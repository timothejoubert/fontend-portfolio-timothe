<template>
    <component
        :is="component"
        v-if="component && tagExistInProjects"
        v-bind="inputProps"
        :aria-label="'Button ' + inputData.name"
        tabindex="-1"
        @update="update"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import VButton from '~/components/atoms/VButton.vue'
import VInput from '~/components/atoms/VInput.vue'
import VSlider from '~/components/atoms/VSlider.vue'
import VToggle from '~/components/atoms/VToggle.vue'
import {
    isCardSlider,
    isColorInput,
    isColorThemeSelect,
    isDate,
    isPromoteFilter,
    isRandomFilter,
    isTag,
} from '~/utils/get-input-type'
import MutationType from '~/constants/mutation-type'
import { getBreakpointValue } from '~/utils/media'
import { setCssProp } from '~/utils/functions'
import VInputButton from '~/components/molecules/VButton/VInputButton.vue'

export interface EventClickInput {
    inputName: string
    value: string | boolean
}

export default Vue.extend({
    name: 'VInputFactory',
    components: { VButton, VInput, VSlider, VToggle, VInputButton },
    props: {
        inputData: Object as PropType<InputParameter>,
        isVisible: Boolean,
    },
    data() {
        return {
            randomizeIndex: 0,
        }
    },
    computed: {
        tagExistInProjects(): boolean {
            if (!isTag(this.inputData.name)) return true

            const currentTagIsInProjects = this.$store.state.projectsData
                .map((project: ProjectContent) =>
                    project.tags?.filter((tag) => this.inputProps.name.replace('tag-', '') === tag.slug)
                )
                .flat(2)
            return !!currentTagIsInProjects?.length
        },
        component(): string | undefined {
            return this.displayInputComponent
                ? 'v-input'
                : this.isRangeInput
                ? 'v-slider'
                : this.isSelect
                ? 'v-select'
                : this.isButton
                ? 'v-button'
                : ''
        },
        displayInputComponent(): boolean {
            return (
                this.isColorInput ||
                this.isInput ||
                this.isCheckbox ||
                this.inputData.type === 'url' ||
                this.inputData.type === 'textarea' ||
                this.inputData.type === 'email'
            )
        },
        isColorInput(): boolean {
            return this.inputData.type === 'color'
        },
        isInput(): boolean {
            return this.inputData.type === 'input'
        },
        isRangeInput(): boolean {
            return this.inputData.type === 'slider'
        },
        isCheckbox(): boolean {
            return this.inputData.type === 'checkbox'
        },
        isButton(): boolean {
            return this.inputData.type === 'button'
        },
        isSelect(): boolean {
            return this.inputData.type === 'select'
        },
        isCheckboxWithIcon(): boolean {
            return this.isCheckbox && this.hasIcon
        },
        isTagInput(): boolean {
            return (this.isCheckbox && !this.isCheckboxWithIcon) || isTag(this.inputData.name)
        },
        hasIcon(): boolean {
            return !!this.inputData.icon
        },
        maxCardNumber(): string {
            let cardNumber = '8'
            const windowWidth = this.$store.state.windowWidth
            if (windowWidth < getBreakpointValue('md')) cardNumber = '2'
            if (windowWidth > getBreakpointValue('md') && windowWidth < getBreakpointValue('lg')) cardNumber = '4'
            if (windowWidth > getBreakpointValue('lg') && windowWidth < getBreakpointValue('hd')) cardNumber = '6'
            if (windowWidth > getBreakpointValue('hd')) cardNumber = '7'
            return cardNumber
        },
        minCardNumber(): string {
            return this.$store.state.windowWidth > getBreakpointValue('md') ? '2' : '1'
        },
        activeFilters(): string[] | [] {
            return this.$store.state.activeFilters || []
        },
        isDateActive(): boolean {
            return (
                this.inputData.name === 'date' &&
                !!this.activeFilters?.length &&
                !!this.activeFilters?.filter((filter: string) => filter === 'date')?.length
            )
        },
        isRandomizeActive(): boolean {
            return (
                this.inputData.name === 'randomize' &&
                !!this.activeFilters?.length &&
                !!this.activeFilters.filter((filter: string) => filter.includes('randomize'))?.length
            )
        },
        isPromoteActive(): boolean {
            return (
                this.inputData.name === 'promote' &&
                !!this.activeFilters?.length &&
                !!this.activeFilters.filter((filter: string) => filter === 'promote')?.length
            )
        },
        inputProps(): Record<string, any> {
            const isRounded = this.isButton || this.isCheckbox || this.isColorInput
            const theme = this.isTagInput ? 'light' : 'dark'
            const isOutlined = this.isTagInput
            const range = this.isRangeInput ? { step: '1', min: this.minCardNumber, max: this.maxCardNumber } : null
            const size = this.isTagInput ? 'sm' : 'm'
            const checked =
                (this.isCheckbox && !!this.inputData?.checked) ||
                this.isPromoteActive ||
                this.isDateActive ||
                this.isRandomizeActive
            return {
                ...this.inputData,
                value: checked ? undefined : this.inputData.value,
                isVisible: this.isVisible,
                range,
                checked,
                class: [
                    this.$style.button,
                    !this.isTagInput && this.$style['button--capitalize'],
                    this.isRangeInput && this.$style['button--range'],
                    this.$style['button--filled'],
                    this.$style[`button--theme-${theme}`],
                    this.$style[`button--size-${size}`],
                    isOutlined && this.$style['button--outlined'],
                    isRounded && this.$style['button--rounded'],
                ],
            }
        },
    },
    methods: {
        updateColor(inputName: string, value: string) {
            const cssVarName = inputName.replace('Color', '')
            setCssProp(`--${cssVarName}`, value as string)
        },
        updateColorTheme(value: string) {
            if (value === '') this.$emit('reset')
            value.split(',').forEach((colorsEntry: string) => {
                const indexSeparator = colorsEntry.indexOf(':')
                const key = colorsEntry.substring(0, indexSeparator).toLowerCase()
                const value = colorsEntry.substring(indexSeparator + 1, colorsEntry.length)
                setCssProp(`--color-${key}`, value)
            })
        },
        updateTags(inputName: string) {
            const activeFilter = [...this.$store.state.selectedFilter]
            const tagName = inputName.replace('tag-', '')
            let filteredTag = activeFilter

            if (activeFilter.includes(tagName)) {
                filteredTag = activeFilter.filter((activeTag: string) => activeTag !== tagName)
            } else {
                filteredTag.push(tagName)
            }
            this.$store.commit(MutationType.SELECTED_FILTER, filteredTag)
        },
        updateActiveFilter(filterName: string) {
            const currentFilter = [...this.$store.state.activeFilters]
            let filteredFilter = currentFilter

            if (isRandomFilter(filterName)) {
                filteredFilter = this.updateRandomizeValue(currentFilter)
            } else if (currentFilter.includes(filterName)) {
                filteredFilter = currentFilter.filter((activeTag: string) => activeTag !== filterName)
            } else {
                filteredFilter.push(filterName)
            }
            this.$store.commit(MutationType.ACTIVE_FILTERS, filteredFilter)
        },
        updateRandomizeValue(currentFilter: string[]): string[] {
            const currentFilterCopy = currentFilter.slice()
            const alreadySet = currentFilterCopy.join().includes('randomize')
            if (alreadySet) {
                currentFilter[0] = currentFilter[0] === 'randomize-on' ? 'randomize-off' : 'randomize-on'
                return currentFilter
            } else {
                return ['randomize', ...currentFilter]
            }
        },
        updateRandomize(currentFilter: string[]) {
            this.randomizeIndex++
            const randomizeIndex = currentFilter.findIndex((item) => item.includes('randomize'))
            currentFilter[randomizeIndex] = `randomize: ${this.randomizeIndex}`
            this.$store.commit(MutationType.ACTIVE_FILTERS, currentFilter)
        },
        update({ inputName, value }: EventClickInput) {
            if (isColorInput(inputName)) this.updateColor(inputName, value as string)
            if (isColorThemeSelect(inputName)) this.updateColorTheme(value as string)
            if (isRandomFilter(inputName) || isPromoteFilter(inputName) || isDate(inputName))
                this.updateActiveFilter(inputName)
            if (isCardSlider(inputName)) setCssProp('--card-number', value as string)
            if (isTag(inputName)) this.updateTags(inputName)
        },
    },
})
</script>
<style lang="scss" module>
@use "sass:math";
.button {
    min-width: rem(62);
    height: rem(30);
    padding: 0 rem(22);
    font-size: 12px;
    font-weight: 600;

    &--capitalize {
        text-transform: uppercase;
    }

    & option,
    & select {
        font-weight: 500;
    }

    &--size-sm {
        min-width: rem(62);
        height: rem(28);
        padding: 0 rem(16);
        font-size: 12px;
        font-weight: 400;
    }

    &:not(:last-child) {
        margin-right: rem(10);
    }

    &--filled {
        background-color: var(--color-main);
        color: var(--color-bg);
    }

    &--filled#{&}--theme-light {
        background-color: var(--color-bg);
        color: var(--color-main);
    }

    &--outlined#{&}--theme-light {
        border: 0.5px solid var(--color-main);
    }

    &--rounded {
        border-radius: math.div(30px, 2);
    }

    &--rounded#{&}--size-sm {
        border-radius: math.div(28px, 2);
    }

    &--range {
        height: inherit;
        padding: 0;
        background-color: inherit;
    }
}
</style>
