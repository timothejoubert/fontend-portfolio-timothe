import type { ActionContext, ActionTree } from 'vuex'
import { Context } from '@nuxt/types'
import RootState from '~/types/store'
// @ts-ignore
import { PageResponse } from '~/types/api.d.ts'


const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit, dispatch }: ActionContext<RootState, RootState>, context: Context) {
      //const { body } = await context.$api.getDatabase()
      //console.log(body)
      //commit('PROJECTS_DATA', body)
    },
  /*
    fetchPage(_actionContext: ActionContext<RootState, RootState>, context: Context): Promise<PageResponse> {
        const path = joinURL('/', context.params.pathMatch)

        return context?.getWebResponseByPath(path).then((response) => {
            return  response.data as PageData
        })
    },
   */
}

export default actions
