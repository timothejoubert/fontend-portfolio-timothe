import VSplitWord from '~/components/atoms/VSplitWord.vue'

export default {
    title: 'Utils/SplitWord',
    component: VSplitWord,
    args: {
        enabled: true,
        content: 'Timothé',
        defaultHidden: false,
        transitionEndEvent: false,
    },
}

const Template = (_args, { argTypes }) => {
    return {
        props: Object.keys(argTypes),
        template: `
            <v-split-word v-bind="$props" class="text-h2"/>
        `,
    }
}

export const Default = Template.bind({})
Default.args = {
    content: 'Ceci est un test',
}

export const SplitLetter = Template.bind({})
SplitLetter.args = {
    content: 'Ceci est un test',
    split: ['letter'],
}

export const SplitWord = Template.bind({})
SplitWord.args = {
    content: 'Ceci est un test',
    split: ['word'],
}

export const SplitLine = Template.bind({})
SplitLine.args = {
    content: 'Voici un texte qui est placé dans des lignes différentes de 2 mots.',
    split: ['line'],
}

export const SplitLineEach4Words = Template.bind({})
SplitLineEach4Words.args = {
    content: 'Voici un texte qui est placé dans des lignes différentes de 2 mots.',
    split: ['line'],
    numberOfWordInLine: 4,
}

export const SplitAll = Template.bind({})
SplitAll.args = {
    content: 'Voici un texte qui est placé dans des lignes différentes de 2 mots.',
    split: ['word', 'letter', 'line'],
    numberOfWordInLine: 4,
}

export const LineAndLetter = Template.bind({})
LineAndLetter.args = {
    content: 'Voici un texte qui est placé dans des lignes différentes de 2 mots.',
    split: ['letter', 'line'],
    numberOfWordInLine: 4,
}

export const Disabled = Template.bind({})
Disabled.args = {
    enabled: false,
}

const SlotTemplate = (_args, { argTypes }) => {
    return {
        props: Object.keys(argTypes),
        computed: {
            body() {
                return this.content || ''
            },
        },
        template: `
            <v-split-word v-bind="$props">{{ body }}</v-split-word>
        `,
    }
}

export const SlotContent = SlotTemplate.bind({})
SlotContent.args = {
    content: 'Ceci est un test',
}
