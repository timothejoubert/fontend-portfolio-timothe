import { NuxtError } from '@nuxt/types'

interface RootState {
  projectsData: ProjectContent | null
  aboutData: AboutContent | null
  errorPage: NuxtError | null
}
