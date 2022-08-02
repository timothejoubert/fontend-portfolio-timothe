import { DatabasesQueryResponse, PagesRetrieveResponse } from "@notionhq/client/build/src/api-endpoints";


export default interface RootState {
    introDone?: boolean | null
    apiDataLoaded?: boolean | null
    projectsData?: DatabasesQueryResponse[] | null
    generalData?: DatabasesQueryResponse[] | null
    aboutData?: PagesRetrieveResponse | null
}
