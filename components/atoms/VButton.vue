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
type ButtonSize = 's' | 'm' | 'l'

export default Vue.extend({
    name: 'VButton',
    props: {
        label: String,
        theme: String as PropType<ButtonTheme>,
        rounded: Boolean,
        name: String,
        size: {
            type: String as PropType<ButtonSize>,
            default: 'm',
        },
    },
    computed: {
        rootClass(): (string | boolean | undefined)[] {
            return [
                this.$style.root,
                !!this.theme && this.$style[`root--theme-${this.theme}`],
                !!this.size && this.$style[`root--size-${this.size}`],
                !!this.rounded && this.$style['root--rounded'],
            ]
        },
    },
    methods: {
        onClick(): void {
            this.$emit('update', { name: this.name, value: '' })
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: inline-block;
    padding: rem(5) rem(8);

    &--theme-yellow {
        background-color: var(--color-accent);
        color: var(--color-bg);
    }

    &--theme-light {
        background-color: var(--color-main);
        color: var(--color-bg);
    }

    &--theme-dark {
        background-color: var(--color-bg);
        color: var(--color-main);
    }

    &--rounded {
        border-radius: rem(16);
    }

    &--size {
        &-s {
            padding: rem(5) rem(8);
        }
        &-m {
            padding: rem(8) rem(15);
        }
        &-l {
            padding: rem(12) rem(22);
        }
    }
}

.inner {
    display: flex;
    align-items: center;
}
</style>
