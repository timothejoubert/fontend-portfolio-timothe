import {
  DataBaseResponse,
  NotionBlockObject,
  NotionDatabaseContent,
  pageBlockResponse,
} from '~/types/api-type'
import { uid } from '~/utils/random-id'
import {
  AboutData,
  NotionResponseAboutProperties,
  NotionResponseProjectProperties,
  ProjectData,
} from '~/utils/api/notion-custom-type'
import {
  MediaContent,
  parseBlockImage,
  parseLink,
  parseMedia,
  parseNumber,
  parseSelect,
  parseTitle,
} from '~/utils/block-parser'
import { slugify } from '~/utils/functions'

export const parseProjectData = (
  dataBaseResponse: DataBaseResponse,
  projectBlockResponse: pageBlockResponse[]
): ProjectData[] => {
  const dataBaseContent = dataBaseResponse.results as NotionDatabaseContent[]

  const parsedProject = dataBaseContent.map((page) => {
    const properties = page.properties as NotionResponseProjectProperties

    const currentProjectBlocks = projectBlockResponse.find((projectBlock) => {
      const blocks = projectBlock.results?.[0] as NotionBlockObject
      return blocks?.parent?.page_id === page.id
    })

    if (!page) return {}
    return {
      id: page.id || uid.toString(),
      url: page.url ?? '/',
      slug: properties?.Nom && slugify(parseTitle(properties.Nom)),
      name: properties?.Nom && parseTitle(properties.Nom),
      creationDate: page?.date,
      type: parseSelect(properties?.type, 'type'),
      shortDescription: properties?.['description courte'],
      description: properties?.['description longue'],
      date: parseNumber(properties?.['année']),
      thumbnail: properties?.thumbnail && parseMedia(properties.thumbnail)?.[0],
      externalLink: parseLink(properties?.['lien externe']),
      googleDesc: properties?.['description google'],
      order: parseNumber(properties?.ordre) || 1,
      imageList: parseBlockImage(currentProjectBlocks?.results),
    }
  }) as ProjectData[]

  return parsedProject.sort(function (a, b) {
    return ((a.order || 1) as number) - ((b.order || 1) as number)
  })
}

export const parseAboutData = (
  dataBaseResponse: DataBaseResponse
): AboutData => {
  const dataBaseContent = dataBaseResponse?.results as NotionDatabaseContent[]

  const properties = dataBaseContent?.[0]
    ?.properties as NotionResponseAboutProperties
  return {
    title: properties?.Titre && parseTitle(properties.Titre),
    description: properties?.['Contenu description'],
    experiences:
      properties?.Experiences &&
      parseSelect(properties.Experiences, 'Experiences'),
    socials: properties?.['Réseaux'],
    skills:
      properties?.['Compétences'] &&
      parseSelect(properties['Compétences'], 'Compétences'),
    modalIcon: properties?.['Icon modal'],
    resume: properties?.CV,
    selecteur:
      properties?.Selecteur && parseSelect(properties?.Selecteur, 'Selecteur'),
  }
}

export const parseLoadingImage = (
  pageBlockResponse: pageBlockResponse
): MediaContent[] => {
  const dataBaseContent = pageBlockResponse.results as NotionBlockObject[]

  if (!dataBaseContent) return []
  return dataBaseContent
    .filter((block) => block.type === 'image' && !!block.image?.file?.url)
    .map((block, i) => {
      return {
        url: block.image?.file?.url,
        alt: `image-fesse-loading-${i}`,
        name: `image fesse loading ${i}`,
      }
    })
}
