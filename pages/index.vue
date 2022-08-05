<template>
  <div :class="rootClass">
    <v-about-section v-show="aboutOpen" @toggleAbout="toggleAbout" />

    <div :class="$style.grain"></div>

    <header :class="$style.header">
      <h1
        ref="title"
        :class="[
          $style.title,
          titleAnimationDone && !allDataFetch && $style['title--moving'],
          allDataFetch && $style['title--visible'],
        ]"
        class="text-h1"
      >
        Justine Saez
      </h1>

      <v-loading-bar :begin-animation="titleAnimationDone" />

      <v-hero-image v-if="titleAnimationDone" :class="$style['image-header']" />

      <h2 ref="intro" :class="$style['text-intro']" class="text-h2">
        <strong>Illustratrice curieuse du corps humain,</strong><br />
        je m’amuse à gribouiller des moments<br />
        cocasse du quotidien.
      </h2>

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
    </header>

    <v-list-project v-if="allDataFetch" />

    <v-see-more v-if="allDataFetch" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VAboutSection from '~/components/organisms/VAboutSection.vue'
import VListProject from '~/components/molecules/VListProject.vue'
import VLoadingBar from '~/components/organisms/VLoadingBar.vue'
import VHeroImage from '~/components/organisms/VHeroImage.vue'
import VSeeMore from '~/components/molecules/VSeeMore.vue'
import {
  parseLoadingImage,
  parseProjectData,
} from '~/utils/parse-database-properties'
import { ComponentWithCustomOptionsConstructor } from '~/utils/types/options'

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
    VLoadingBar,
    VHeroImage,
    VAboutSection,
    VSeeMore,
  },
  letterIntervalTitle: 100,
  letterIntervalIntro: 200,
  delayStartIntroText: 1000,
  fetchOnServer: false,
  data() {
    return {
      aboutOpen: false,
      titleAnimationDone: false,
    }
  },
  async fetch() {
    this.$store.commit('apiDataLoaded', false)
    this.$store.commit('introDone', false)

    const imageLoadingPromise = await fetch(
      '/.netlify/functions/loadingImage'
    ).then((res) => {
      if (res.ok) return res.json()
    })
    this.$store.commit(
      'imageLoadingList',
      parseLoadingImage(imageLoadingPromise)
    )
    console.log('imageLoading data: ', parseLoadingImage(imageLoadingPromise))

    const projectListPromise = await fetch(
      '/.netlify/functions/projectList'
    ).then((res) => {
      // console.log(res)
      if (res.ok) {
        // hide loading
        // this.$nuxt.$loading.finish()
        return res.json()
      }
      // throw new Error('error pendant le fetch')
    })
    this.$store.commit('projectsData', parseProjectData(projectListPromise))
    console.log('projectsData data: ', parseProjectData(projectListPromise))

    const generalDataPromise = await fetch(
      '/.netlify/functions/generalInfo'
    ).then((res) => {
      if (res.ok) return res.json()
    })
    this.$store.commit('generalData', generalDataPromise)
    console.log('general data: ', generalDataPromise)

    const aboutDataPromise = await fetch('/.netlify/functions/aboutData').then(
      (res) => {
        if (res.ok) return res.json()
      }
    )
    this.$store.commit('aboutData', aboutDataPromise)
    console.log('about data: ', aboutDataPromise)

    window.setTimeout(() => {
      this.$store.commit('allDataFetch', true)
      console.log('all data fetch: ')
    }, 2000)
  },
  head() {
    return {
      titleTemplate: 'Accueil - Justine Saez', // '%s - Justine Saez',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'my description',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['introDone', 'projectsData', 'generalData', 'allDataFetch']),
    rootClass(): (string | undefined | boolean)[] {
      return [this.$style.root, this.allDataFetch && this.$style['root--done']]
    },
  },
  activated() {
    // Call fetch again if last fetch more than 25 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 25000) this.$fetch()
  },
  mounted() {
    this.parseTitle()
    this.parseIntro()
    // loader page
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  },
  methods: {
    toggleAbout(action: boolean) {
      this.aboutOpen = action
    },
    parseTitle() {
      const element = this.$refs.title as HTMLElement
      if (!element) return

      const words = element.innerHTML.trim().split(' ')
      element.innerHTML = ''
      let indexItem = 0

      words.forEach((word) => {
        const wordTag = document.createElement('div')
        // wordTag.classList.add(this.$style.word)
        element.appendChild(wordTag)

        word.split('').forEach((letter) => {
          const letterTag = document.createElement('span')
          letterTag.innerHTML = letter
          letterTag.classList.add(this.$style.letter)
          indexItem++
          letterTag.style.setProperty(
            '--delay',
            indexItem * this.$options.letterIntervalTitle + 'ms'
          )
          wordTag.appendChild(letterTag)
        })
      })
      element.classList.add(this.$style['title--active'])

      window.setTimeout(() => {
        this.titleAnimationDone = true
        console.log('title animation done ', this.titleAnimationDone)
      }, indexItem * this.$options.letterIntervalTitle * 2)
    },
    parseIntro() {
      const element = this.$refs.intro as HTMLElement
      if (!element) return
      const line = element.innerHTML.split('<br>')

      element.innerHTML = ''

      line.forEach((line, i) => {
        const lines = document.createElement('div')
        lines.classList.add(this.$style.line)
        lines.style.setProperty(
          '--delay',
          i * this.$options.letterIntervalIntro +
            this.$options.delayStartIntroText +
            'ms'
        )

        const span = document.createElement('span')
        span.classList.add(this.$style.line__inner)
        span.innerHTML = line

        lines.appendChild(span)
        element.appendChild(lines)
      })
    },
  },
})
</script>

<style lang="scss" module>
.root {
  position: relative;
  width: 100%;
  overflow: hidden;
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

.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .root--done & {
    overflow: inherit;
  }
}

.title {
  text-align: center;
  opacity: 0;
  //font-size: 13rem;
  font-size: 13vw;
  line-height: 0.9;
  //z-index: 10;
  transition: opacity 200ms;

  .letter {
    transition: all 500ms;
  }
  &--active {
    opacity: 1;

    .letter {
      display: inline-block;
      opacity: 0;
      padding: 0 10px;
      transition: all 500ms;
      animation: slide-in 0.7s var(--delay) ease(out-quart) forwards;
    }
  }

  &--moving {
    opacity: 1;

    .letter {
      display: inline-block;
      opacity: 1;
      animation: moving 0.8s var(--delay) infinite steps(6, jump-none);
    }
  }
  &--visible {
    opacity: 1;
  }
}

// ease(out-quart)
@keyframes slide-in {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
    padding: 0;
  }
}

@keyframes moving {
  0% {
    transform: scale(1, 1);
  }
  20% {
    transform: scale(1, 1.1) rotate(2deg);
  }
  40% {
    transform: scale(0.95, 0.9) rotate(-4deg);
  }
  60% {
    transform: scale(0.9, 1) rotate(1deg);
  }
  80% {
    transform: scale(1, 1.05) rotate(-4deg);
  }
  100% {
    transform: scale(1.1, 0.9);
  }
}

.image-header {
  position: absolute;
  top: 0;
}

.text-intro {
  position: absolute;
  left: 50px;
  bottom: 50px;
  max-width: 440px;
  font-weight: 300;
  font-style: italic;
  opacity: 0;
  transition: background-color 300ms;
  padding: 8px 15px;

  .root--done & {
    opacity: 1;
    background-color: color(light-yellow);
  }

  strong {
    font-weight: 600;
  }

  .line {
    overflow: hidden;
    padding: 2px 0;
  }

  .line__inner {
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%) rotate(5deg);
    transition: transform 300ms var(--delay) ease-in-out,
      opacity 300ms var(--delay) ease-in-out;
    display: inline-block;

    .root--done & {
      transform: translateY(0) rotate(0);
      opacity: 1;
      visibility: inherit;
    }
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

  .root--done & {
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
