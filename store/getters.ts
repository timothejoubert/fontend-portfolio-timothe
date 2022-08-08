import type { GetterTree } from 'vuex'
import RootState from '~/types/store'

export const getters: GetterTree<RootState, RootState> = {
  imageLoadingList: (state: RootState) => state.imageLoadingList,
  generalData: (state: RootState) => state.generalData,
  projectsData: (state: RootState) => state.projectsData,
  aboutData: (state: RootState) => state.aboutData,
  allDataFetch: (state: RootState) => state.allDataFetch,
}

export default getters
