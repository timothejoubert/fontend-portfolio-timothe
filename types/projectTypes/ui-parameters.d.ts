interface ParameterSection {
    title: string
    displayHeaderButton?: boolean
    parameters: ParameterContent[]
}

interface ParameterContent {
    title: string | null
    children?: InputParameter[]
}

interface InputParameter extends ButtonParameter, RangeParameter, SelectParameter {
    type: InputType
    name: string
    value?: string
}

interface SelectOption {
    name: string
    value: string
}

interface ButtonParameter {
    label?: string
}

interface SelectParameter {
    options?: SelectOption[]
}

interface RangeParameter {
    min?: string
    max?: string
}

type InputType = 'color' | 'range' | 'checkbox' | 'number' | 'radio' | 'reset' | 'text' | 'url' | 'select' | 'slider' | 'button' | 'toggle'
