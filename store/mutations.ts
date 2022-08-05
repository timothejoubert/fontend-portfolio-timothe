import type { MutationTree } from 'vuex'
import {
  DatabasesQueryResponse,
  PagesRetrieveResponse,
} from '@notionhq/client/build/src/api-endpoints'
import RootState from '~/types/store'
import MutationType from '~/types/mutation-type'

export default {
  [MutationType.IMAGE_LOADING_LIST]: (state, value: PagesRetrieveResponse) =>
    (state.imageLoadingList = value),
  [MutationType.INTRO_DONE]: (state, value: boolean) =>
    (state.introDone = value),
  [MutationType.API_DATA_LOADED]: (state, value: boolean) =>
    (state.apiDataLoaded = value),
  [MutationType.GENERAL_DATA]: (state, value: DatabasesQueryResponse[]) =>
    (state.generalData = value),
  [MutationType.PROJECTS_DATA]: (state, value: DatabasesQueryResponse[]) =>
    (state.projectsData = value),
  [MutationType.ABOUT_DATA]: (state, value: PagesRetrieveResponse) =>
    (state.aboutData = value),
  [MutationType.ALL_DATA_FETCH]: (state, value: boolean) =>
    (state.allDataFetch = value),
} as MutationTree<RootState>
