<template>
  <section :class="$style.root">
    <h1>Page error - 404</h1>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'error',
})
</script>

<style lang="scss" module>
.root {
}
</style>
