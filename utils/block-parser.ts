import {
  NotionFilesContent,
  NotionMultiSelectProperty,
  NotionPropertiesTitle,
  NotionRichText, NotionSelectProperty
} from "~/utils/api/notion-block-type";
import {MultiSelectProperty, SelectProperty} from "@notionhq/client/build/src/api-types";

export interface MediaContent {
  url?: string | null
  alt?: string | null
  name?: string | null
}

export interface SelectOptionParsed {
  id: string | null
  name?: string | null
  color: string | null
}

export interface SelectContentParsed {
  keyName: string
  options: SelectOptionParsed[] | null
}

export const parseTitle = (richBlock: NotionPropertiesTitle): string | null | undefined => {
  const title = (richBlock as NotionPropertiesTitle)?.title as NotionRichText[]
  if(!richBlock && !title && !Array.isArray(title)) return null
  return title.length > 1 ? richBlock?.title?.map(text => text?.plain_text).join('') : title?.[0]?.plain_text
}

export const parseMedia = (mediaBlock: NotionFilesContent): MediaContent[] | null | undefined  => {
  if ( !mediaBlock || !mediaBlock?.files?.length) return null
  return mediaBlock.files.map(media => {
    const removeExtension = media.name?.replace(/-/g, ' ').replace(/\.[^.]*$/,'')
    return {
      url: media?.file?.url,
      name: removeExtension,
      alt: media.name
    }
  })
}

export const parseSelect = (block: NotionMultiSelectProperty | NotionSelectProperty, keyName: string): SelectContentParsed => {
  if(block.type === 'select'){
    const {name, id, color} = (block as NotionSelectProperty).select || {}
    return {keyName: keyName, options: [{name, id, color}]}
  } else {
    const multiOptions = (block as NotionMultiSelectProperty).multi_select.map((option) => {
      if (option?.name) return {name: option.name, id: option.id, color: option.color}
    }) as SelectOptionParsed[]
    return {keyName: keyName, options: multiOptions}
  }
}
