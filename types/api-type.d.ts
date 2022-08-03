import {
  NotionDateProperty, NotionPageTitle,
  NotionParentPage,
} from "~/utils/api/notion-block-type";
import {NotionResponseProjectProperties} from "~/utils/api/notion-custom-type";

export interface PageData {
  id: string
  name?: NotionPageTitle | string | null
  url: string
}

export interface DataBaseResponse {
  has_more: boolean
  next_cursor: null
  object: string
  results: NotionDatabaseContent[]
}

export interface NotionDatabaseContent {
  date?: NotionDateProperty | null
  object?: string | null
  id?: string | null
  createdTime?: string | null
  cover?: any | null
  icon?: any | null
  parent?: NotionParentPage | null
  properties?: NotionResponseProjectProperties | null
  url?: string | null
}

