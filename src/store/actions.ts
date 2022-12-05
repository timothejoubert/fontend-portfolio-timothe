import type { ActionTree, ActionContext } from 'vuex'
import MutationType from '~/constants/mutation-type'
import { parseProjects, parseAbout } from '~/utils/parse-api-response'
import { RootState } from '~/types/store'
import ABOUT_DATA from '~/data/about-data'
import PROJECTS_DATA from '~/data/projects-data'
// import { Context, NuxtError } from '@nuxt/types'

const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
        const baseUrl = process.env.DEPLOYMENT_DATA === 'local' ? process.env.LOCAL_API_URL : process.env.STRAPI_API_URL

        try {
            const responseProject = await (await fetch(`${baseUrl}/projects?populate=deep`)).json()
            const responseAbout = await (await fetch(`${baseUrl}/about?populate=deep`)).json()
            commit(MutationType.PROJECTS_DATA, parseProjects(responseProject))
            commit(MutationType.ABOUT_DATA, parseAbout(responseAbout))
        } catch (error) {
            try {
                commit(MutationType.PROJECTS_DATA, PROJECTS_DATA)
                commit(MutationType.ABOUT_DATA, ABOUT_DATA)
                console.log('cant fetch strapi back-end api in actions store', error)
            } catch (error) {
                console.log('cant fetch static and backend data in actions store', error)
            }
        }
    },
}

export default actions
