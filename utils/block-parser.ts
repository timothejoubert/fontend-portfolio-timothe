import {
  NotionFilesContent,
  NotionLinkContent,
  NotionMultiSelectProperty,
  NotionNumberContent,
  NotionPropertiesTitle,
  NotionRichTextContent,
  NotionSelectProperty,
} from '~/utils/api/notion-block-type'
import { DataBaseResponse, NotionBlockObject } from '~/types/api-type'
import { getFileNameByUrl, getMeta } from '~/utils/functions'

export interface MediaContent {
  url?: string | null
  alt?: string | null
  name?: string | null
}

export interface SelectOptionParsed {
  id: string | null
  name: string | null
  color: string | null
}

export interface SelectContentParsed {
  keyName: string
  options: SelectOptionParsed[] | null
}

export const parseTitle = (
  richBlock: NotionPropertiesTitle
): string | null | undefined => {
  const title = (richBlock as NotionPropertiesTitle)
    ?.title as NotionRichTextContent[]
  if (!richBlock && !title && !Array.isArray(title)) return null
  return title.length > 1
    ? richBlock?.title?.map((text) => text?.plain_text).join('')
    : title?.[0]?.plain_text
}

export const parseMedia = (
  mediaBlock: NotionFilesContent
): MediaContent[] | null | undefined => {
  if (!mediaBlock || !mediaBlock?.files?.length) return null
  return mediaBlock.files.map((media) => {
    const removeExtension = media.name
      ?.replace(/-/g, ' ')
      .replace(/\.[^.]*$/, '')
    return {
      url: media?.file?.url,
      name: removeExtension,
      alt: media.name,
    }
  })
}

export const parseSelect = (
  block: NotionMultiSelectProperty | NotionSelectProperty | null | undefined,
  keyName: string
): SelectContentParsed => {
  if (!block) return { keyName, options: [] }
  if (block.type === 'select') {
    const { name, id, color } = (block as NotionSelectProperty).select || {}
    return { keyName, options: [{ name, id, color }] }
  } else {
    const multiOptions = (block as NotionMultiSelectProperty).multi_select.map(
      (option) => {
        if (option?.name) {
          return { name: option.name, id: option.id, color: option.color }
        } else {
          return {}
        }
      }
    ) as SelectOptionParsed[]
    return { keyName, options: multiOptions }
  }
}

export const parseNumber = (
  blockNumber: NotionNumberContent | null | undefined
): number | null | undefined => {
  return blockNumber?.number
}

export const parseLink = (
  blockLink: NotionLinkContent | null | undefined
): string | null | undefined => {
  return blockLink?.url
}

export const parseBlockImage = (
  blockResponse: NotionBlockObject[] | null | undefined
): MediaContent[] | null => {
  if (!blockResponse) return null

  const blocks = blockResponse?.filter(
    (block) => block.image && block?.image?.file?.url
  )

  return blocks.map((block) => {
    const url = block?.image?.file?.url
    const mediaName = getFileNameByUrl(url)

    return {
      url,
      alt: mediaName?.slug,
      name: mediaName?.name,
    }
  })
}
