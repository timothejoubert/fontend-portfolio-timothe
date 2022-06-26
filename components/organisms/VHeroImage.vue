<template>

  <div :class="$style.hero__cul" v-if="!!locationArray">

    <div
        :class="$style['wrapper-img']"
        v-for="media in medias"
        :key="media.slug"
        :style="{'--pos-column': media.pos[0], '--pos-row': media.pos[1]}"
    >
      <img :src="media.url" alt="" :class="$style.media" ref="media"/>
    </div>

  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export interface LoaderImage {
  url?: string | null
  name?: string | null
  slug?: string | null
  pos: LocationContent | null
}

type LocationContent = [number, number]
type LocationContentRow = LocationContent[]
type LocationContentColumn = LocationContentRow[]

export default Vue.extend({
  name: 'VHeroImage',
  props: {
    startLoading: Boolean,
  },
  data() {
    return {
      //locationGrid: Array as PropType<LocationContentColumn[]>,
    }
  },
  created(){
    const self = this
      const interval = setInterval(function() {
        if(!self.startLoading){
           self.updateLocationMedia()

        } else {
          clearInterval(interval)
        }
      }, 600)
  },
  computed: {
    medias(): LoaderImage[] {
      const medias = []
      for (let i: number = 0; i < 20; i++) {
        const decimal = i < 10 ? '0' : ''
        medias.push({
          url: require(`~/static/images/cul-${decimal}${i}.png`),
          name: `loader image ${i}`,
          slug: `illustration-personnage-${i}`,
          pos: this.getRandomPosition(),
        })
      }
      return medias
    },
    usedLocation(): (LocationContent | null | undefined)[] {
      return this.medias.map((image) => {
        return image.pos
      })
    },
    locationArray() {
      let coordinate:LocationContentColumn = [[]];

      for (let column = 0; column <= 10; column += 1) {
        coordinate[column] = []
        for (let row = 0; row <= 7; row += 1) {
          coordinate[column][row] = [column, row];
        }
      }
      return coordinate;
    },
  },
  methods: {
    getRandomPosition(): LocationContent {
      if(!this.locationArray && !Array.isArray(this.locationArray) && !this.locationArray?.length) return [0,0]

      //get random index for colum & row
      const indexColumn: number | null = this.getRandomIndex(this.locationArray.length);
      const columnSelected = this.locationArray[indexColumn] as LocationContentRow;
      const indexRow: number = this.getRandomIndex(columnSelected.length);

      //get location selected
      const selectLocation = columnSelected[indexRow] as LocationContent

      //remove selected location from this.locationArray
      this.locationArray[indexColumn].splice(indexRow, 1);

       return selectLocation

    },
    getRandomIndex(length:number): number {
      return Math.floor(Math.random() * length)
    },
    updateLocationMedia() {
      console.log('update pos image')
      this.medias.forEach(media => {
        media.pos = this.locationArray[this.getRandomIndex(this.medias.length)]
      })
    },
  },
  watch: {
    locationArray(newVal) {
      console.log('watch location array', newVal)
        if(this.startLoading){
          window.setTimeout(() => this.updateLocationMedia(), 400)
        }
    },
  },
})
</script>

<style lang="scss" module>
.hero__cul{
  position: absolute;
  height: 100vh;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(7, 1fr);
  grid-gap: 10px;
}
.wrapper-img{
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  grid-column: var(--pos-column) / span 1;
  grid-row: var(--pos-row) / span 1;
}

.media {
  max-width: 100px;
  object-fit: contain;
}

</style>
