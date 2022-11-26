import { slugify } from '~/utils/functions'

function parseProjects(response: undefined | StrapiWebResponses): ProjectContent[] | undefined {
    const result = response?.data

    if (!result) return
    return result.map((response: StrapiDataBaseResponse) => {
        const attributes = (response.attributes as StrapiProjectResponse) || {}

        const tags = attributes?.tags?.map((tag: TagResponse) => {
            return { ...tag, slug: slugify(tag.name) }
        })

        return {
            '@type': 'project',
            id: response.id,
            slug: slugify(attributes.title),
            title: attributes.title,
            date: attributes?.date || null,
            tags: tags || null,
            metaDescription: attributes.metaDescription,
            description: attributes.description,
            promoted: attributes.new,
            thumbnail: (attributes.thumbnail.data as ImageDataContent).attributes,
            medias: (attributes.medias.data as ImageDataContent[])?.map((imageData) => imageData.attributes) || [],
            links: attributes.links || null,
        }
    })
}

function parseAbout(response: undefined | StrapiWebResponse): AboutBlock | undefined {
    const attributes = response?.data?.attributes as StrapiAboutResponse
    if (!attributes) return
    const description = (JSON.parse(attributes.description) as RichText)?.blocks[0].data.text
    return {
        '@type': 'about',
        title: attributes.title,
        description,
        createdAt: attributes.createdAt,
        updatedAt: attributes.updatedAt,
        publishedAt: attributes.publishedAt,
        metaDescription: attributes.metaDescription,
        socials: attributes?.socials || null,
        sections: attributes?.sections || null,
    }
}

export { parseProjects, parseAbout }
