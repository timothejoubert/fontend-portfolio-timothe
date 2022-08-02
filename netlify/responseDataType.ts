

// COMMONS

export interface NotionParentPage {
  type?: string | null
  databaseId?: string | null
}

export interface NotionPageTitle {
  id?: string | null
  type?: string | null
  title?: NotionRichText[] | null
}

export interface PropertiesIdentity {
  id: string | null
  type: string | null
}

// NOTION TYPE
export interface NotionDateProperty {
  start?: string | null
  end?: string | null
  timeZone?: any | null
}

export interface NotionFormulaContent {
  color: string | null
  id: string | null
  name: string | null
}
export interface NotionSelectContent {
  color: string | null
  id: string | null
  name: string | null
}

export interface NotionMediaContent extends PropertiesIdentity{
  url: string | null
  expiry_time?: string | null
}

export interface NotionLinkContent extends PropertiesIdentity{
  url: string | null
}

export interface NotionCheckboxContent extends PropertiesIdentity{
  checkbox: boolean | null
}


export interface NotionFileContent extends PropertiesIdentity{
  name: string | null
  type: string | null
  file: NotionMediaContent | null
}

export interface NotionFilesContent extends PropertiesIdentity {
  files?: NotionFileContent[] | null
}

export interface NotionPlainText extends PropertiesIdentity{
  rich_text: NotionRichText[]
}

export interface NotionRichText {
  type: string | null
  text: NotionTextContent | null
  annotations: NotionAnnotation
  plain_text: string | null
  href: string | null
}

export interface NotionTextContent {
  content: string | null
  link: string | null
}

export interface NotionAnnotation {
  bold: boolean | null
  code: boolean | null
  color: string | null
  italic: boolean | null
  strikethrough: boolean | null
  underline: boolean | null
}

// CUSTOM DATABASE TYPE

export type PropertiesPage = "nom" | "type" | "description courte" | "année" | "thumbnail" | "lien externe" | "description google"

export interface NotionPageProperties {
  Nom?: NotionPageTitle | null
  type?: NotionSelectContent[] | null
  "description courte"?: NotionPlainText | null
  "année"?: PropertiesIdentity | null
  thumbnail?: NotionFilesContent | null
  "lien externe"?: NotionLinkContent | null
  "description google"?: NotionRichText | null
}

export interface NotionDatabaseContent {
  date?: NotionDateProperty | null
  object?: string | null
  id?: string | null
  createdTime?: string | null
  cover?: any | null
  icon?: any | null
  parent?: NotionParentPage | null
  properties?: NotionPageProperties | null
  url?: string | null
}


