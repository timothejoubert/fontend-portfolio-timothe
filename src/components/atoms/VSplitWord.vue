<script lang="ts">
import Vue, { PropType } from 'vue'
import type { VNode } from 'vue'

interface SplitWordProps {
    enabled: boolean
    content: string
    defaultHidden: boolean
    transitionEndEvent: boolean
    split: SplitItem[]
    numberOfWordInLine: number
}

type SplitItem = 'letter' | 'word' | 'line'

export default Vue.extend({
    name: 'VSplitWord',
    // functional: true,
    props: {
        enabled: { type: Boolean, default: true },
        split: {
            type: Array as PropType<SplitItem[]>,
            default: () => ['letter'],
        },
        numberOfWordInLine: {
            type: Number,
            default: 2,
        },
        content: String,
        defaultHidden: Boolean,
        transitionEndEvent: Boolean,
    },
    render(createElement): VNode {
        const { content, defaultHidden, transitionEndEvent, enabled, split, numberOfWordInLine } = this
            .$props as SplitWordProps

        const displayLetter = split.includes('letter')
        const displayWord = split.includes('word')
        const displayLine = split.includes('line')

        const wrapperData = {
            ...this.$data,
            class: [
                this.$style.root,
                enabled && this.$style['root--enable'],
                split.map((displayedItem: string) => this.$style['root--display-' + displayedItem]),
            ],
        }
        const slots = this.$slots && (this.$slots?.default?.[0] as VNode)

        if (!enabled)
            return ((slots || content) && createElement('div', wrapperData, [slots || content])) || createElement('')

        let indexLetter = 0

        const parsedLetters = (word: string): VNode[] => {
            const letters = word.split('')
            return letters.map((letter: string, index: number) => {
                indexLetter++
                const event = {} as Record<'on', Record<string, () => void>>
                if (index === letter.length - 1 && transitionEndEvent)
                    event.on = { transitionend: () => this.$emit('transitionend') }
                return createElement(
                    'div',
                    {
                        ...event,
                        class: [
                            this.$style.letter,
                            defaultHidden && this.$style['letter--hide'],
                            letter === ' ' && this.$style['letter--last'],
                            'split-letter',
                        ],
                        style: { '--index-letter-in-word': index, '--index-letter-total': indexLetter },
                    },
                    letter
                )
            })
        }

        const words: string[] = content.split(' ')
        const parsedWords = (line: string): VNode[] => {
            const words = line.split(' ')
            return words.map((word: string, wordIndex: number) => {
                return createElement(
                    'div',
                    {
                        class: [this.$style.word],
                        style: { '--index-word': wordIndex },
                    },
                    displayLetter ? parsedLetters(word) : word
                )
            })
        }

        const lineNodes = (): VNode[] => {
            const lineLength = Math.ceil(words.length / numberOfWordInLine)
            const lines = Array.from(Array(lineLength).keys()).map((count: number) => {
                const indexOfFirstWord = count * numberOfWordInLine
                return words.slice(indexOfFirstWord, indexOfFirstWord + numberOfWordInLine).join(' ')
            })

            return lines.map((line: string, lineIndex: number): VNode => {
                return createElement(
                    'div',
                    {
                        class: [this.$style.line],
                        style: { '--index-line': lineIndex },
                    },
                    displayWord ? parsedWords(line) : displayLetter ? parsedLetters(line) : line
                )
            })
        }

        return createElement(
            'div',
            wrapperData,
            displayLine
                ? lineNodes()
                : displayWord
                ? parsedWords(content)
                : displayLetter
                ? parsedLetters(content)
                : content
        )
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    font-family: $noi;
}

.line {
    display: inline-block;

    .root:not(.root--display-word) &::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 5rem;
    }
}

.word {
    display: inline-block;

    &::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 5rem;
    }
}

.letter {
    position: relative;
    display: inline-block;
    transition-delay: calc(100ms * var(--index-letter-total, 1));
    transition-duration: 0.8s;
    transition-property: transform, opacity, font-variation-settings;
    transition-timing-function: ease(out-quart);

    .root:not(.root--enable) & {
        display: inline;
    }

    &--last::after {
        position: relative;
        display: inline-block;
        content: '\00a0';
        font-size: 5rem;
    }

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
