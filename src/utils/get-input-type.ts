export function isColorInput(name: string | undefined): boolean {
    return !!name?.includes('color-')
}

export function isColorThemeSelect(name?: string): boolean {
    return name === 'theme-color'
}

export function isCardSlider(name?: string): boolean {
    return name === 'grid-size'
}

export function isFilterButton(name?: string): boolean {
    return name === 'randomize' || name === 'best' || name === 'promote' || name === 'date'
}

export function isTag(name?: string): boolean {
    return !!name?.includes('tag')
}

export function isTagFilter(name?: string): boolean {
    return name === 'tags'
}

export function isRandomFilter(name?: string): boolean {
    return name === 'randomize'
}

export function isPromoteFilter(name?: string): boolean {
    return name === 'promote'
}

export function isDate(name?: string): boolean {
    return name === 'date'
}
