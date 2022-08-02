import {
  NotionDatabaseContent,
  NotionFileContent, NotionFilesContent,
  NotionPageProperties,
  NotionPageTitle,
  NotionRichText
} from "~/netlify/responseDataType";
// @ts-ignore
import {DataBaseResponse, ProjectData} from "~/types/api-type.d.ts";
import {MediaContent} from "~/components/molecules/VCardProject.vue";

export const parseProjectData = (inputArray: DataBaseResponse): ProjectData[] | undefined => {
  return inputArray?.results?.map((page: NotionDatabaseContent) => {
    const properties = page.properties || {}
    return {
      id: page?.id,
      url: page?.url ?? '/',
      creationDate: page?.date ?? 'no date',
      name: properties?.["Nom"] ? parseRichTitle(properties["Nom"]) : 'unknow name',
      type: properties?.["type"],
      shortDescription: properties?.["description courte"],
      date: properties?.["année"],
      thumbnail: properties?.["thumbnail"] ? parseMedia(properties["thumbnail"] as NotionFilesContent) : null,
      externalLink: properties?.["lien externe"],
      googleDesc: properties?.["description google"],
    }
  })
}

export const parseRichTitle = (richBlock : NotionPageTitle): string | undefined | null => {
  if(!richBlock?.title && !Array.isArray(richBlock.title)) return
  return richBlock.title.length > 1 ? richBlock?.title?.map(text => text?.plain_text).join('') : richBlock?.title?.[0]?.plain_text
}

export const parseMedia = (mediaBlock: NotionFilesContent): MediaContent[] | undefined  => {
  if ( !mediaBlock || !mediaBlock?.files?.length) return
  return mediaBlock.files.map(media => {
    const removeExtension = media.name?.replace(/-/g, ' ').replace(/\.[^.]*$/,'')
    return {
      url: media?.file?.url,
      name: removeExtension,
      alt: media.name
    }
  })
}

export const parseSelect = (element : any) => {
  console.log(element)
  return element
}

export const clamp = (number: number, min: number, max: number): number => {
  return Math.max(min, Math.min(number, max));
}
export const mapRange = (value: number, a: number, b: number, c: number, d: number): number => {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}
export const lerp = (a: number, b: number, n: number): number => {
  return (1 - n) * a + n * b;
}
