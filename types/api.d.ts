// STRAPI //
interface StrapiWebResponse {
    data: StrapiDataBaseResponse[] | null
    meta: StrapiMeta
}

interface StrapiDataBaseResponse {
    id: number
    attributes: ProjectContent | AboutContent
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
    createdAt: string
    updatedAt: string
    publishedAt: string
}
// END STRAPI //

// PROJECT //
interface ProjectResponse extends StrapiBlockCreated {
    title: string
    description: string
    isNew: boolean
    thumbnail: ImageObject
}

interface AboutContent {
    title?: string
}

interface UserUiContent {

}

// END PROJECT //

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
    id: number
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: ImageFormats
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
    formats: ImageFormats
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
