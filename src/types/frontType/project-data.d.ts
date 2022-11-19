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
    link: Link | null
}

interface Tag {
    name: string
    slug: string
}

interface Link {
    label: string
    url: string
}
