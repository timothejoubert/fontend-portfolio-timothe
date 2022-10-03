import { StrapiWebResponse } from '~/types/api'

export default function parseProjects(response: StrapiWebResponse): ProjectContent[] {
  return response.data.map((response: StrapiDataBaseResponse) => {
    const attributes = response.attributes as ProjectContent
    return {
      id: response.id,
      title: attributes.title,
      description: attributes.description,
      thumbnail: attributes.thumbnail.data.attributes,
    }
  })
}
