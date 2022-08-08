<template>
  <div
    :class="[
      $style.root,
      beginAnimation && $style['root--visible'],
      allDataFetch && $style['root--done'],
    ]"
  >
    <div :class="$style.bar">
      <span>{{ isBarComplete ? 'Done' : 'loading' }}</span>

      <div :class="$style.bar__inner">
        <span :class="$style.percent">{{ percentage }}%</span>
        <svg
          :class="$style.line"
          width="345"
          height="25"
          viewBox="0 0 345 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-if="percentage > 1"
            :style="loadingPathStyle"
            d="M3 11.1175L9.11373 3.71475C7.75512 7.41614 5.44549 14.7449 7.07582 14.4488C9.11372 14.0786 9.40485 6.67586 13.7718 5.19531C18.1387 3.71475 11.7339 17.0398 14.6452 16.2995C17.5565 15.5592 22.5057 2.23419 26.2904 3.71475C30.0751 5.19531 22.2146 14.4488 23.6702 14.4488C30.0751 11.1175 31.5307 10.0072 32.113 8.5266C32.6952 7.04604 32.4041 -0.726922 34.7331 5.19531C37.0622 11.1175 34.1509 16.2994 36.1888 14.4488C38.2267 12.5981 38.5178 5.93566 40.2646 8.5266C42.0114 11.1175 40.8469 20.371 43.1759 16.2995C45.5049 12.228 44.3404 0.753681 46.9606 6.67591C49.5808 12.5981 48.9985 21.4814 50.7453 16.2995C52.4921 11.1175 54.2388 1.86402 57.4413 5.19531C60.6437 8.5266 58.6058 20.371 63.555 14.4488C68.5042 8.5266 62.9727 6.67591 66.4663 6.67591C69.9598 6.67591 73.1623 2.60441 74.0357 8.5266C74.9091 14.4488 73.4534 16.2995 78.1115 16.2995C81.8379 16.2995 81.2169 8.8967 80.4405 5.19531L83.9341 16.2995C84.6134 12.1046 88.5 8 89.5 7C91 7 94 2.00001 96.5 4C99 5.99999 94.9191 5.32646 98.0041 11.1175C101.86 18.3564 112.377 18.1502 115.533 16.2995C118.688 14.4488 109.923 -1.84297 123.946 14.4488C128.153 14.4488 124.998 0.753709 132.71 8.5266C140.423 16.2995 150.239 25.2362 151.641 19.8425C153.043 14.4488 149.538 2.39259 161.457 11.1175C173.376 19.8425 166.716 25.2362 178.284 19.8425C189.853 14.4488 177.934 2.60441 190.204 8.5266C202.474 14.4488 187.049 19.8425 198.617 19.8425C210.186 19.8425 200.02 2.60441 209.836 8.5266C219.651 14.4488 217.198 21.4814 224.91 16.2995C231.571 11.1175 231.571 2.39259 236.479 11.1175C241.387 19.8425 242.088 20.371 244.191 14.4488C246.295 8.5266 250.502 2.39259 252.605 11.1175C254.708 19.8425 257.863 21.4814 262.07 16.2995C266.277 11.1175 266.277 2.39259 269.783 11.1175C273.289 19.8425 276.093 18.1502 279.949 16.2995C283.806 14.4488 286.61 0.753709 289.415 8.5266C292.219 16.2995 288.363 17.78 294.673 14.4488C300.983 11.1175 296.075 0.633861 305.19 14.4488C314.305 28.2637 306.593 -1.09697 319.914 6.67591C333.236 14.4488 330.431 20.371 342 14.4488"
            stroke="#DF5A3F"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <a href="#main" :class="$style['scroll-text']" class="text-h3">
      <img
        :class="$style['scroll-hand']"
        :src="require('~/static/icons/icon-hand.png')"
        alt="icon hand scroll to"
      />
      Scroll pour découvrir
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { mapRange } from '~/utils/functions'

export default Vue.extend({
  name: 'VLoader',
  props: {
    beginAnimation: Boolean,
  },
  data() {
    return {
      percentage: 0,
    }
  },
  computed: {
    ...mapGetters(['allDataFetch']),
    isBarComplete(): boolean {
      return this.percentage >= 100
    },
    loadingPathStyle(): Record<string, any> {
      return {
        '--stroke-shift': mapRange(this.percentage, 0, 100, 850, 100),
        '--stroke-dash': 850, // this.mapRange(Number(this.percentage), 0, 100, 100, 700)
      }
    },
  },
  watch: {
    beginAnimation: {
      handler() {
        if (this.beginAnimation) this.addPercentValue()
      },
    },
  },
  methods: {
    randomFromInterval(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    addPercentValue(): void {
      const interval = setInterval(() => {
        if (this.percentage < 100) {
          this.percentage += this.randomFromInterval(0.3, 0.6)
        } else {
          clearInterval(interval)
          this.percentage = 100
          // this.$store.commit('allDataFetch', true)
        }
      }, 10)
    },
  },
})
</script>

<style lang="scss" module>
.root {
  position: relative;
  text-align: center;
  margin-top: 20px;
  transition: opacity 200ms, margin-top 300ms;
  opacity: 0;

  &--visible {
    opacity: 1;
  }
  &.root--done {
    margin-top: 0;
  }
}

.bar {
  transition: opacity 300ms;
  .root--done & {
    opacity: 0;
  }
}

.bar__inner {
  position: relative;
  display: flex;
  width: 500px;
  align-items: center;
  justify-content: center;
}

.percent {
  position: absolute;
}

.line {
  width: 100%;
  height: auto;

  path {
    //animation: dash 5s ease-out forwards;
    stroke-dasharray: var(--stroke-dash);
    stroke-dashoffset: var(--stroke-shift);
    transition: stroke-dashoffset 100ms;
  }
}

@keyframes dash {
  from {
    stroke-dashoffset: 800;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.scroll-text {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  opacity: 0;
  transition: opacity 300ms 300ms, transform 300ms 300ms;
  font-weight: 900;
  font-variation-settings: 'wght' 900;
  font-style: italic;
  color: color(main-orange);
  z-index: 2;
  white-space: nowrap;

  .root--done & {
    opacity: 1;
    transform: translate(-50%, 0%);
  }
}

.scroll-hand {
  display: block;
  width: 75px;
  height: auto;
  margin-right: 15px;
  animation: scroll-img 3s infinite;
}

@keyframes scroll-img {
  40% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(12px);
  }
  70% {
    transform: translateY(0px);
  }
}
</style>
