<template>
  <header
    :class="[$style.header, allDataFetch && $style['header--loading-done']]"
  >
    <h1
      ref="title"
      :class="[
        $style.title,
        titleAnimationDone && !allDataFetch && $style['title--moving'],
      ]"
      class="text-h1"
    >
      Justine Saez
    </h1>

    <v-loading-bar :begin-animation="titleAnimationDone" />

    <v-hero-image
      :begin-animation="titleAnimationDone"
      :class="$style['image-header']"
    />

    <h2 ref="intro" :class="$style['text-intro']" class="text-h2">
      <strong>Illustratrice curieuse du corps humain,</strong><br />
      je m’amuse à gribouiller des moments<br />
      cocasse du quotidien.
    </h2>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VLoadingBar from '~/components/organisms/VLoadingBar.vue'
import VHeroImage from '~/components/organisms/VHeroImage.vue'
import { ComponentWithCustomOptionsConstructor } from '~/utils/types/options'

interface VHeaderOptions {
  letterIntervalTitle: number
  delayStartIntroText: number
  letterIntervalIntro: number
}

export default (
  Vue as ComponentWithCustomOptionsConstructor<VHeaderOptions>
).extend({
  name: 'VHeader',
  letterIntervalTitle: 100,
  letterIntervalIntro: 200,
  delayStartIntroText: 1000,
  components: { VHeroImage, VLoadingBar },
  props: {
    inHomePage: Boolean,
  },
  data() {
    return {
      titleAnimationDone: false,
    }
  },
  computed: {
    ...mapGetters(['allDataFetch']),
  },
  mounted() {
    this.parseTitle()
    this.parseIntro()
  },
  methods: {
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
      element.classList.add(this.$style['title--visible'])

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
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .header--loading-done & {
    overflow: inherit;
  }
}

.title {
  text-align: center;
  font-size: 13vw;
  line-height: 0.9;
  visibility: hidden;

  &--visible,
  .header--loading-done & {
    visibility: visible;
  }
  &--moving {
    visibility: visible;
  }
}

.letter {
  opacity: 0;
  display: inline-block;

  .header:not(.header--loading-done) .title--visible & {
    animation: slide-in 1.2s var(--delay) forwards;
  }
  .title--moving & {
    opacity: 1;
    animation: moving 0.8s var(--delay) infinite steps(6, jump-none);
  }
  .header--loading-done & {
    opacity: 1;
  }
}

// ease(out-quart)
@keyframes slide-in {
  0% {
    transform: scale(0);
    opacity: 0;
    padding: 0 10px;
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

  .header--loading-done & {
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

    .header--loading-done & {
      transform: translateY(0) rotate(0);
      opacity: 1;
      visibility: inherit;
    }
  }
}
</style>
