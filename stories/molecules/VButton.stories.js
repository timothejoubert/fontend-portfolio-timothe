import VButton from '~/components/molecules/VButton/VButton.vue'
import IconClose from '~/assets/images/icons/cross.svg?inline'
import IconArrow from '~/assets/images/icons/arrow.svg?inline'

export default {
    title: 'Molecules/Button',
    component: { VButton, IconArrow, IconClose },
    argTypes: {
        theme: {
            type: 'select',
            options: ['dark', 'light'],
        },
        color: {
            type: 'select',
            options: ['primary', 'secondary'],
        },
        size: {
            type: 'select',
            options: ['xs', 'sm', 'md', 'lg'],
        },
        direction: {
            type: 'select',
            options: ['ltr', 'rtl'],
        },
        icon: {
            options: ['IconArrow', 'IconClose'],
            control: {
                type: 'radio',
                labels: { IconArrowRight: 'arrow', IconTicket: 'close' },
            },
        },
    },
    args: {
        label: 'Button',
    },
}

const Template = (_args, { argTypes }) => {
    return {
        props: Object.keys(argTypes).concat(['label']),
        components: { VButton, IconClose, IconArrow },
        template: `
            <v-button v-bind="$props">
                <template #default v-if="label">
                    {{ label }}
                </template>
                <template #icon v-if="icon">
                    <component :is="icon" />
                </template>
            </v-button>
        `,
    }
}

export const Basic = Template.bind({})
Basic.args = {
    filled: true,
    rounded: true,
    icon: 'IconArrow',
    size: 'md',
}
