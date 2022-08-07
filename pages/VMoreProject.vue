<template>
  <div>
    <nuxt-link to="/">Retour home</nuxt-link>
    <h1>More project</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MoreProject',
  mounted() {
    this.$nextTick(() => {
      // this.$nuxt.$loading.start()
      // setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  },
})
</script>

<style lang="scss" module></style>
