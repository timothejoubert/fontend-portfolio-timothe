import type { MutationTree } from 'vuex'
import MutationType from '~/constants/mutation-type'
import { RootState } from '~/types/store'

export default {
    [MutationType.WINDOW_WIDTH]: (state, value: number) => (state.windowWidth = value),
    [MutationType.WINDOW_HEIGHT]: (state, value: number) => (state.windowHeight = value),
    [MutationType.PROJECTS_DATA]: (state, value: ProjectContent) => (state.projectsData = value),
    [MutationType.ABOUT_DATA]: (state, value: AboutBlock) => (state.aboutData = value),
    [MutationType.SPLASH_SCREEN_FINISH]: (state, value: boolean) => (state.splashScreenFinish = value),
    [MutationType.ANIMATION_ENTER]: (state, value: boolean) => (state.animationEnter = value),
    [MutationType.IS_ABOUT_OPEN]: (state, value: boolean) => (state.isAboutOpen = value),
    [MutationType.IS_UI_OPTIONS_OPEN]: (state, value: boolean) => (state.isUiOptionsOpen = value),
    [MutationType.SELECTED_FILTER]: (state, value: string) => (state.selectedFilter = value),
    [MutationType.ALREADY_VISITED]: (state, value: boolean) => (state.alreadyVisited = value),
} as MutationTree<RootState>
