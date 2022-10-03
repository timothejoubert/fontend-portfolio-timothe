<template>
  <section :class="$style.project">
    <h1>Project page</h1>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Project',
  components: {},
  // mixins: [Page],
  // data() {},
  // computed: {},
})
</script>

<style lang="scss" module>
.project {
    padding: 0 calc(var(--padding-border) / 2);
}
</style>
