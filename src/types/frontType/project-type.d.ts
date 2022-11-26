// PROJECT //
interface StrapiProjectResponse extends StrapiBlockCreated, PageData {
    description: string | null
    new: boolean
    date: string | null
    thumbnail: ImageObject
    tags: TagResponse[] | null
    medias: ImageObject
    links: Link[]
}

interface ProjectContent extends NodeType {
    id: number
    slug: string
    title: string
    date: string | null
    metaDescription?: string
    description: string | null
    isNew?: boolean
    promoted?: boolean
    thumbnail: ImageAttributes
    medias?: ImageAttributes[]
    tags: Tag[] | null
    links: Link[] | null
}

interface TagResponse {
    id: number
    name: string
}

interface Tag {
    id: number
    name: string
    slug: string
}

interface Link {
    id: number
    label: string | null
    url: string
}
