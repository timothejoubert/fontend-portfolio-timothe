<template>
    <div v-if="!!projectList">
      <div v-for="card in projectList" :key="card.id">
      <h3 v-if="card.pageName">{{ card.pageName }} </h3>
      <p>{{ card }} </p>
      <img v-if="card.thumbnail" :class="$style.project__img" :src="card.thumbnail" alt="">
    </div>
    </div>

</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import {ProjectData} from "~/pages/index.vue";
import {NotionDatabaseContent} from "~/netlify/responseDataType";

export default Vue.extend({
  name: 'VCardProject',
  data(){
    return {
      projectList: [] as PropType<ProjectData[] | null>,
    }
  },
  async mounted() {
    const response = await fetch('/.netlify/functions/projectList').then((res) =>
      res.json()
    )

    const parsedResponse = response.results.map((page: NotionDatabaseContent) => {
      const properties = page.properties
      return {
        id: page.id,
        pageName: properties?.Name?.title?.[0]?.text?.content ?? 'unknow name',
        thumbnail: properties?.["Thumbnail"]?.files?.[0]?.file?.url,
        medias: properties?.["Média"] && Array.isArray(properties?.["Média"]) ? properties?.["Média"] : [properties?.["Média"]],
        cover: page?.cover,
        url: page.url ?? '/',
        date: page.date ?? 'no date',
        ...properties
      }
    })
    this.projectList = parsedResponse
    //console.log(this.projectList)
    //console.log(this.projectList[0].pageName)
  },
  methods: {
    async getPageContent(id: string) {
      const postResponse = await fetch('/.netlify/functions/projectPage', {
        method: 'POST',
        body: JSON.stringify({
          pageId: id,
        }),
      }).then((res) => res.json())

      console.log({ postResponse })
    },
  },
  computed: {
    isProjectLoaded(): boolean {
      return this.projectList?.length > 0
    }
  }
})
</script>

<style lang="scss" module>
.project__img{
  max-width: 300px;
}
</style>
