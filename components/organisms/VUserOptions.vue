<template>
    <section v-if="open" :class="$style.root">
        <h1>GUI</h1>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VUserOptions',
    props: {
        open: Boolean,
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
