export const slugify = (text: string | null | undefined): string => {
    return text
        ? text
              .toString() // Cast to string (optional)
              .normalize('NFD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
              .replace(/[\u0300-\u036F]/g, '')
              .toLowerCase() // Convert the string to lowercase letters
              .trim() // Remove whitespace from both sides of a string (optional)
              .replace(/\s+/g, '-') // Replace spaces with -
        : 'no name found'
    // .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    // .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

export const clamp = (number: number, min: number, max: number): number => {
    return Math.max(min, Math.min(number, max))
}

export const mapRange = (value: number, a: number, b: number, c: number, d: number): number => {
    value = (value - a) / (b - a)
    return c + value * (d - c)
}
export const lerp = (a: number, b: number, n: number): number => {
    return (1 - n) * a + n * b
}

export const getRandomFloat = (min: number, max: number, decimals: number) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals)

    return parseFloat(str)
}
export const nameIfy = (text: string | null | undefined): string => {
    return text?.replace(/[-_.'"]/g, ' ') || 'text undefined'
}

export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getCssProp = (propName: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(propName)
}

export const setCssProp = (propName: string, value: string) => {
    return document.documentElement.style.setProperty(propName, value)
}

export const removeCssProp = (propName: string) => {
    return document.documentElement.style.setProperty(propName, null)
}
