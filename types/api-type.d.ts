import {
  NotionBlockParentPage,
  NotionDateProperty,
  NotionParentPage,
  NotionPropertiesTitle,
  NotionRichText,
} from '~/utils/api/notion-block-type'
import {
  NotionResponseAboutProperties,
  NotionResponseProjectProperties,
} from '~/utils/api/notion-custom-type'

export interface PageData {
  id: string
  name: NotionPropertiesTitle | string | null
  url: string
}

export interface DataBaseResponse {
  has_more: boolean
  next_cursor: null
  object: string
  results: NotionDatabaseContent[]
}

export interface pageBlockResponse {
  has_more: boolean
  next_cursor: null
  object: string
  results: NotionBlockObject[]
}

export interface NotionDatabaseContent {
  date?: NotionDateProperty | null
  object?: string | null
  id: string
  createdTime?: string | null
  cover?: any | null
  icon?: any | null
  parent?: NotionParentPage | null
  properties?:
    | NotionResponseProjectProperties
    | NotionResponseAboutProperties
    | null
  url: string
  archived: boolean
  description?: NotionRichText | null
}

export interface NotionBlockObject {
  object: string
  id: string
  parent: NotionBlockParentPage
  created_time: string
  last_edited_time: string
  created_by: NotionUser
  last_edited_by: NotionUser
  has_children: boolean
  archived: boolean
  type: string
  [key: string]: any
}

export interface NotionUser {
  object: string
  id: string
}

export interface NotionParentPage {
  type: string
  page_id: string
}
