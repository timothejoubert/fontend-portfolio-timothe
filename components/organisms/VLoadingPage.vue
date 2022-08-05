<template>
  <div :class="[$style.root]">
    <div :class="$style.bar"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VLoadingPage',
  methods: {
    start() {
      this.$el.classList.add(this.$style['root--loading'])
    },
    finish() {
      this.$el.classList.remove(this.$style['root--loading'])
    },
  },
})
</script>

<style lang="scss" module>
.root {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  cursor: wait;
  visibility: hidden;
  overflow: hidden;

  &--loading {
    visibility: visible;
  }
}
.bar {
  position: relative;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: color(main-orange);
  transition: width 2000ms;

  .root--loading & {
    width: 100%;
  }
}
</style>
