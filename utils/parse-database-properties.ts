import {DataBaseResponse, NotionDatabaseContent} from '~/types/api-type'
import { uid } from '~/utils/random-id'
import {
  AboutData,
  NotionResponseAboutProperties,
  NotionResponseProjectProperties,
  ProjectData
} from "~/utils/api/notion-custom-type";
import {parseMedia, parseRichTitle, parseSelect, parseTitle} from "~/utils/block-parser";
import {NotionFilesContent, NotionPlainText} from "~/utils/api/notion-block-type";
import {MultiSelectProperty} from "@notionhq/client/build/src/api-types";


export const parseProjectData = (dataBaseResponse : DataBaseResponse): ProjectData[] => {
  const dataBaseContent: NotionDatabaseContent[] = dataBaseResponse.results

  return dataBaseContent.map((page) => {
    const properties = page.properties as NotionResponseProjectProperties
    return {
      id: page.id || uid.toString(),
      url: page.url || '/',
      creationDate: page?.date,
      name: properties?.["Nom"],
      type: properties?.["type"],
      shortDescription: properties?.["description courte"],
      date: properties?.["année"],
      thumbnail: properties?.["thumbnail"],
      externalLink: properties?.["lien externe"],
      googleDesc: properties?.["description google"],
    }
  })
}

export const parseAboutData = (dataBaseResponse : DataBaseResponse): AboutData => {
  const dataBaseContent: NotionDatabaseContent[] = dataBaseResponse?.results

  const properties = dataBaseContent?.[0]?.properties as NotionResponseAboutProperties
  console.log(dataBaseContent, properties)
  return {
    title: properties?.["Titre"] && parseTitle(properties["Titre"]),
    description: properties?.["Contenu description"],
    experiences: properties?.["Experiences"] && parseSelect(properties["Experiences"], 'Experiences'),
    socials: properties?.["Réseaux"],
    skills: properties?.["Compétences"] && parseSelect(properties["Compétences"], 'Compétences'),
    modalIcon: properties?.["Icon modal"],
    resume: properties?.["CV"],
    selecteur: properties?.["Selecteur"] && parseSelect(properties?.["Selecteur"], 'Selecteur'),
  }
}
