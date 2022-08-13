<template>
  <div :class="classNames"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VFrontTexture',
  data() {
    return {
      loaded: false,
    }
  },
  computed: {
    classNames(): (string | boolean | undefined)[] {
      return [this.$style.grain, this.loaded && this.$style['grain--loaded']]
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loaded = true
      // setTimeout(() => (this.loaded = true), 600)
    })
  },
})
</script>

<style lang="scss" module>
.grain {
  position: fixed;
  width: calc(100% - var(--padding-border) * 2);
  top: var(--padding-border);
  left: var(--padding-border);
  height: calc(100vh - var(--padding-border) * 2);
  opacity: 0.08;
  mix-blend-mode: darken;
  background: url('~static/images/texture-grain.png');
  user-select: none;
  pointer-events: none;
  border-radius: 20px;
  //z-index: 100;
  clip-path: inset(100% round 10%);
  //transform: scale(0);
  transition: all 2s ease(out-quart);

  &--loaded {
    clip-path: inset(0% round 0%);

    //transform: scale(1);
  }
}
</style>
