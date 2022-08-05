import {
  DataBaseResponse,
  NotionBlockObject,
  NotionDatabaseContent,
} from '~/types/api-type'
import { uid } from '~/utils/random-id'
import {
  AboutData,
  LoadingImage,
  NotionResponseAboutProperties,
  NotionResponseProjectProperties,
  ProjectData,
} from '~/utils/api/notion-custom-type'
import { MediaContent, parseSelect, parseTitle } from '~/utils/block-parser'
import { NotionFilesContent } from '~/utils/api/notion-block-type'

export const parseProjectData = (
  dataBaseResponse: DataBaseResponse
): ProjectData[] => {
  const dataBaseContent: NotionDatabaseContent[] = dataBaseResponse.results

  const parsedProject = dataBaseContent.map((page) => {
    const properties = page.properties as NotionResponseProjectProperties
    return {
      id: page.id || uid.toString(),
      url: page.url || '/',
      creationDate: page?.date,
      name: properties?.Nom,
      type: properties?.type,
      shortDescription: properties?.['description courte'],
      date: properties?.['année'],
      thumbnail: properties?.thumbnail,
      externalLink: properties?.['lien externe'],
      googleDesc: properties?.['description google'],
      order: properties?.ordre || 1,
    }
  }) as ProjectData[]

  // @ts-ignore
  return parsedProject.sort(function (a, b) {
    return (
      ((a.order?.number || 1) as number) - ((b.order?.number || 1) as number)
    )
  })
}

export const parseAboutData = (
  dataBaseResponse: DataBaseResponse
): AboutData => {
  const dataBaseContent: NotionDatabaseContent[] = dataBaseResponse?.results

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
  pageBlockResponse: DataBaseResponse
): MediaContent[] => {
  const dataBaseContent = pageBlockResponse.results as NotionBlockObject[]

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
