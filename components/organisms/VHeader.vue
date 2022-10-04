<template>
    <div :class="$style.root">
        <nuxt-link to="/">Logo</nuxt-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VHeader',
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
