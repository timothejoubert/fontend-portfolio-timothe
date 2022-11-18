import VLink from '~/components/atoms/VLink.vue'
import IconClose from '~/assets/images/icons/cross.svg?sprite'
import IconArrow from '~/assets/images/icons/arrow.svg?sprite'
import VImage from '~/components/atoms/VImage'

export default {
    title: 'Molecules/Linl',
    component: { VLink, IconArrow, IconClose, VImage },
    args: {
        label: 'label',
    },
}

const Template = (_args, { argTypes }) => {
    return {
        props: Object.keys(argTypes),
        template: `
            <v-link v-bind="$props"/>
        `,
    }
}

export const Label = Template.bind({})
Label.args = {
    label: 'un simple label',
}

export const ExternalLink = Template.bind({})
ExternalLink.args = {
    label: 'un simple label',
    href: 'https://google.com',
}

export const InternalLink = Template.bind({})
InternalLink.args = {
    label: 'un simple label',
    href: '/project',
}

const TemplateSlot = (_args, { argTypes }) => {
    return {
        props: Object.keys(argTypes),
        template: `
            <v-link v-bind="$props">{{template}}</v-link>
        `,
    }
}

export const TemplateLabel = TemplateSlot.bind({})
TemplateLabel.args = {
    template: 'Un text brute dans le VLink',
}

const TemplateImage = (_args, { argTypes }) => {
    return {
        props: Object.keys(argTypes),
        template: `
            <v-link v-bind="$props">
              <v-image :strapiImage="image" />
            </v-link>
        `,
    }
}

export const Image = TemplateImage.bind({})
Image.args = {
    href: 'https://google.com',
    image: {
        name: 'fontimate-01-thumbnail.png',
        alternativeText: 'fontimate-01-thumbnail.png',
        caption: 'fontimate-01-thumbnail.png',
        width: 1212,
        height: 1282,
        formats: null,
        hash: 'fontimate_01_thumbnail_25237b69af',
        ext: '.png',
        mime: 'image/png',
        size: 55.83,
        url: '/uploads/fontimate_01_thumbnail_25237b69af.png',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        createdAt: '2022-10-05T21:12:23.019Z',
        updatedAt: '2022-10-05T21:12:23.019Z',
    },
}
