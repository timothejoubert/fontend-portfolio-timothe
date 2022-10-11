<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'

type ImageExtension = '.gif' | '.png' | '.jpg' | '.jpeg' | '.webp'
type VideoExtension = '.gif' | '.mp4' | '.mov'

export default Vue.extend({
    name: 'VImage',
    props: {
        strapiImage: Object as PropType<Image>,
    },
    data() {
        return {
            loaded: false,
        }
    },
    mounted() {
        if ('querySelector' in this.$el) {
            const img = this.$el.querySelector('img')
            if (img?.complete) this.loaded = true
        }
    },
    render(createElement): VNode {
        const basicImg = this.strapiImage
        const { alternativeText } = basicImg || {}
        const formats = basicImg?.formats
        const img = this.strapiImage?.formats?.large || basicImg

        if (!img) return createElement('')

        const { url, width, height, ext } = img || {}

        // TODO: detect if dev or prod mode for display right path
        const baseUrl = process.env.NODE_ENV === 'production' ? process.env.STRAPI_URL : 'http://localhost:1337'

        const imgAttributes: Record<string, any> = {
            src: baseUrl + url,
            alt: alternativeText || '',
            width: width || '',
            height: height || '',
        }

        const imgNode = createElement('img', {
            attrs: {
                ...imgAttributes,
            },
            class: [this.$style.image],
            on: {
                load: () => {
                    this.loaded = true
                },
            },
        })
        return createElement(
            'figure',
            {
                class: [this.$style.root],
            },
            [imgNode]
        )
        // let width = 0
        // if (typeof this.width !== 'undefined')
        //   width = this.width === 'string' ? parseFloat(this.width) : (this.width as number)
        // else if (this.crop) width = parseFloat(this.crop.split('x')[0])
        // else if (this.image?.imageWidth) width = parseFloat(this.image.imageWidth)
        //
        // let height = 0
        // if (this.height) height = typeof this.height === 'string' ? parseFloat(this.height) : this.height
        // else if (this.crop) height = parseFloat(this.crop.split('x')[1])
        // else if (this.image?.imageHeight) height = parseFloat(this.image.imageHeight)
        //
        // // image
        // const modifiersKeys = Object.keys(interventionRequestProps).filter((key) => !['width', 'height'].includes(key))
        // const imgModifiers = { ...(this.modifiers || {}) }
        // modifiersKeys.forEach((key) => {
        //   if (typeof this.$props[key] !== 'undefined') imgModifiers[key] = this.$props[key]
        // })
        // const imgProps: Record<string, any> = {
        //   ...this.$props,
        //   src: src || this.src,
        //   alt: alt || this.alt,
        //   width: (!this.ratio && width) || '',
        //   height: (!this.ratio && height) || '',
        //   modifiers: imgModifiers,
        // }
        // const img = createElement(this.tag === 'img' || !processable ? 'nuxt-img' : 'nuxt-picture', {
        //   props: imgProps,
        //   on: {
        //     load: () => {
        //       this.loaded = true
        //     },
        //   },
        // })
        //
        // if (this.ratio || copyright || this.placeholder || this.rounded) {
        //   const figureStyle: Record<string, string> = {}
        //   const children: VNode[] = [img]
        //
        //   if (this.ratio) {
        //     if (typeof this.ratio === 'number') {
        //       figureStyle.paddingBottom = this.ratio * 100 + '%'
        //     } else if (width && height) {
        //       figureStyle.paddingBottom = (height / width) * 100 + '%'
        //     }
        //   }
        //
        //   if (this.placeholder) {
        //     let background
        //
        //     if (typeof this.placeholder === 'string') {
        //       background = this.placeholder
        //     } else if (this.image?.imageAverageColor) {
        //       background = this.image?.imageAverageColor
        //       // background = context.parent.$img(this.image.relativePath, {
        //       //     ...imgModifiers,
        //       //     width: 50,
        //       //     blur: 10,
        //       // })
        //     }
        //
        //     if (background) figureStyle.background = background
        //   }
        //
        //   if (copyright) {
        //     children.push(
        //       createElement(
        //         'VInformation',
        //         {
        //           class: [
        //             this.$style.copyright,
        //             this.copyrightPlacement && this.$style['copyright--' + this.copyrightPlacement],
        //           ],
        //           props: {
        //             placement: this.copyrightPlacement === 'top' ? 'bottom-end' : 'top-end',
        //           },
        //         },
        //         copyright
        //       )
        //     )
        //   }
        //
        //   return createElement(
        //     'figure',
        //     {
        //       style: figureStyle,
        //       class: [
        //         this.$style.root,
        //         this.ratio && this.$style['root--ratio'],
        //         // this.placeholder && this.$style['root--placeholder'],
        //         this.loading === 'lazy' && this.$style['root--lazy'],
        //         this.loaded && this.$style['root--loaded'],
        //         this.rounded && this.$style['root--rounded'],
        //         this.roundedReady && this.$style['root--rounded-ready'],
        //         this.rounded === 'reverse' && this.$style['root--rounded-reverse'],
        //       ],
        //     },
        //     children
        //   )
        // }
        //
        // return img
    },
})
</script>

<style lang="scss" module>
$rounded-border-radius-x: 50%;
$rounded-border-radius-y: 39%;
$rounded-border-radius: $rounded-border-radius-x $rounded-border-radius-y;

.root {
    display: inline-block;
    background-color: var(--image-background-color);
    border-radius: var(--image-border-radius, 0);
    transform: translate(0); // update context to prevent crop glitch on safari

    &--loaded.root--rounded-ready,
    &--loaded.root--rounded {
        background-color: inherit !important;
        transform: none;
        transition: var(--image-transition, all 0s), background 300ms 600ms, transform 0ms 600ms;
    }

    &--ratio {
        position: relative;
        display: block;
    }

    &--rounded-ready,
    &--rounded {
        overflow: hidden;
        backface-visibility: hidden;
    }
}

// targets direct <img /> child or <picture /> nested <img />
.root img {
    display: block;
    width: var(--image-width, auto);
    max-width: var(--image-max-width, 100%);
    height: var(--image-height, auto);
    object-fit: var(--image-object-fit, initial);
    object-position: var(--image-object-position, initial);
}

.root--ratio img {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--image-width, 100%);
    height: var(--image-height, 100%);
    object-fit: var(--image-object-fit, cover);
}

.root--lazy img {
    opacity: 0;
    transition: var(--image-img-transition, all 0s), opacity 0.3s;
}

.root--loaded img {
    opacity: 1;
}

.copyright {
    position: absolute !important;
    z-index: 2;
    right: var(--gutter);
    bottom: var(--gutter);
}
.copyright--top {
    top: var(--gutter);
    right: var(--gutter);
}
.copyright--bottom-start {
    right: inherit;
    bottom: var(--gutter);
    left: var(--gutter);
}
</style>
