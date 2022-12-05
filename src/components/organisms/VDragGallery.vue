<template>
    <div :class="$style.root">
        <div
            ref="gallery"
            :class="$style.gallery"
            :style="{
                transform: `translate(${galleryPosition.x}px, ${galleryPosition.y}px) skew(${galleryPosition.skewX}deg, ${galleryPosition.skewY}deg)`,
            }"
        >
            <div v-for="index in 30" :key="index" :class="$style.item">
                <nuxt-img src="images/share.jpg" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import mixins from 'vue-typed-mixins'
import MousePosition from '~/mixins/MousePosition'
import { clamp, mapRange } from '~/utils/functions'

interface GalleryPosition {
    x: number
    y: number
    skewY: number
    skewX: number
}

const MAX_SKEW_VALUE = 4
export default mixins(MousePosition).extend({
    name: 'VDragGallery',
    data() {
        return {
            galleryPosition: {} as GalleryPosition,
        }
    },
    methods: {
        onMousePositionUpdate() {
            const gallery = this.$refs.gallery as HTMLElement

            const XMousePercent = this.mousePosition.x / Math.min(window.innerWidth, gallery.offsetWidth)
            const YMousePercent = this.mousePosition.y / Math.min(window.innerHeight, gallery.offsetHeight)

            const XTranslate = gallery.offsetWidth * XMousePercent * -0.5
            const YTranslate = gallery.offsetHeight * YMousePercent * -0.5

            const skewY = mapRange(YMousePercent, 0, 1, -MAX_SKEW_VALUE, MAX_SKEW_VALUE)
            const skewX = mapRange(XMousePercent, 0, 1, -MAX_SKEW_VALUE, MAX_SKEW_VALUE)

            this.galleryPosition = { x: XTranslate, y: YTranslate, skewY, skewX }
            // this.lastMousePosition = {...this.mousePosition, skewY, skewX}
        },
    },
})
</script>
<style lang="scss" module>
.root {
    width: 100%;
    height: 80vh;
    margin: 100px;
}
.gallery {
    position: absolute;
    display: flex;
    min-width: 200vw;
    flex-wrap: wrap;
    gap: 100px;
    transition: transform 1.4s ease(out-quart);
}

.item {
    display: flex;
    overflow: hidden;
    width: min(30%, 300px);
    border-radius: 15px;

    & img {
        width: 100%;
        height: auto;
    }
}
</style>
