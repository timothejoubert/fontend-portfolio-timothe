import type { ActionTree, ActionContext } from 'vuex'
import { Context, NuxtError } from '@nuxt/types'
import RootState from '~/types/store'
import {
  parseLoadingImage,
  parseProjectData,
} from '~/utils/parse-database-properties'
import {
  NotionBlockObject,
  NotionDatabaseContent,
  pageBlockResponse,
} from '~/types/api-type'
import { getWebResponseResult } from '~/utils/functions'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/generals'

declare let process: any
const prodUrl = process.env.BASE_URL

const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit(
    { commit, dispatch }: ActionContext<RootState, RootState>,
    context: Context
  ) {
    if (!process.env.NETLIFY_DEV) {
      console.log('production mode', prodUrl)
    } else {
      console.log('dev mode', prodUrl)
    }

    if (!toBoolean(GeneralsConst.ACTIVE_LOADING)) commit('allDataFetch', true)

    console.log('active loading', toBoolean(GeneralsConst.ACTIVE_LOADING))

    const pageLoaderImg = '1ebb67c36ee14fab80166d3a126908c7'
    const databaseProjectListId = '9630213c155243d2833732cb91e63951'
    // const databaseMoreId = 'adaa0f3eb6ac464c8281820d1979ec25'
    const databaseGeneralId = 'fd697b929bf8453395b6d335b7ef110b'
    const databaseAboutId = '36bf0a170d624dd78cbca381acbf8879'

    const baseURL = process.env.NETLIFY_DEV
      ? 'http://localhost:8888/.netlify/functions/'
      : 'https://justine-saez.netlify.app/.netlify/functions/'

    // const baseURL = 'https://justine-saez.netlify.app/.netlify/functions/'

    // process.env.BASE_URL + process.env.API_URL
    // (env?.NODE_ENV !== 'production' ? 'http://localhost:8888' : '') +

    const queryPageBlocks = baseURL + 'getPageBlocks?pageId='
    const queryDatabaseContent = baseURL + 'getDatabasePages?databaseId='

    const imageLoadingPromise = await getWebResponseResult(
      queryPageBlocks,
      pageLoaderImg
    )
    commit('imageLoadingList', parseLoadingImage(imageLoadingPromise))

    //
    // projects
    //
    const projectListPromise = await getWebResponseResult(
      queryDatabaseContent,
      databaseProjectListId
    )
    const getProjectPageIdList: string[] = (
      projectListPromise.results as NotionDatabaseContent[]
    ).map((page) => page.id)
    const projectChildren = (await Promise.all(
      getProjectPageIdList.map(async (id) => {
        return await getWebResponseResult(queryPageBlocks, id)
      })
    )) as pageBlockResponse[]

    commit(
      'projectsData',
      parseProjectData(projectListPromise, projectChildren)
    )

    //
    // general data
    //
    const generalDataPromise = await getWebResponseResult(
      queryDatabaseContent,
      databaseGeneralId
    )

    commit('generalData', generalDataPromise)

    //
    // about data
    //
    const aboutDataPromise = await getWebResponseResult(
      queryDatabaseContent,
      databaseAboutId
    )

    commit('aboutData', aboutDataPromise)
  },
}
export default actions
