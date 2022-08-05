// COMMONS
export interface NotionParentPage {
  type?: string | null
  databaseId?: string | null
}

export interface PropertiesIdentity {
  id: string | null
  type: string | null
}

// NOTION TYPE
export interface NotionPropertiesTitle {
  id?: string | null
  type?: string | null
  title?: NotionRichText[] | null
}

export interface NotionDateProperty {
  start?: string | null
  end?: string | null
  timeZone?: any | null
}

export interface optionContent extends PropertiesIdentity {
  color: string | null
  id: string | null
  name: string | null
}

export interface NotionMultiSelectProperty extends PropertiesIdentity {
  type: string
  multi_select: optionContent[]
}

export interface NotionSelectProperty extends PropertiesIdentity {
  type: string
  select: optionContent
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

export interface NotionMediaContent extends PropertiesIdentity {
  url: string | null
  expiry_time?: string | null
}

export interface NotionLinkContent extends PropertiesIdentity {
  url: string | null
}

export interface NotionCheckboxContent extends PropertiesIdentity {
  checkbox: boolean | null
}

export interface NotionFileContent extends PropertiesIdentity {
  name: string | null
  type: string | null
  file: NotionMediaContent | null
}

export interface NotionFileObjectContent extends PropertiesIdentity {
  caption: any[]
  file: NotionMediaContent
  type: string | null
}

export interface NotionFilesContent extends PropertiesIdentity {
  files?: NotionFileContent[] | null
}

export interface NotionNumberContent extends PropertiesIdentity {
  number: Number
}
export interface NotionPlainText extends PropertiesIdentity {
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
