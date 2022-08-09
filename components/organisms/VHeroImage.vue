<template>
  <div
    v-if="!!images.length && !!posArray.length"
    :class="[$style.hero__cul, allDataFetch && $style['hero__cul--finished']]"
    :style="gridSize"
  >
    <div
      v-for="(media, i) in images"
      :key="i"
      :class="$style['wrapper-img']"
      :style="{ '--pos-column': posArray[i][0], '--pos-row': posArray[i][1] }"
    >
      <img
        ref="image"
        :src="media.url"
        :alt="media.alt"
        :class="$style.media"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { ComponentWithCustomOptionsConstructor } from '~/utils/types/options'
import { MediaContent } from '~/utils/block-parser'

export interface LoaderImage extends MediaContent {
  pos?: LocationContent | null
}

type LocationContent = [number, number]

interface VHeroImageOptions {
  images: number
  emptyCenter: boolean
  emptyBorder: boolean
  repeatTime: number
}

export default (
  Vue as ComponentWithCustomOptionsConstructor<VHeroImageOptions>
).extend({
  name: 'VHeroImage',
  images: 20,
  repeatTime: 20,
  emptyCenter: true,
  emptyBorder: false,
  props: {
    beginAnimation: Boolean,
  },
  data() {
    return {
      intervalId: -1,
      posArray: [] as LocationContent[],
      gridSize: {} as Record<string, string>,
    }
  },
  computed: {
    ...mapGetters(['imageLoadingList', 'allDataFetch']),
    images(): LoaderImage[] {
      console.log(this.imageLoadingList)
      return this.imageLoadingList
    },
  },
  mounted() {
    this.sizeGridItem()
    let repeat = 0
    const self = this

    const interval = setInterval(function () {
      if (repeat === self.$options.repeatTime || self.allDataFetch)
        clearInterval(interval)
      self.generatePositionArray(false)
      repeat++
    }, 200)

    window.addEventListener('keydown', this.generatePositionArray)
    window.addEventListener('resize', this.sizeGridItem)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.generatePositionArray)
    window.removeEventListener('resize', this.sizeGridItem)
  },
  methods: {
    sizeGridItem() {
      const containerWidth =
        (this.$el as Element).clientWidth || window.innerWidth - 80
      console.log('width header', containerWidth, this.$el)
      this.gridSize = {
        '--width-column': Math.floor(containerWidth / 10) + 'px',
        '--height-row': Math.floor(window.innerHeight / 7) + 'px',
      }
    },
    generatePositionArray(event: KeyboardEvent | false): void {
      if (event && (event.key === 'Tab' || event.key === ' ')) return
      const coordinate: LocationContent[] = []
      let index = 0
      const addValue = this.$options.emptyBorder ? 2 : 1

      for (let column = addValue; column < 12 - addValue; column++) {
        for (let row = addValue; row < 9 - addValue; row++) {
          if (
            this.$options.emptyCenter &&
            (column < 3 ||
              column > 8 ||
              (row < 3 && column > 2 && column < 9) ||
              (row > 5 && column > 2 && column < 9))
          ) {
            coordinate[index] = [column, row] as LocationContent
            index++
          }
          if (!this.$options.emptyCenter) {
            coordinate[index] = [column, row] as LocationContent
            index++
          }
        }
      }

      this.posArray = this.getRandomXItems(coordinate, this.images.length)
    },
    getRandomXItems(
      sourceArray: LocationContent[],
      neededElements: number
    ): LocationContent[] {
      const result = []

      for (let i = 0; i < neededElements; i++) {
        const index = Math.floor(Math.random() * sourceArray.length)
        result.push(sourceArray[index])
        sourceArray.splice(index, 1)
      }
      return result
    },
    repeatRandomizeImage(image: HTMLImageElement) {
      const url = this.getRandomImagePath()
      if (url) image.src = url
    },
    getRandomImagePath(): string {
      const index = Math.floor(Math.random() * this.images.length)
      return this.images[index].url ?? ''
    },
    onMouseOver(event: Event): void {
      if (this.intervalId !== -1) {
        window.clearTimeout(this.intervalId)
        this.intervalId = -1
      }
      const target = event.target as HTMLImageElement

      this.intervalId = window.setInterval(
        () => this.repeatRandomizeImage(target),
        400
      )
    },
    onMouseLeave() {
      window.clearTimeout(this.intervalId)
      this.intervalId = -1
    },
  },
})
</script>

<style lang="scss" module>
.hero__cul {
  --height-row: 1fr;
  --width-column: 1fr;
  position: absolute;
  height: 100vh;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(10, var(--width-column));
  grid-template-rows: repeat(7, var(--height-row));
  grid-gap: 0px;
  //overflow: hidden;
}
.wrapper-img {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  grid-column: var(--pos-column) / span 1;
  grid-row: var(--pos-row) / span 1;
  opacity: 0.3;
  transform: scale(0.8);
  transform-origin: center;
  transition: all 400ms;

  .hero__cul--finished & {
    opacity: 0.6;
    transform: scale(1);

    &:hover {
      opacity: 1;
    }
  }
}

.media {
  max-width: 100px;
  object-fit: contain;
}
</style>
