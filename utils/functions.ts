interface urlParserContent {
  slug: string | null
  name: string | null
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

export interface imageSize {
  width?: number | null
  height?: number | null
}

export const getMeta = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}

export const nameIfy = (text: string | null | undefined): string => {
  return text?.replace(/[-_.'"]/g, ' ') || 'text undefined'
}

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

export const getFileNameByUrl = (url: string): urlParserContent => {
  const contentAfterLastSlash = url && url.substring(url.lastIndexOf('/') + 1, url.indexOf('?'))
  const name = contentAfterLastSlash?.substring(0, contentAfterLastSlash.lastIndexOf('.'))?.replace(/[-_.]/g, ' ')
  return {
    slug: contentAfterLastSlash,
    name,
  }
}

export async function getWebResponseResult(url: string | URL, id: string): Promise<any> {
  return await fetch(url + id).then((response) => {
    return response
      .json()
      .then((data) => {
        return data
      })
      .catch((err) => {
        console.log('error when fetch webResponse', err)
      })
  })
}
