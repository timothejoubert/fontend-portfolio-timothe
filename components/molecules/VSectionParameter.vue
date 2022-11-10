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
            <component
                :is="
                    input.type === 'color'
                        ? 'v-input'
                        : input.type === 'slider'
                        ? 'v-slider'
                        : input.type === 'select'
                        ? 'v-select'
                        : input.type === 'button'
                        ? 'v-button'
                        : input.type === 'toggle'
                        ? 'v-toggle'
                        : ''
                "
                v-for="(input, i) in parameter.children"
                :key="i"
                :rounded="input.type === 'button' && true"
                :theme="input.type === 'button' && 'light'"
                :size="input.type === 'button' && 'm'"
                :is-visible="isUiOptionsOpen"
                :class="[$style.input, 'over-title-s']"
                v-bind="input"
                @update="update"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import Colors from '~/constants/colors'
import VButton from '~/components/atoms/VButton.vue'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'
import {mapGetters} from "vuex";
import MutationType from "~/constants/mutation-type";

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
        update({ name, value }: any) {
            // console.log('update options', value, name)

            if (name.startsWith('color')) {
                const cssVarName = name.replace('Color', '')
                this.setCssProp(`--${cssVarName}`, value)
            }

            if (name.startsWith('theme')) {
                if (value === 'default') this.reset('', '', true)
                value.split(',').forEach((colorsEntry: string) => {
                    const indexSeparator = colorsEntry.indexOf(':')
                    const key = colorsEntry.substring(0, indexSeparator).toLowerCase()
                    const value = colorsEntry.substring(indexSeparator + 1, colorsEntry.length)
                    this.setCssProp(`--color-${key}`, value)
                })
            }

            if (name.startsWith('tags')) {
                this.$store.commit(MutationType.SELECTED_FILTER, value)
            }

            if (name.startsWith('random')) {
                eventBus.$emit(EventType.RANDOMIZE_PROJECTS)
            }

            if (name.startsWith('best')) {
                eventBus.$emit(EventType.FILTER_BEST_PROJECTS)
            }
        },
        setCssProp(propName: string, value: string) {
            return document.documentElement.style.setProperty(propName, value)
        },
        reset(_name: string, _value?: string, resetColor?: boolean) {
            if (this.isInterface || !!resetColor) {
                this.setCssProp(`--color-main`, Colors.MAIN)
                this.setCssProp(`--color-bg`, Colors.BG)
                this.setCssProp(`--color-accent`, Colors.ACCENT)
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
}

.input {
    &:not(:last-child) {
        margin-right: rem(18);
    }
}
</style>
