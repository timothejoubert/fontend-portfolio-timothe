<script lang="ts">
import Vue from 'vue'
import type { VNode, VNodeData } from 'vue'

interface WordData {
    start?: string
    end?: string
    inBetween?: string
    index: number
}

export default Vue.extend({
    name: 'VMarkdown',
    functional: true,
    props: {
        content: String,
        inline: Boolean,
        tag: String,
    },
    render(createElement, context): VNode {
        // this.$slots.default
        const { content, inline, tag } = context.props
        if (!content) createElement('')

        const children: VNode[] = content.split('**').map((word: string, index: number) => {
            const isStartedWithBold = word.startsWith('**')
            const isBold = isStartedWithBold ? !(index % 2) : index % 2
            return createElement(
                'span',
                {
                    class: [context.$style.word, isBold && context.$style['word--bold']],
                    attrs: {
                        'data-index': index,
                    },
                },
                [word]
            )
        })

        return createElement(
            inline ? tag : 'div',
            {
                ...context.data,
                class: [context.$style.root, context.data.class],
            },
            children
        )
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
}
.word {
    color: lightgrey;

    &--bold {
        padding: rem(10) rem(12) rem(13);
        background-color: var(--color-about-yellow-bg);
        border-radius: rem(5);
        color: var(--color-about-yellow);
        white-space: nowrap;
    }

    &--bold:nth-last-child(-n + 6) {
        background-color: var(--color-about-purple-bg);
        color: var(--color-about-purple);
    }
}
</style>
