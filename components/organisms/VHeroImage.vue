<template>
  <div
    v-if="imageAndPosReady && !!imageData.length"
    :class="[$style.hero__cul, allDataFetch && $style['hero__cul--finished']]"
    :style="gridSize"
  >
    <div
      v-for="(media, i) in imageData"
      :key="i"
      :class="$style['wrapper-img']"
      :style="{ '--pos-column': posArray[i][0], '--pos-row': posArray[i][1] }"
    >
      <img
        ref="image"
        :src="media.url"
        alt=""
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
// import type { PropType } from 'vue'
import { ComponentWithCustomOptionsConstructor } from '~/utils/types/options'

export interface LoaderImage {
  url?: string | null
  name?: string | null
  slug?: string | null
  pos?: LocationContent | null
}

type LocationContent = [number, number]

interface VHeroImageOptions {
  images: number
  emptyCenter: boolean
  emptyBorder: boolean
}

export default (
  Vue as ComponentWithCustomOptionsConstructor<VHeroImageOptions>
).extend({
  name: 'VHeroImage',
  images: 20,
  emptyCenter: true,
  emptyBorder: false,
  props: {
    beginAnimation: Boolean,
  },
  data() {
    return {
      intervalId: -1,
      posArray: [] as LocationContent[],
      imageData: [] as LoaderImage[],
      gridSize: {} as Record<string, string>,
    }
  },
  computed: {
    ...mapGetters(['allDataFetch']),
    imageAndPosReady(): boolean {
      return this.imageData.length > 0 && this.posArray.length > 0
    },
  },
  created() {
    const self = this
    const interval = setInterval(function () {
      if (!self.allDataFetch) {
        self.generatePositionArray(false)
      } else {
        clearInterval(interval)
      }
    }, 200)
  },
  mounted() {
    this.storeImageData()
    this.sizeGridItem()
    window.addEventListener('keydown', this.generatePositionArray)
    window.addEventListener('resize', this.sizeGridItem)
  },
  destroyed() {
    window.removeEventListener('keydown', this.generatePositionArray)
    window.removeEventListener('resize', this.sizeGridItem)
  },
  methods: {
    sizeGridItem() {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth || 15
      this.gridSize = {
        '--width-column':
          Math.floor((window.innerWidth - scrollBarWidth) / 10) + 'px',
        '--height-row': Math.floor(window.innerHeight / 7) + 'px',
      }
    },
    storeImageData() {
      const medias = []
      for (let i: number = 0; i < this.$options.images; i++) {
        const decimal = i < 10 ? '0' : ''
        const imgPath = require(`~/static/images/cul-${decimal}${i}.png`)
        medias.push({
          url: imgPath,
          name: `loader image ${i}`,
          slug: `illustration-personnage-${i}`,
        })
      }
      this.imageData = medias
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

      this.posArray = this.getRandomXItems(coordinate, this.imageData.length)
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
      const index = Math.floor(Math.random() * this.imageData.length)
      return this.imageData[index].url ?? ''
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
