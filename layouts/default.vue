<template>
  <div
    :class="[
      $style.layout,
      $style['layout--loading-done'],
      aboutOpen && $style['layout--about-open'],
    ]"
  >
    <header>
      <nuxt-link to="/"><h1 class="text-h1">Justine saez</h1></nuxt-link>
    </header>

    <button
      :class="[$style['about-icon'], aboutOpen && $style['about-icon--open']]"
      aria-label="open modal à propos"
      @click="toggleAbout(true)"
    >
      <img
        :src="require(`~/static/icons/icon-about.png`)"
        alt="illustration justine"
      />
    </button>

    <v-about-section v-show="aboutOpen" @toggleAbout="toggleAbout" />

    <Nuxt />
    <v-footer title="Découvrez mes autres projets" display-projects />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VAboutSection from '~/components/organisms/VAboutSection.vue'
import VFooter from '~/components/organisms/VFooter.vue'

export default Vue.extend({
  components: { VAboutSection, VFooter },
  data() {
    return {
      aboutOpen: false,
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
  methods: {
    toggleAbout(action: boolean) {
      this.aboutOpen = action
    },
  },
})
</script>

<style lang="scss" module>
.layout {
  &--about-open {
    height: 100vh;
    overflow: hidden;
  }
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

  .layout--loading-done & {
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
