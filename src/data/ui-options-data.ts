import USER_THEMES from '~/constants/ui-themes'
import { slugify } from '~/utils/utils'
import TAG_LABELS from '~/data/filters'

const colorsThemeData = USER_THEMES.map((theme, index) => {
    const keyValues = Object.entries(theme)
        .map((entry) => entry.join(',').replace(',', ':'))
        .toString()
    return { name: `Theme ${index + 1}`, value: keyValues }
})

const FILTER_OPTIONS = TAG_LABELS.map((label: string) => {
    return { name: label, value: slugify(label) }
})

const UI_PARAMETERS: ParameterSection[] = [
    {
        title: 'Interface',
        displayHeaderButton: true,
        parameters: [
            {
                title: 'color mode',
                children: [
                    {
                        type: 'color',
                        name: 'color-main',
                        value: '#DBE6EC',
                    },
                    {
                        type: 'color',
                        name: 'color-bg',
                        value: '#131212',
                    },
                    {
                        type: 'color',
                        name: 'color-accent',
                        value: '#E3FD41',
                    },
                    {
                        name: 'theme-color',
                        type: 'select',
                        options: [{ name: 'Theme', value: 'default' }, ...colorsThemeData],
                    },
                ],
            },
            {
                title: 'grid size',
                children: [
                    {
                        type: 'slider',
                        name: 'grid-size',
                        value: '250',
                        min: '180',
                        max: '800',
                    },
                ],
            },
        ],
    },
    {
        title: 'Project filters',
        displayHeaderButton: true,
        parameters: [
            {
                title: null,
                children: [
                    {
                        type: 'select',
                        options: [{ name: 'Trier par thématique', value: '' }, ...FILTER_OPTIONS],
                        name: 'tags',
                        value: '',
                    },
                    {
                        type: 'button',
                        label: 'Random',
                        name: 'randomize',
                    },
                    {
                        type: 'button',
                        label: 'Best',
                        name: 'best',
                    },
                ],
            },
        ],
    },
]

export default UI_PARAMETERS
