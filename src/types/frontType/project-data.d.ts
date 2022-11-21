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
    tags?: Tag[]
    links: Link[] | null
}

interface Tag {
    name: string
    slug: string
}

interface Link {
    id: number
    label: string | null
    url: string
}
