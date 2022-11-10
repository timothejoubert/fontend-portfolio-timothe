import { NuxtError } from '@nuxt/types'

interface RootState {
    projectsData: ProjectContent | null
    aboutData: AboutBlock | null
    animationEnter: boolean
    uiProperties: UserUiContent | null
    splashScreenFinish: boolean
    alreadyVisited: boolean
    isAboutOpen: boolean
    isUiOptionsOpen: boolean
    selectedFilter: string
    windowWidth: number
    windowHeight: number
    errorPage: NuxtError | null
}
