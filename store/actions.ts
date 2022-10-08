import type { ActionTree, ActionContext } from 'vuex'
// import { Context, NuxtError } from '@nuxt/types'
import MutationType from '~/constants/mutation-type'
import parseProjects from '~/utils/parseProjects'
import { RootState } from '~/types/store'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
        // if (context.route.name === 'all') {

        const baseUrl = process.env.NODE_ENV === 'production' ? process.env.STRAPI_API_URL : 'http://localhost:1337/api'
        console.log('dev mode', process.env.NODE_ENV !== 'production', baseUrl)

        try {
            const response = await (await fetch(`${baseUrl}/projects?populate=*`)).json()
            commit(MutationType.PROJECTS_DATA, parseProjects(response))
        } catch (error) {
            console.log('cant fetch api in actions.ts', error)
            commit(MutationType.PROJECTS_DATA, undefined)
        }
    },
}

export default actions
