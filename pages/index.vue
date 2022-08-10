<template>
  <div :class="$style.home">
    <div :class="$style.grain"></div>

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
  head() {
    return {
      titleTemplate: 'Justine Saez | portfolio', // '%s - Justine Saez',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Justine Saez est une illustratrice Lyonnaise passionnée par le corps de la femme. Je me spécialise dans le dessin au crayon mettant en scène des situations quotidiennes de manière humoristique. Je cherche à mettre en avant les émotions via le dessin traditionnel.',
        },
      ],
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

.grain {
  position: fixed;
  width: 100%;
  height: 100vh;
  opacity: 0.05;
  mix-blend-mode: darken;
  background: url('~static/images/texture-grain.png');
  user-select: none;
}

.about-icon {
  position: fixed;
  right: 20px;
  top: 20px;
  padding: 10px;
  border: 4px solid black;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  z-index: 11;
  visibility: hidden;
  transform: translateX(calc(100% + 20px));
  transition: transform 700ms ease(out-quart) 800ms;

  .root--loading-done & {
    transform: translateX(0);
    visibility: inherit;
  }

  &--open {
    user-select: none;
    z-index: -3;
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
