<template>
  <main
    v-if="!!projectsData.length"
    id="main"
    :class="$style.root"
    data-scroll-container
  >
    <v-card-project
      v-for="(projectData, index) in projectsData"
      :key="projectData.id"
      ref="card"
      v-bind="{ projectData }"
      :class="[$style.card, index % 2 && $style['card--odd']]"
      :card-index="index"
      data-scroll
      :data-scroll-speed="index % 2 ? 4 : 0"
      :data-scroll-lerp="index % 2 ? 1 : 1"
    />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VCardProject from '~/components/molecules/VCardProject.vue'
import { getRandomFloat } from '~/utils/functions'

export default Vue.extend({
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
    this.initLocomotive()
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
  methods: {
    initLocomotive() {
      this.lmS = new this.locomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true,
        // repeat: true,
      })
      console.log('lmS', this.lmS)
    },
  },
})
</script>

<style lang="scss" module>
.root {
  padding-top: 300px;
  //display: grid;
  //grid-template-columns: repeat(12, 1fr);
  //align-items: center;
  column-count: 2;
}
.card {
  display: block;
  -webkit-column-break-inside: avoid;
}
</style>
