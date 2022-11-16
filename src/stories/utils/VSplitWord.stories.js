import VSplitWord from '~/src/components/atoms/VSplitWord.vue'

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
            <v-split-word v-bind="$props" />
        `,
    }
}

export const Default = Template.bind({})
Default.args = {
    content: 'Ceci est un test',
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
