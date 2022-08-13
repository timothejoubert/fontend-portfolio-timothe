<template>
  <section id="more" :class="$style.root">
    <nuxt-link to="/VMoreProject" :class="$style.link">
      <div
        v-for="i in 6"
        :key="i"
        v-prlx="{
          custom: true,
          limit: { min: 0, max: 100 },
          fromBottom: true,
        }"
        :class="[$style.line, i % 2 && $style['line--odd']]"
      >
        <h1 ref="line" class="text-h1" :data-text="text" :class="$style['text']">
          {{ text }}
        </h1>
      </div>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapRange, lerp } from '~/utils/functions'

export default Vue.extend({
  name: 'VSeeMore',
  props: {
    repeatNumber: { type: Number, default: 6 },
    text: { type: String, default: "Envie d'en voir plus ?" },
  },
  data() {
    return {
      translateValue: 0,
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.marqueeMove)
  },
  destroyed() {
    // window.removeEventListener('scroll', this.marqueeMove)
  },
  methods: {
    marqueeMove() {
      const targetBox = (this.$el as HTMLElement).getBoundingClientRect()
      const isInStartView = targetBox.top - window.innerHeight < 0
      const isOffView = targetBox.top + targetBox.height > 0

      if (!isInStartView || !isOffView) return
      const scrollVal = Math.floor(mapRange(targetBox.top, window.innerHeight, -window.innerHeight, 0, 100))
      // console.log(scrollVal)
      this.translateCalc(scrollVal)
    },
    translateCalc(scroll: number) {
      const newVal = mapRange(scroll, 0, 100, -1000, 1000)
      const line = this.$refs?.line as HTMLElement[]
      // const translateX = parseInt(line[3].style.transform.replace(/[^\d.]/g, ''))
      // console.log(translateX)
      this.translateValue = lerp(newVal, newVal, 0.1)
    },
  },
})
</script>

<style lang="scss" module>
.root {
  width: calc(100% + var(--padding-border) * 2);
  z-index: 10;
  left: -40px;
  position: relative;
  padding: 500px 0 100vh 0;
  overflow: hidden;
}

.link {
  display: flex;
  flex-direction: column;
  transform-origin: center center;
  transform: rotate(-14deg);
}

.line {
  transition: transform 0.1s ease-out 0s;

  &:not(#{&}--odd) {
    transform: translate3d(calc(var(--parallax-value) * -0.6vw), 0, 0);
  }
  &--odd {
    align-self: flex-end;
    transform: translate3d(calc(var(--parallax-value) * 0.6vw), 0, 0);
  }

  &--odd {
    opacity: 0.22;
  }
}

.text {
  position: relative;
  white-space: nowrap;
  margin: 25px 0;
  font-size: 134px;

  &::before,
  &::after {
    position: relative;
    display: inline-block;
    content: attr(data-text);
    margin: 0 45px;
  }

  .line--odd & {
    //left: -300px;
  }
}
</style>
