// STRAPI //
interface StrapiWebResponses {
    data: StrapiDataBaseResponse[] | null
    meta: StrapiMeta
}

interface StrapiWebResponse {
    data: StrapiDataBaseResponse | null
    meta: StrapiMeta
}

interface StrapiDataBaseResponse {
    id: number
    attributes: StrapiProjectAttributes | StrapiAboutAttributes
}

interface StrapiMeta {
    meta: StrapiMetaPagination
}

interface StrapiMetaPagination {
    pagination: StrapiMetaPaginationContent
}

interface StrapiMetaPaginationContent {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

interface StrapiBlockCreated {
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
}
// END STRAPI //

interface NodeType {
    '@type': string
}

interface PageData extends NodeType {
    title: string
    metaDescription?: string
    thumbnail?: ImageObject
}

// IMAGE //
interface ImageData {
    name: string
    hash: string
    ext: string
    mime: string
    path: null
    width: number
    height: number
    size: number
    url: string
}

interface ImageFormats {
    thumbnail: ImageData
    small: ImageData
    medium: ImageData
    large: ImageData
}

interface ImageAttributes {
    id?: number
    name: string
    alternativeText: string
    caption: string
    width: number | null
    height: number | null
    formats: ImageFormats | null
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null
    provider: string
    provider_metadata: null
    createdAt: string
    updatedAt: string
}

interface ImageDataContent {
    attributes: ImageAttributes
}

interface ImageObject {
    data: ImageDataContent
}

interface Image {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: ImageFormats | null
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null
    provider: string
    provider_metadata: null
    createdAt: string
    updatedAt: string
}

// END IMAGE //

// PROJECT //
interface StrapiProjectAttributes extends StrapiBlockCreated, PageData {
    description: string | null
    isNew: boolean
    date: string | null
    thumbnail: ImageObject
    tags: any // define type
    medias: ImageObject[]
    link: any // define type
}

interface StrapiAboutAttributes extends StrapiBlockCreated, PageData {
    description: RichText
    socials?: Socials[]
    sections?: AboutSection[]
}

interface UserUiContent {}

// RICH TEXT //
interface RichText {
    time: number
    blocks: BlockContent[]
    version: string
}

interface BlockContent {
    id: string
    type: string
    data: BlockContentData
}
interface BlockContentData {
    text: string
}
