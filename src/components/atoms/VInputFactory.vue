<template>
    <component :is="component" v-if="component && tagExistInProjects" v-bind="inputProps" @update="update">
        <template v-if="iconName" #icon>
            <component :is="iconName" :class="$style.icon" />
        </template>
    </component>
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
    isPromoteFilter,
    isRandomFilter,
    isTag,
    isTagFilter,
} from '~/utils/get-input-type'
import MutationType from '~/constants/mutation-type'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'
import { getBreakpointValue } from '~/utils/media'
import { setCssProp } from '~/utils/functions'
import IconValidate from '~/assets/images/icons/validate.svg?sprite'
import IconHeart from '~/assets/images/icons/heart.svg?sprite'
import IconShuffle from '~/assets/images/icons/shuffle.svg?sprite'
import IconDate from '~/assets/images/icons/date.svg?sprite'

export default Vue.extend({
    name: 'VInputFactory',
    components: { VButton, VInput, VSlider, VToggle, IconValidate, IconHeart, IconShuffle, IconDate },
    props: {
        inputData: Object as PropType<InputParameter>,
        isVisible: Boolean,
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
            const { type } = this.inputData
            if (!type) return

            return type === 'color' ||
                type === 'input' ||
                type === 'url' ||
                type === 'textarea' ||
                type === 'email' ||
                type === 'checkbox'
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
        iconName(): string {
            if (!this.inputData?.icon) return ''
            const parsedName = this.inputData.icon.charAt(0).toUpperCase() + this.inputData.icon.slice(1)
            return `Icon${parsedName}`
        },
        maxCardNumber(): number {
            let cardNumber = 8
            const windowWidth = this.$store.state.windowWidth
            if (windowWidth < getBreakpointValue('md')) cardNumber = 2
            if (windowWidth > getBreakpointValue('md') && windowWidth < getBreakpointValue('lg')) cardNumber = 4
            if (windowWidth > getBreakpointValue('lg') && windowWidth < getBreakpointValue('hd')) cardNumber = 6
            if (windowWidth > getBreakpointValue('hd')) cardNumber = 7
            return cardNumber
        },
        minCardNumber(): number {
            return this.$store.state.windowWidth > getBreakpointValue('md') ? 2 : 1
        },
        inputProps(): Record<string, any> {
            const name = this.inputData.name
            const defaultAttributes = {
                ...this.inputData,
                label: this.inputData.label,
                isVisible: this.isVisible,
                class: [this.$style.input, !isTag(this.inputData.name) ? 'over-title-l' : 'over-title-s'],
            }

            if (this.component === 'v-button') {
                return {
                    ...defaultAttributes,
                    class: [...defaultAttributes.class, this.$style['input--filter']],
                    rounded: true,
                    theme: 'light',
                    size: 'm',
                }
            }

            if (isCardSlider(name)) {
                return {
                    ...defaultAttributes,
                    class: [...defaultAttributes.class, this.$style.range],
                    min: this.minCardNumber + '',
                    step: '1',
                    max: this.maxCardNumber + '',
                }
            }

            if (isTag(name)) {
                return {
                    ...defaultAttributes,
                    class: [
                        ...defaultAttributes.class,
                        this.$style['input--outlined'],
                        this.$style['input--rounded'],
                        this.$style.checkbox,
                    ],
                    outlined: true,
                    checked: this.$store.state.selectedFilter.includes(this.inputData?.name.replace('tag-', '')),
                    value: this.inputData?.name,
                }
            }

            return defaultAttributes
        },
    },
    methods: {
        update({ inputName, value }: { inputName: string; value: string }) {
            console.log('factory update event', inputName, value)

            if (isColorInput(inputName)) {
                const cssVarName = inputName.replace('Color', '')
                setCssProp(`--${cssVarName}`, value)
            }

            if (isColorThemeSelect(inputName)) {
                if (value === '') this.$emit('reset')
                value.split(',').forEach((colorsEntry: string) => {
                    const indexSeparator = colorsEntry.indexOf(':')
                    const key = colorsEntry.substring(0, indexSeparator).toLowerCase()
                    const value = colorsEntry.substring(indexSeparator + 1, colorsEntry.length)
                    setCssProp(`--color-${key}`, value)
                })
            }

            if (isTagFilter(inputName)) {
                console.log('factory filter')
                this.$store.commit(MutationType.SELECTED_FILTER, value)
            }

            if (isRandomFilter(inputName)) {
                console.log('factory random')
                eventBus.$emit(EventType.RANDOMIZE_PROJECTS)
            }

            if (isPromoteFilter(inputName)) {
                console.log('factory best')

                eventBus.$emit(EventType.FILTER_BEST_PROJECTS)
            }

            if (isCardSlider(inputName)) {
                setCssProp('--card-number', value)
            }

            if (isTag(inputName)) {
                const activeFilter = [...this.$store.state.selectedFilter]
                const tagName = inputName.replace('tag-', '')
                let filteredTag = activeFilter

                if (activeFilter.includes(tagName)) {
                    filteredTag = activeFilter.filter((activeTag: string) => activeTag !== tagName)
                } else {
                    filteredTag.push(tagName)
                }
                this.$store.commit(MutationType.SELECTED_FILTER, filteredTag)
            }
        },
    },
})
</script>
<style lang="scss" module>
.input {
    &:not(.range) {
        background-color: var(--color-main);
        color: var(--color-bg);

        @include v-button-default-css-vars($v-button-vars);
        @include v-button-default-css-vars($v-button-inner-vars, '-inner');
        @include v-button-default-css-vars($v-button-label-vars, '-label');
        @include theme-variants;

        // sizes
        $vars: map-remove($v-button-vars, default);

        @each $key, $value in $vars {
            .input--size-#{$key} {
                @include v-button-size($key);
            }
        }
    }

    &:not(:last-child) {
        margin-right: rem(10);
    }

    &--outlined {
        border-width: var(--btn-border-width, 0.5px);
        border-style: solid;
        border-color: var(--color-main);
        border-radius: inherit;
        transition: all 0.3s;
    }

    &--rounded {
        @include v-button-default-css-vars($v-button-rounded-vars, '-rounded');
    }

    &--filter {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &.checkbox {
        margin-bottom: rem(10);
        background-color: inherit;
        color: var(--color-main);
    }
}

.icon {
    @include v-button-default-css-vars($v-button-icon-vars, '-icon');
    @include v-button-default-css-vars($v-button-icon-size-vars, '-icon-size');

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
}
</style>
