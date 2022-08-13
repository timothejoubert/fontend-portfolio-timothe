<template>
  <span v-if="elements" :class="$style.root" class="text-h3">
    <component
      :is="el.component"
      v-for="(el, i) in elements"
      :key="i"
      v-bind="el"
      >{{ el.content }}</component
    >
  </span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NotionRichText } from '~/utils/api/notion-block-type'

interface ColorStyle {
  color?: string | undefined
  backgroundColor?: string | undefined
}

interface PropsContent {
  component: string
  content: string | null
  class?: string | null
  href?: string | null
  target?: string | null
  style?: Record<any, string | undefined> | null
}

type PropertiesContent = 'bold' | 'code' | 'color' | 'italic' | 'strikethrough'

export default Vue.extend({
  name: 'VRichText',
  props: {
    content: {
      type: Object as PropType<NotionRichText>,
      required: true,
    },
  },
  computed: {
    elements(): PropsContent[] {
      return this.content.rich_text?.map((el) => {
        const link = el.href && el.href[0] !== '/' ? el.href : null
        const component = link
          ? 'a'
          : el.annotations.code === true
          ? 'code'
          : el.annotations.bold === true
          ? 'strong'
          : el.annotations.strikethrough === true
          ? 'strike'
          : 'span'
        const isBackgroundColor = el.annotations.color?.includes('background')
        const color =
          el.annotations.color === 'default' ? null : el.annotations.color

        const colorStyle = !color
          ? null
          : isBackgroundColor
          ? { backgroundColor: color?.replace('_background', '') }
          : { color }

        let classNames = ''
        for (const properties in el.annotations) {
          if (
            el.annotations[properties as PropertiesContent] &&
            properties !== 'color'
          )
            classNames += properties + ' '
        }
        return {
          component,
          content: el.plain_text,
          style: colorStyle,
          class: classNames,
          target: link ? '_blank' : null,
        }
      })
    },
  },
})
</script>

<style lang="scss" module>
.root {
  position: relative;
  white-space: break-spaces;

  strong {
    font-weight: 700;
  }
}
.italic {
  .root :global & {
    font-style: italic;
  }
}
</style>
