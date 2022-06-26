<template>

  <div :class="$style.root">
    <header :class="$style.header">
      <h1 :class="$style.title" class="text-h1" ref="title">Justine Saez</h1>
      <v-loading-bar :start-loading="startLoading"/>
      <v-hero-image />
    </header>

    <main :class="$style.main">
      <v-list-project  v-bind="{projectList}"/>
    </main>
  </div>

</template>

<script lang="ts">
import Vue from "vue"
import type { PropType } from 'vue'
import { NotionDatabaseContent, NotionDateProperty, NotionSelectContent } from '~/netlify/responseDataType'
import VListProject from '~/components/molecules/VListProject.vue'
import VLoadingBar from '~/components/organisms/VLoadingBar.vue'
import VHeroImage from '~/components/organisms/VHeroImage.vue'


export interface ProjectData {
  id: string | null
  name?: string | null
  url: string | null
  cover?: string | null
  date?: NotionDateProperty | null
  annee?: string | number | null
  techno?: NotionSelectContent
  cadre: NotionSelectContent
  media: string[] | null
  github: string | null
  domaines: NotionSelectContent
  focus?: boolean | null
  externalLien: string | null
  thumbnail: string | null
}

export default Vue.extend({
  name: 'index',
  components: { VListProject, VLoadingBar, VHeroImage},
  data(){
    return {
      projectList: [] as PropType<ProjectData[]>,
      letterIntervalTitle: 30,
      startLoading: false,
    }
  },
  mounted() {
    this.getProjectData()
    this.$nextTick(this.parseTitle)
  },
  computed: {
    isDataProjectLoaded(): boolean {
      return this.projectList.length > 0
    }
  },
  methods: {
    async getProjectData(){
      const response = await fetch('/.netlify/functions/projectList').then((res) =>
        res.json()
      )

      this.projectList = response.results.map((page: NotionDatabaseContent) => {
        const properties = page.properties
        return {
          id: page.id,
          name: properties?.Name?.title?.[0]?.text?.content ?? 'unknow name',
          thumbnail: properties?.["Thumbnail"]?.files?.[0]?.file?.url,
          medias: properties?.["Média"] && Array.isArray(properties?.["Média"]) ? properties?.["Média"] : [properties?.["Média"]],
          cover: page?.cover,
          url: page.url ?? '/',
          date: page.date ?? 'no date',
          annee: properties?.["Année"]?.formula?.name,
          techno: properties?.["Techno"]?.multi_select,
          cadre: properties?.["Cadre"]?.select,
          github: properties?.["Github"]?.url,
          domaines: properties?.["Domaines"]?.multi_select,
          focus: properties?.['🔥']?.checkbox,
          externalLien:  properties?.["Lien"]?.url,
        }
      })
      //console.log(this.projectList)
      //console.log(this.projectList[0].pageName)
    },
    async getPageContent(id: string) {
      const postResponse = await fetch('/.netlify/functions/projectPage', {
        method: 'POST',
        body: JSON.stringify({
          pageId: id,
        }),
      }).then((res) => res.json())

      console.log({ postResponse })
    },
    parseTitle() {
      const element = this.$refs["title"] as HTMLElement
      if(!element) return

      const words = element.innerHTML.split(' ')
      element.innerHTML = ''
      let indexItem = 0;

      words.forEach(word => {
        const wordTag = document.createElement("div");
        wordTag.classList.add(this.$style.word);
        element.appendChild(wordTag)

        word.split('').forEach(letter => {
          const letterTag = document.createElement("span");
          letterTag.innerHTML = letter;
          letterTag.classList.add(this.$style.letter);
          indexItem ++;
          letterTag.style.setProperty("--delay", indexItem * this.letterIntervalTitle + 'ms');
          wordTag.appendChild(letterTag);
        })
      })
      element.classList.add(this.$style["title--active"])
      window.setTimeout(() => this.startLoading = true, 1600 )
    }
  },
})
</script>

<style lang="scss" module>
$orange: #DF5A3F;

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: color(grey-300);
}
.title {
  //color: $orange;
  color: color(grey-300);
  text-align: center;
  opacity: 0;
  transition: opacity 200ms;

  &--active {
    opacity: 1;

    .letter {
      display: inline-block;
      opacity: 0;
      padding: 0 10px;
      animation: slide-in 1s var(--delay) ease-in-out forwards;
    }
  }
}
// ease(out-quart)
@keyframes slide-in {
  0%{
    transform: scale(0);
  }
  100%{
    transform: scale(1);
    opacity: 1;
    padding: 0;
  }
}
.main {
  min-height: 100vh;
}
</style>
