import { slugify } from '~/utils/functions'

function parseProjects(response: undefined | StrapiWebResponses): ProjectContent[] | undefined {
    const result = response?.data
    if (!result) return
    return result.map((response: StrapiDataBaseResponse) => {
        const attributes = response.attributes as StrapiProjectAttributes
        return {
            '@type': 'project',
            id: response.id,
            slug: slugify(attributes.title),
            title: attributes.title,
            date: attributes.date || null,
            tags: attributes?.tags || null,
            metaDescription: attributes.metaDescription,
            description: attributes.description,
            thumbnail: attributes.thumbnail.data.attributes,
            link: attributes.link || null,
        }
    })
}

function parseAbout(response: undefined | StrapiWebResponse): AboutBlock | undefined {
    const attributes = response?.data?.attributes as StrapiAboutAttributes
    if (!attributes) return
    return {
        '@type': 'about',
        title: attributes.title,
        description: attributes.description?.blocks?.[0]?.data?.text,
        createdAt: attributes.createdAt,
        updatedAt: attributes.updatedAt,
        publishedAt: attributes.publishedAt,
        metaDescription: attributes.metaDescription,
        socials: attributes?.socials || null,
        sections: attributes?.sections || null,
    }
}

export { parseProjects, parseAbout }
