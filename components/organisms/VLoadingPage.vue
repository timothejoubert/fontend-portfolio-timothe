<template>
    <div :class="$style.root" />
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VLoading',
    methods: {
        start() {
            this.$el.classList.add(this.$style.root__is_loading)
        },
        finish() {
            this.$el.classList.remove(this.$style.root__is_loading)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: wait;
    visibility: hidden;
}

.root__is_loading {
    visibility: visible;
}
</style>
