import type { ActionTree, ActionContext } from 'vuex'
import { Context, NuxtError } from '@nuxt/types'
import RootState from '~/types/store'
import MutationType from '~/constants/mutation-type'

const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch }: ActionContext<RootState, RootState>, context: Context) {
    // if (context.route.name === 'all') {
    const response = await (await fetch(`${process.env.STRAPI_API_URL}/projects?populate=*`)).json()

    commit(MutationType.PROJECTS_DATA, response)
  },
}

export default actions
