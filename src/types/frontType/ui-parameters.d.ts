interface UserUiStyle {
    colorMain: string
    colorBg: string
    colorAccent: string
    sizeCard: string
    randomize: boolean
    promote: boolean
    tags: string | null
}

interface ParameterSection {
    title: string
    displayHeaderButton?: boolean
    parameters: ParameterContent[]
}

interface ParameterContent {
    title: string | null
    children?: InputParameter[]
}

interface InputParameter extends RangeParameter, SelectParameter {
    type: InputType
    name: OptionsName
    value?: string | boolean
    label?: string
}

interface SelectOption {
    name: string
    value: string
}

interface SelectParameter {
    options?: SelectOption[]
}

interface RangeParameter {
    min?: string
    max?: string
    step?: string
}

type OptionsName =
    | 'color-main'
    | 'color-bg'
    | 'color-accent'
    | 'theme-color'
    | 'grid-size'
    | 'tags'
    | 'randomize'
    | 'promote'

type InputType =
    | 'color'
    | 'email'
    | 'range'
    | 'checkbox'
    | 'number'
    | 'radio'
    | 'reset'
    | 'text'
    | 'url'
    | 'select'
    | 'slider'
    | 'button'
    | 'toggle'
    | 'input'
    | 'textarea'
