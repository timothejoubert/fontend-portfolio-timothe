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
declare let process: any
const env = process.env.BASE_URL

const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit(
    { commit, dispatch }: ActionContext<RootState, RootState>,
    context: Context
  ) {
    if (env === 'production') {
      console.log('production mode')
    } else {
      console.log('dev mode')
    }

    const pageLoaderImg = '1ebb67c36ee14fab80166d3a126908c7'
    const databaseProjectListId = '9630213c155243d2833732cb91e63951'
    const databaseMoreId = 'adaa0f3eb6ac464c8281820d1979ec25'
    const databaseGeneralId = 'fd697b929bf8453395b6d335b7ef110b'
    const databaseAboutId = '36bf0a170d624dd78cbca381acbf8879'

    const baseURL =
      (env.NODE_ENV === 'production'
        ? process.env.BASE_URL
        : 'http://localhost:8888') + process.env.API_URL
    const queryPageBlocks = new URL('getPageBlocks?pageId=', baseURL)
    const queryDatabaseContent = new URL(
      'getDatabasePages?databaseId=',
      baseURL
    )

    commit('apiDataLoaded', false)
    commit('introDone', false)

    const imageLoadingPromise = await getWebResponseResult(
      queryPageBlocks,
      pageLoaderImg
    )

    commit('imageLoadingList', parseLoadingImage(imageLoadingPromise))
    console.log('imageLoading data: ', parseLoadingImage(imageLoadingPromise))

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

    console.log(
      'projectPage properties promise ',
      projectListPromise,
      projectChildren
    )

    commit(
      'projectsData',
      parseProjectData(projectListPromise, projectChildren)
    )

    //
    // general data
    //
    // const generalDataPromise = await getWebResponseResult(
    //   queryDatabaseContent + databaseGeneralId
    // )
    //
    // commit('generalData', generalDataPromise)
    // console.log('general data: ', generalDataPromise)
    //
    // //
    // // about data
    // //
    // const aboutDataPromise = await getWebResponseResult(
    //   queryDatabaseContent + databaseAboutId
    // )
    // commit('aboutData', aboutDataPromise)
    // console.log('about data: ', aboutDataPromise)

    //
    // all data fetch
    //
    commit('allDataFetch', true)
    // window.setTimeout(() => {
    // commit('allDataFetch', true)
    console.log('all data fetch: ')
    // }, 2000)
  },
}
export default actions
