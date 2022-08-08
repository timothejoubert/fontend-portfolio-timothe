<template>
  <main v-if="!!projectsData.length" id="main" :class="$style.root">
    <v-card-project
      v-for="(projectData, index) in projectsData"
      :key="projectData.id"
      ref="card"
      v-bind="{ projectData }"
      :card-index="index"
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
  computed: {
    ...mapGetters(['projectsData']),
  },
  mounted() {
    const cards = this.$refs?.card as Vue[]
    console.log('card ref', cards)
    cards?.forEach((card) => {
      ;(card.$el as HTMLElement).style.transform = `rotate(${getRandomFloat(
        -4,
        4,
        3
      )}deg)`
    })
  },
})
</script>

<style lang="scss" module>
.root {
  padding-top: 300px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
}
</style>
