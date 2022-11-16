// ABOUT //
interface AboutBlock extends StrapiBlockCreated, PageData {
    socials: Socials[] | null
    sections: AboutSection[] | null
    description?: string | null
}

interface AboutSection {
    title: string
    articles: AboutArticle[]
}

interface AboutArticle {
    title: string
    body: string
}

interface Socials {
    name?: 'instagram' | 'github' | 'codepen' | 'p5' | 'facebook' | 'behance'
    icon?: ImageData
    url?: string
}
