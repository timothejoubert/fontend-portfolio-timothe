<template>
    <div :class="$style.root">
        <nuxt-link to="/about" :class="$style['about-link']">about</nuxt-link>
        <ul :class="$style.socials">
            <li :class="$style.social"><a href="" target="_blank">I</a></li>
            <li :class="$style.social"><a href="" target="_blank">G</a></li>
            <li :class="$style.social"><a href="" target="_blank">C</a></li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VAbout',
})
</script>

<style lang="scss" module>
.root {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    height: var(--top-bar-height);
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--color-main);
}

.about-link {
    justify-self: center;
}

.socials {
    display: flex;
}

.social {
    margin: 0 rem(10);
}
</style>
