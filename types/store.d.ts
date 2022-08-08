import {
  DatabasesQueryResponse,
  PagesRetrieveResponse,
} from '@notionhq/client/build/src/api-endpoints'

export default interface RootState {
  imageLoadingList?: PagesRetrieveResponse | null
  generalData?: DatabasesQueryResponse[] | null
  projectsData?: DatabasesQueryResponse[] | null
  aboutData?: PagesRetrieveResponse | null
  allDataFetch?: boolean | null
}
