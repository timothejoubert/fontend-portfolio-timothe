import { RootState } from '~/types/store'

export default (): RootState => ({
    // Data
    projectsData: null,
    aboutData: null,
    uiProperties: null,
    // Loading
    animationEnter: false,
    splashScreenFinish: false,
    alreadyVisited: false,
    // UI
    isAboutOpen: false,
    isUiOptionsOpen: false,
    selectedFilter: [],
    // General
    errorPage: null,
    windowWidth: 0,
    windowHeight: 0,
})
