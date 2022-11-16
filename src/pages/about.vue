<template>
    <div :class="$style.root">
        <h1>
            <nuxt-link to="/">close About</nuxt-link>
        </h1>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Page from '~/mixins/Page'

export default mixins(Page).extend({
    name: 'About',
    data() {
        return {
            pageData: { title: 'À propos', metaDescription: 'description about' },
        }
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    width: 100%;
    padding-top: 50px;
}
</style>
