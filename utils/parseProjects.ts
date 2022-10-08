import { slugify } from '~/utils/utils'

export interface ProjectContent {
    title: string
    slug: string
    description: string
    isNew?: boolean
    thumbnail: ImageAttributes
    medias?: ImageAttributes[]
}

export default function parseProjects(response: undefined | StrapiWebResponse): ProjectContent[] | undefined {
    return response?.data?.map((response: StrapiDataBaseResponse) => {
        const attributes = response.attributes as ProjectResponse
        return {
            id: response.id,
            slug: slugify(attributes.title),
            title: attributes.title,
            description: attributes.description,
            thumbnail: attributes.thumbnail.data.attributes,
        }
    })
}
