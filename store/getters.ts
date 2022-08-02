import type { GetterTree } from 'vuex'
import RootState from '~/types/store'

export const getters: GetterTree<RootState, RootState> = {
    introDone: (state: RootState) => state.introDone,
    apiDataLoaded: (state: RootState) => state.apiDataLoaded,
    generalData: (state: RootState) => state.generalData,
    projectsData: (state: RootState) => state.projectsData,
    aboutData: (state: RootState) => state.aboutData,
}

export default getters
