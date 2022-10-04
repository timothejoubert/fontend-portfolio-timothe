import { NuxtError } from '@nuxt/types'
import { ProjectContent } from '~/utils/parseProjects'

interface RootState {
    projectsData: ProjectContent | null
    aboutData: AboutContent | null
    uiProperties: userUiContent | null
    errorPage: NuxtError | null
}
