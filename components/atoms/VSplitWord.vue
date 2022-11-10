<script lang="ts">
import Vue from 'vue'
import type { VNode } from 'vue'

interface SplitWordProps {
    content: string
    defaultHidden: boolean
    transitionEndEvent: boolean
}

export default Vue.extend({
    name: 'VSplitWord',
    // functional: true,
    props: {
        content: String,
        defaultHidden: Boolean,
        transitionEndEvent: Boolean,
    },
    render(createElement): VNode {
        const { content, defaultHidden, transitionEndEvent } = this.$props as SplitWordProps
        if (!content) return createElement('')

        let indexLetter = 0

        const childrenNode: VNode[] = content.split(' ').map((word: string, wordIndex: number) => {
            const letters = word.split('')
            return createElement(
                'div',
                {
                    class: [this.$style.word],
                    style: { '--index-word': wordIndex },
                },
                letters.map((letter: string, index: number) => {
                    indexLetter++
                    const event = {} as Record<'on', Record<string, () => void>>
                    if (index === letter.length - 1 && transitionEndEvent)
                        event.on = { transitionend: () => this.$emit('transitionend') }
                    return createElement(
                        'span',
                        {
                            ...event,
                            class: [
                                this.$style.letter,
                                defaultHidden && this?.$style?.['letter--hide'],
                                'split-letter',
                            ],
                            style: { '--index-letter-in-word': index, '--index-letter-total': indexLetter },
                        },
                        letter
                    )
                })
            )
        })

        return createElement(
            'div',
            {
                class: [this.$style.word],
            },
            childrenNode
        )
    },
})
</script>

<style lang="scss" module>
.word {
    position: relative;

    & + & {
        margin-left: 0.3em;
    }
}

.letter {
    position: relative;
    display: inline-block;

    &.letter--hide {
        font-variation-settings: 'wght' 100;
        opacity: 0;
        transform: translateY(-50px);
        transition-delay: calc(100ms * var(--index-letter-total, 1));
        transition-duration: 0.8s;
        transition-property: transform, opacity, font-variation-settings;
        transition-timing-function: ease(out-quart);
    }

    :global(.load) & {
        font-variation-settings: 'wght' 900;
        opacity: 1;
        transform: translateY(0);
    }

    :global(.load--finish) & {
        transition-delay: calc(20ms * var(--index-letter-total, 1));
        transition-duration: 0.4s;
        transition-timing-function: ease(out-quad);
    }
}
</style>
