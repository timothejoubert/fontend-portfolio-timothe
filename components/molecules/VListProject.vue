<template>
  <main v-if="!!projectsData.length" id="main" :class="$style.root">
    <template v-for="(projectData, i) in projectsData">
      <v-card-project
        v-bind="{ projectData }"
        :key="projectData.id"
        :card-index="i"
      />
    </template>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VCardProject from '~/components/molecules/VCardProject.vue'

export default Vue.extend({
  name: 'VListProject',
  components: { VCardProject },
  computed: {
    ...mapGetters(['projectsData']),
  },
})
</script>

<style lang="scss" module>
.root {
  padding-top: 300px;
  display: flex;
  flex-direction: column;
}
</style>
