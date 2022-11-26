import USER_THEMES from '~/constants/color-theme'
import { slugify } from '~/utils/functions'
import TAG_LABELS from '~/data/filters'
import Colors from '~/constants/colors'

const colorsThemeData = USER_THEMES.map((theme, index) => {
    const keyValues = Object.entries(theme)
        .map((entry) => entry.join(',').replace(',', ':'))
        .toString()
    return { name: `Theme ${index + 1}`, value: keyValues }
})

const checkBoxesTag = TAG_LABELS.map((label: string) => {
    return { name: 'tag-' + slugify(label), label, type: 'checkbox' as InputType, checked: false, icon: 'validate' }
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
                        name: 'color-main',
                        label: 'Main',
                        type: 'color',
                        value: '#DBE6EC',
                    },
                    {
                        name: 'color-bg',
                        label: 'Background',
                        type: 'color',
                        value: '#131212',
                    },
                    {
                        name: 'color-accent',
                        label: 'Accent',
                        type: 'color',
                        value: '#E3FD41',
                    },
                    {
                        name: 'theme-color',
                        label: 'Theme',
                        type: 'select',
                        options: [...colorsThemeData],
                    },
                ],
            },
            {
                title: 'grid size',
                children: [
                    {
                        name: 'grid-size',
                        type: 'slider',
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
                title: 'Trier par',
                children: [
                    {
                        name: 'date',
                        type: 'button',
                        label: 'date',
                        value: '',
                        icon: 'date',
                    },
                    {
                        name: 'randomize',
                        type: 'button',
                        label: 'Random',
                        value: '',
                        icon: 'shuffle',
                    },
                    {
                        name: 'promote',
                        type: 'toggle',
                        label: 'Best',
                        value: '',
                        icon: 'heart',
                    },
                ],
            },
            {
                title: 'Filtrer par',
                children: [...checkBoxesTag],
            },
        ],
    },
]

export const DEFAULT_STYLE: UserUiStyle = {
    colorMain: Colors.MAIN,
    colorBg: Colors.BG,
    colorAccent: Colors.ACCENT,
    sizeCard: '300px',
    randomize: false,
    promote: false,
    tags: null,
}

export default UI_PARAMETERS
