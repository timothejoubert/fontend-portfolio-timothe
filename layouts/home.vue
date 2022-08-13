<template>
  <div :class="$style.layout">
    <v-front-texture />

    <v-about-section />

    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VAboutSection from '~/components/organisms/VAboutSection.vue'
import VFrontTexture from '~/components/atoms/VFrontTexture.vue'
import Page from '~/mixins/Page'

export default Vue.extend({
  components: { VAboutSection, VFrontTexture },
  mixins: [Page],
  computed: {
    ...mapGetters(['allDataFetch']),
  },
})
</script>

<style lang="scss" module>
.layout {
  padding: 0 var(--padding-border);
  /*  &--about-open {
    height: 100vh;
    overflow: hidden;
  }*/
}
</style>
