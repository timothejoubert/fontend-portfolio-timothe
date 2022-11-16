<template>
    <div :class="$style.root"></div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Page from '~/mixins/Page'

export default mixins(Page).extend({
    name: 'Index',
    updated() {
        console.log('index updated')
    },
    data() {
        return {
            pageData: { title: 'portfolio', metaDescription: 'home page' } as PageData,
        }
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
