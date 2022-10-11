<template>
    <button :class="rootClass" @click="onClick">
        <span ref="inner" :class="$style['inner']">
            <span v-if="$slots.default || label" :class="$style['label']">
                <slot>{{ label }}</slot>
            </span>
            <span v-if="$slots.icon" :class="$style['icon']">
                <slot name="icon" />
            </span>
        </span>
    </button>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

type ButtonTheme = 'yellow' | 'light' | 'dark'

export default Vue.extend({
    name: 'About',
    props: {
        label: String,
        theme: String as PropType<ButtonTheme>,
        rounded: Boolean,
    },
    computed: {
        rootClass(): (string | boolean | undefined)[] {
            return [this.$style.root, !!this.theme && this.$style[`root--theme-${this.theme}`]]
        },
    },
    methods: {
        onClick(): void {
            this.$emit('on-click')
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: inline-block;
    padding: rem(8) rem(10);

    &--theme-yellow {
        background-color: var(--color-accent);
        color: var(--color-bg);
    }

    &--rounded {
        padding: rem(14) rem(20);
        border-radius: 100%;
    }
}

.inner {
    display: flex;
    align-items: center;
}
</style>
