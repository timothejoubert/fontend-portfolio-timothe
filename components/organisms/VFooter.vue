<template>
    <footer :class="$style.root">
        <nuxt-link to="/about" :class="$style['about-link']">about</nuxt-link>
        <ul :class="$style.socials">
            <li :class="$style.social"><a href="" target="_blank">I</a></li>
            <li :class="$style.social"><a href="" target="_blank">G</a></li>
            <li :class="$style.social"><a href="" target="_blank">C</a></li>
        </ul>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VFooter',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
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
