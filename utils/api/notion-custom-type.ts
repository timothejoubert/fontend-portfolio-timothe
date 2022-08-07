import { MultiSelectProperty } from '@notionhq/client/build/src/api-types'
import {
  NotionDateProperty,
  NotionFilesContent,
  NotionLinkContent,
  NotionPropertiesTitle,
  NotionRichText,
  NotionRichTextContent,
  NotionSelectContent,
  NotionMultiSelectProperty,
  NotionNumberContent,
} from '~/utils/api/notion-block-type'
import { PageData } from '~/types/api-type'
import { MediaContent, SelectContentParsed } from '~/utils/block-parser'

// CUSTOM DATABASE TYPE
export type PropertiesPage =
  | 'nom'
  | 'type'
  | 'description courte'
  | 'année'
  | 'thumbnail'
  | 'lien externe'
  | 'description google'

// RESPONSE DATA
export interface NotionResponseProjectProperties {
  Nom: NotionPropertiesTitle | null
  type?: NotionMultiSelectProperty | null
  'description courte'?: NotionRichText | null
  année?: NotionNumberContent | null
  thumbnail?: NotionFilesContent | null
  'lien externe'?: NotionLinkContent | null
  'description google'?: NotionRichTextContent | null
  ordre?: NotionNumberContent | null
}

export interface NotionResponseAboutProperties {
  Titre: NotionRichText | null
  'Contenu description': NotionRichText | null
  Experiences: NotionMultiSelectProperty | null
  Réseaux: NotionRichText | null
  Compétences: NotionMultiSelectProperty | null
  'Icon modal': NotionFilesContent | null
  CV: NotionFilesContent | null
  Selecteur: NotionMultiSelectProperty | null
}

// PARSED DATA
export interface ProjectData extends PageData {
  slug: string
  thumbnail?: MediaContent[] | null
  date?: number | null
  shortDescription?: NotionRichText | null
  type?: SelectContentParsed | null
  externalLink?: string | null
  googleDesc?: NotionRichText | null
  order?: number | null
  imageList: MediaContent[] | null
}

export interface AboutData {
  title?: string | null
  description?: NotionRichText | null
  experiences?: SelectContentParsed | null
  socials?: NotionRichText | null
  skills?: SelectContentParsed | null
  modalIcon?: NotionFilesContent | null
  resume?: NotionFilesContent | null
  selecteur?: SelectContentParsed | null
}

export interface LoadingImage {
  media?: NotionFilesContent | NotionFilesContent[] | null
}
