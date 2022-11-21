import type { ActionTree, ActionContext } from 'vuex'
// import { Context, NuxtError } from '@nuxt/types'
import MutationType from '~/constants/mutation-type'
import { parseProjects, parseAbout } from '~/utils/parse-api-response'
import { RootState } from '~/types/store'
import ABOUT_DATA from '~/data/about-data'
import PROJECTS_DATA from '~/data/projects-data'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
        const baseUrl = process.env.NODE_ENV === 'production' ? process.env.STRAPI_API_URL : 'http://localhost:1337/api'
        console.log('is dev mode: ', process.env.NODE_ENV !== 'production')

        const isStaticData = process.env.BACKEND_DATA === 'static'

        if (isStaticData) {
            commit(MutationType.PROJECTS_DATA, PROJECTS_DATA)
            commit(MutationType.ABOUT_DATA, ABOUT_DATA)
        } else {
            try {
                const responseProject = await (await fetch(`${baseUrl}/projects?populate=deep`)).json()
                const responseAbout = await (await fetch(`${baseUrl}/about?populate=deep`)).json()
                commit(MutationType.PROJECTS_DATA, parseProjects(responseProject))
                commit(MutationType.ABOUT_DATA, parseAbout(responseAbout))
            } catch (error) {
                console.log('cant fetch api in actions.ts', error)
                commit(MutationType.PROJECTS_DATA, undefined)
            }
        }
    },
}

export default actions
