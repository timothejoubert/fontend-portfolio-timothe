import {NotionDatabaseContent, NotionDateProperty, NotionSelectContent} from "~/netlify/responseDataType";
import {MediaContent} from "~/components/molecules/VCardProject.vue";

export interface PageData {
  id: string
  name?: string | null
  url: string
}

export interface ProjectData extends PageData {
  name?: string | null
  thumbnail?: MediaContent[] | null
  date?: string | number | null
  cadre?: NotionSelectContent[] | null
  shortDescription?: string | null
  type?: string[] | null
}

/*export interface ProjectData {
  id?: string | null
  name?: string | null
  url?: string | null
  cover?: string | null
  date?: NotionDateProperty | null | string
  annee?: string | number | null
  techno?: NotionSelectContent[] | null
  cadre?: NotionSelectContent[] | null
  media?: string[] | null
  github?: string | null
  domaines?: NotionSelectContent[] | null
  focus?: boolean | null
  externalLien?: string | null
  thumbnail?: string | null
}*/

export interface DataBaseResponse {
  has_more: boolean
  next_cursor: null
  object: string
  results: NotionDatabaseContent[] | null
}
