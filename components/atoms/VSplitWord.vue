<script lang="ts">
import Vue from 'vue'
import type { VNode } from 'vue'

interface SplitWordProps {
    enabled: boolean
    content: string
    defaultHidden: boolean
    transitionEndEvent: boolean
}

export default Vue.extend({
    name: 'VSplitWord',
    // functional: true,
    props: {
        enabled: { type: Boolean, default: true },
        content: String,
        defaultHidden: Boolean,
        transitionEndEvent: Boolean,
    },
    render(createElement): VNode {
        const { content, defaultHidden, transitionEndEvent, enabled } = this.$props as SplitWordProps

        const wrapperData = { class: [this.$style.root] }
        const slots = this.$slots && (this.$slots?.default?.[0] as VNode)

        if (!enabled)
            return ((slots || content) && createElement('div', wrapperData, [slots || content])) || createElement('')

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
                            class: [this.$style.letter, defaultHidden && this.$style['letter--hide'], 'split-letter'],
                            style: { '--index-letter-in-word': index, '--index-letter-total': indexLetter },
                        },
                        letter
                    )
                })
            )
        })

        return createElement('div', wrapperData, childrenNode)
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    font-family: $noi;
}

.word {
    display: inline-block;

    & + & {
        margin-left: 0.3em;
    }
}

.letter {
    position: relative;
    display: inline-block;
    transition-delay: calc(100ms * var(--index-letter-total, 1));
    transition-duration: 0.8s;
    transition-property: transform, opacity, font-variation-settings;
    transition-timing-function: ease(out-quart);

    &.letter--hide {
        font-variation-settings: 'wght' 100;
        opacity: 0;
        transform: translateY(-50px);
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
