import {
  DatabasesQueryResponse,
  PagesRetrieveResponse,
} from '@notionhq/client/build/src/api-endpoints'

export default interface RootState {
  imageLoadingList?: PagesRetrieveResponse | null
  introDone?: boolean | null
  apiDataLoaded?: boolean | null
  projectsData?: DatabasesQueryResponse[] | null
  generalData?: DatabasesQueryResponse[] | null
  aboutData?: PagesRetrieveResponse | null
  allDataFetch?: boolean | null
}
