<template>
  <div :class="[$style.layout, $style['layout--loading-done']]">
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
  computed: {},
})
</script>

<style lang="scss" module>
.layout {
    position: relative;
    margin: 0 var(--padding-border);
}
</style>
