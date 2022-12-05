import { NuxtError } from '@nuxt/types'

interface RootState {
    // Data
    projectsData: ProjectContent[] | []
    aboutData: AboutBlock | null
    // Loading
    animationEnter: boolean
    splashScreenFinish: boolean
    alreadyVisited: boolean
    // UI
    isAboutOpen: boolean
    isUiOptionsOpen: boolean
    selectedFilter: string[]
    activeFilters: string[]
    // General
    windowWidth: number
    windowHeight: number
    errorPage: NuxtError | null
}
