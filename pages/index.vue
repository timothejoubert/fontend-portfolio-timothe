<template>
  <div :class="$style.home">
    <v-header />

    <v-list-project v-if="allDataFetch" />

    <v-see-more v-if="allDataFetch" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VHeader from '~/components/organisms/VHeader.vue'
import VListProject from '~/components/molecules/VListProject.vue'
import VSeeMore from '~/components/molecules/VSeeMore.vue'
import { ComponentWithCustomOptionsConstructor } from '~/utils/types/options'

// Vue.prototype.$lazyLoad = true

interface VHomeOptions {
  letterIntervalTitle: number
  delayStartIntroText: number
  letterIntervalIntro: number
}

export default (
  Vue as ComponentWithCustomOptionsConstructor<VHomeOptions>
).extend({
  name: 'Index',
  components: {
    VListProject,
    VHeader,
    VSeeMore,
  },
  layout: 'home',
  fetchOnServer: false,
  data() {
    return {
      titleAnimationDone: false,
      lmS: null,
    }
  },
  computed: {
    ...mapGetters(['allDataFetch']),
  },
  activated() {
    // Call fetch again if last fetch more than 25 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 25000) this.$fetch()
  },
  mounted() {
    // this.$store.commit('allDataFetch', true)

    // loader page
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  },
})
</script>

<style lang="scss" module>
.home {
  position: relative;
  width: 100%;
}

.about-icon {
  position: fixed;
  z-index: 11;
  top: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  padding: 10px;
  border: 4px solid black;
  border-radius: 100%;
  transform: translateX(calc(100% + 20px));
  transition: transform 700ms ease(out-quart) 800ms;
  visibility: hidden;

  .root--loading-done & {
    transform: translateX(0);
    visibility: inherit;
  }

  &--open {
    z-index: -3;
    user-select: none;
  }

  span {
    position: absolute;
    top: 110%;
    left: 50%;
  }

  img {
    transition: transform 600ms ease(out-quart);
  }

  &:not(#{&}--open):hover {
    img {
      transform: rotateY(180deg);
    }
  }
}
</style>
