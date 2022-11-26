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
    attributes: StrapiProjectResponse | StrapiAboutResponse
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
interface ImageObject {
    data: ImageDataContent | ImageDataContent[]
}

interface ImageDataContent {
    id: number
    attributes: ImageAttributes
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
    provider_metadata: ProviderMetaData | null
    createdAt: string
    updatedAt: string
}

type ImageFormatName = 'thumbnail' | 'small' | 'medium' | 'large'

interface ImageFormats {
    // [key: string]: ImageData
    thumbnail?: ImageData
    small?: ImageData
    medium?: ImageData
    large?: ImageData
}

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

interface ProviderMetaData {
    public_id: string
    resource_type: string
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
