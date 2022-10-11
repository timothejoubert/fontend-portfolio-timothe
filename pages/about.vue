<template>
    <div :class="$style.root">
        <h1>
            <nuxt-link to="/">close About</nuxt-link>
        </h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'About',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    width: 100%;
    padding-top: 50px;
}
</style>
