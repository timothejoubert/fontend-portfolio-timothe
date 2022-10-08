<template>
    <header :class="$style.root">
        <nuxt-link to="/">Logo</nuxt-link>
        <button @click="toggleOptions">options</button>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VHeader',
    methods: {
        toggleOptions(): void {
            console.log('click options toggle value')
            this.$emit('toggle-options')
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    height: var(--top-bar-height);
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-main);
}
</style>
