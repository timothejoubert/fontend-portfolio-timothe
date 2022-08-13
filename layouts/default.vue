<template>
  <div :class="[$style.layout, $style['layout--loading-done']]">
    <v-front-texture :class="$style['texture']" />

    <header>
      <nuxt-link to="/" :class="$style['home-link']"><h1 class="text-h2">Justine saez</h1></nuxt-link>
    </header>

    <v-about-section />

    <Nuxt />
    <v-footer title="Découvrez mes autres projets" display-projects />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VAboutSection from '~/components/organisms/VAboutSection.vue'
import VFrontTexture from '~/components/atoms/VFrontTexture.vue'
import VFooter from '~/components/organisms/VFooter.vue'
import { nameIfy } from '~/utils/functions'
import Page from '~/mixins/Page'

export default Vue.extend({
  components: { VAboutSection, VFooter, VFrontTexture },
  mixins: [Page],
  computed: {
    ...mapGetters(['allDataFetch']),
  },
})
</script>

<style lang="scss" module>
.layout {
  position: relative;
  margin: 0 var(--padding-border);
}
.texture {
  //width: 100%;
}
.home-link {
  position: absolute;
  top: calc(var(--padding-border) + 15px);
  margin-left: calc(var(--padding-border) / 2);
}
</style>
