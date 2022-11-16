<template>
    <span v-if="label" :class="rootClass">{{ label }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
// import type { PropType } from 'vue'

export default Vue.extend({
    name: 'VPill',
    props: {
        label: String,
        size: String,
        theme: { type: String, default: 'light' },
    },
    computed: {
        rootClass(): (string | boolean | undefined)[] {
            return [this.$style.root, typeof this.size === 'string' && 'body-' + this.size, typeof this.theme === 'string' && this.$style['root--' + this.theme]]
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: inline-block;
    padding: 2px 12px;
    background-color: var(--color-main);
    border-radius: 30px;
    color: var(--color-bg);
}
</style>
