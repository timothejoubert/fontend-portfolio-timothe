import type { ActionTree, ActionContext } from 'vuex'
// import { Context, NuxtError } from '@nuxt/types'
import MutationType from '~/constants/mutation-type'
import parseProjects from '~/utils/parseProjects'
import { RootState } from '~/types/store'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
        // if (context.route.name === 'all') {
        const response = await (await fetch(`${process.env.STRAPI_API_URL}/projects?populate=*`)).json()
        commit(MutationType.PROJECTS_DATA, parseProjects(response))
    },
}

export default actions
