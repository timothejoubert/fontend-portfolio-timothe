import type { MutationTree } from 'vuex'
import MutationType from '~/constants/mutation-type'
import { RootState } from '~/types/store'

export default {
  [MutationType.PROJECTS_DATA]: (state, value: ProjectContent) => (state.projectsData = value),
  [MutationType.ABOUT_DATA]: (state, value: AboutContent) => (state.aboutData = value),
} as MutationTree<RootState>
