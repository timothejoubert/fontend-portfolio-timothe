

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
export interface NotionDateProperty {
  start?: string | null
  end?: string | null
  timeZone?: any
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

export interface NotionFilesContent extends PropertiesIdentity{
  files: NotionFileContent[] | null
}

export interface NotionTitleContent {
  type: string | null
  text: NotionTextContent | null
  annotations: NotionAnnotation
  plainText: string | null
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

export interface AnneeProperty extends PropertiesIdentity {
  formula: NotionFormulaContent | null
}

export interface TechnologyProperty extends PropertiesIdentity {
  multi_select: NotionSelectContent[] | null
}

export interface NameProperty extends PropertiesIdentity {
  title: NotionTitleContent[] | null
}

export interface CadreProperty extends PropertiesIdentity {
  select: NotionSelectContent[] | null
}

export interface DomaineProperty extends PropertiesIdentity {
  multi_select: NotionSelectContent[]
}


export interface NotionPageProperties {
  date?: PropertiesIdentity | null
  Année?: AnneeProperty | null
  Techno?: TechnologyProperty | null
  Cadre?: CadreProperty | null
  Média?: NotionMediaContent | NotionMediaContent[] | null
  Github?: NotionLinkContent | null
  Domaines?: DomaineProperty | null
  '🔥'?: NotionCheckboxContent | null
  Lien?: NotionLinkContent | null
  Name?: NameProperty | null
  Thumbnail?: NotionFilesContent | null
}

export interface NotionDatabaseContent {
  date: NotionDateProperty | null
  object?: string | null
  id?: string | null
  createdTime?: string | null
  cover?: any
  icon?: any
  parent: NotionParentPage | null
  properties: NotionPageProperties | null
  url?: string | null
}


