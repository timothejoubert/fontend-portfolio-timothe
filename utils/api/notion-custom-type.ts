import {
  NotionDateProperty,
  NotionFilesContent, NotionLinkContent,
  NotionPropertiesTitle,
  NotionPlainText, NotionRichText,
  NotionSelectContent, NotionMultiSelectProperty
} from "~/utils/api/notion-block-type";
import {PageData} from "~/types/api-type";
import {MultiSelectProperty} from "@notionhq/client/build/src/api-types";
import {SelectContentParsed} from "~/utils/block-parser";

// CUSTOM DATABASE TYPE
export type PropertiesPage = "nom" | "type" | "description courte" | "année" | "thumbnail" | "lien externe" | "description google"



// RESPONSE DATA
export interface NotionResponseProjectProperties {
  Nom?: NotionPropertiesTitle | null
  type?: NotionSelectContent[] | null
  "description courte"?: NotionPlainText | null
  "année"?: NotionDateProperty | null
  thumbnail?: NotionFilesContent | null
  "lien externe"?: NotionLinkContent | null
  "description google"?: NotionRichText | null
}

export interface NotionResponseAboutProperties {
  "Titre": NotionPlainText | null
  "Contenu description": NotionRichText | null
  "Experiences": NotionMultiSelectProperty | null
  "Réseaux": NotionPlainText | null
  "Compétences": NotionMultiSelectProperty | null
  "Icon modal": NotionFilesContent | null
  "CV": NotionFilesContent | null
  "Selecteur": NotionMultiSelectProperty | null

}



// PARSED DATA
export interface ProjectData extends PageData {
  thumbnail?: NotionFilesContent | null
  date?: NotionDateProperty | null
  cadre?: NotionSelectContent[] | null
  shortDescription?: NotionPlainText | null
  type?: NotionSelectContent[] | null
  externalLink?: NotionLinkContent | null
  googleDesc?: NotionRichText | null
}

export interface AboutData {
  title?: string | null
  description?: NotionRichText | null
  experiences?: SelectContentParsed | null
  socials?: NotionPlainText | null
  skills?: SelectContentParsed | null
  modalIcon?: NotionFilesContent | null
  resume?: NotionFilesContent | null
  selecteur?: SelectContentParsed | null

}

