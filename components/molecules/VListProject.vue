<template>
  <main v-if="!!projectsData.length" id="main" :class="$style.root">
    <v-card-project
      v-for="(projectData, index) in projectsData"
      :key="projectData.id"
      ref="card"
      v-bind="{ projectData }"
      v-prlx="
        index % 2
          ? {
              fromBottom: true,
              speed: 0.3,
              preserveInitialPosition: false,
            }
          : {
              speed: 0.1,
              preserveInitialPosition: false,
            }
      "
      :class="[$style.card, index % 2 && $style['card--odd']]"
      :card-index="index"
    />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import type { VueConstructor } from 'vue'
import { mapGetters } from 'vuex'
import VCardProject from '~/components/molecules/VCardProject.vue'
// import { getRandomFloat } from '~/utils/functions'

interface Component {
  locomotiveScroll?: any
}

export default (Vue as VueConstructor<Vue & Component>).extend({
  name: 'VListProject',
  components: { VCardProject },
  data() {
    return {
      lmS: null,
    }
  },
  computed: {
    ...mapGetters(['projectsData']),
  },
  mounted() {
    /*    const cards = this.$refs?.card as Vue[]
    console.log('card ref', cards)
    cards?.forEach((card) => {
      ;(card.$el as HTMLElement).style.transform = `rotate(${getRandomFloat(
        -4,
        4,
        3
      )}deg)`
    }) */
  },
})
</script>

<style lang="scss" module>
.root {
  padding-top: 300px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  column-count: 2;
}
.card {
  display: block;
  //-webkit-column-break-inside: avoid;
}
</style>
