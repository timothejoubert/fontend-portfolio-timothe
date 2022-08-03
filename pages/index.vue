<template>

    <div :class="rootClass">

      <v-about-section v-show="aboutOpen" @toggleAbout="toggleAbout"/>

      <div :class="$style.grain"></div>

      <header :class="$style.header">

        <h1 :class="$style.title" class="text-h1" ref="title">Justine Saez</h1>

        <v-loading-bar />

        <v-hero-image :class="$style['image-header']"/>

        <h2 :class="$style['text-intro']" class="text-h2" ref="intro">
          <strong>Illustratrice curieuse du corps humain,</strong><br/> je  m’amuse à gribouiller des moments<br/> cocasse du quotidien.</h2>

        <button @click="toggleAbout(true)" :class="[$style['about-icon'], aboutOpen && $style['about-icon--open']]" aria-label="open modal à propos">
          <img :src="require(`~/static/icons/icon-about.png`)" alt="illustration justine" />
        </button>

      </header>

      <v-list-project/>

      <v-see-more/>
    </div>

</template>

<script lang="ts">
import Vue from "vue"
import VAboutSection from "~/components/organisms/VAboutSection.vue";
import VListProject from '~/components/molecules/VListProject.vue'
import VLoadingBar from '~/components/organisms/VLoadingBar.vue'
import VHeroImage from '~/components/organisms/VHeroImage.vue'
import VSeeMore from '~/components/molecules/VSeeMore.vue'
import {mapGetters} from "vuex"
import { parseProjectData } from '~/utils/parse-database-properties'
import VRichText from "~/components/atoms/VRichText.vue";
import { NotionPlainText } from "~/utils/api/notion-block-type";

export default Vue.extend({
  name: 'index',
  head() {
    return {
      titleTemplate: 'Accueil - Justine Saez', //'%s - Justine Saez',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'my description'
        }
      ]
    }
  },
  components: {VRichText, VListProject, VLoadingBar, VHeroImage, VAboutSection, VSeeMore },
  data(){
    return {
      letterIntervalTitle: 30,
      aboutOpen: false,
    }
  },
  fetchOnServer: false,
  async fetch() {
    this.$store.commit('apiDataLoaded', false)
    this.$store.commit('introDone', false)

    const projectListPromise = await fetch('/.netlify/functions/projectList').then((res) => {
      //console.log(res)
      if(res.ok){
        this.$nuxt.$loading.finish() // hide loading
        return res.json()
      }
      // throw new Error('error pendant le fetch')
    })

    const generalDataPromise = await fetch('/.netlify/functions/generalInfo').then((res) => {
      if(res.ok)return res.json()
    })

    const aboutDataPromise = await fetch('/.netlify/functions/aboutData').then((res) => {
      if(res.ok) return res.json()
    })

    window.setTimeout(
      () => {
        console.log('project fetch response',projectListPromise.results)
        //console.log('about fetch response',aboutDataPromise.results)
        this.$store.commit('projectsData', parseProjectData(projectListPromise))
        this.$store.commit('generalData', generalDataPromise)
        this.$store.commit('aboutData', aboutDataPromise)
      },
      1000 )

  },
  activated() { // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) this.$fetch()
  },
  computed: {
    ...mapGetters(['introDone', 'projectsData', 'generalData']),
    rootClass(): (string| undefined | boolean)[] {
      return [this.$style.root, this.introDone && this.projectsData && this.$style['root--done']]
      //return [this.$style.root, (!!this.projectsData && this.introDone) && this.$style['root--minify']]
    },
    getIntroText(): NotionPlainText | null {
      return this.generalData?.results?.[0]?.properties?.["description-intro"]
    },
  },
  mounted() {
    this.$nextTick(this.parseTitle)
    this.$nextTick(this.parseIntro)
  },
  methods: {
    toggleAbout(action: boolean) {
      this.aboutOpen = action
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
      window.setTimeout(
        () => this.$store.commit('introDone', true),
       1000 )
    },
    parseIntro() {
      const element = this.$refs["intro"] as HTMLElement
      if(!element) return
      const line = element.innerHTML.split('<br>')

      element.innerHTML = ''

      line.forEach((line,i) => {
        const lines = document.createElement("div");
        lines.classList.add(this.$style.line);
        lines.style.setProperty("--delay", i * 6 * this.letterIntervalTitle + 500 + 'ms');

        const span = document.createElement("span");
        span.classList.add(this.$style.line__inner);
        span.innerHTML = line;

        lines.appendChild(span)
        element.appendChild(lines)
      })


    },
  },

})
</script>

<style lang="scss" module>

.root {
   position: relative;
   width: 100%;
   overflow: hidden;
  //position: fixed;
  //top: 0;
  //left: 0;
}

.grain {
  position: fixed;
  width: 100%;
  height: 100vh;
  opacity: 0.05;
  mix-blend-mode: darken;
  background: url('~static/images/texture-grain.png');
  user-select: none;
}

.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .root--done & {
    overflow: inherit;
  }
}

.title {
  //color: color(main-orange);
  text-align: center;
  opacity: 0;
  transition: opacity 200ms;
  font-size: 13rem;
  line-height: 11rem;

  &--active {
    opacity: 1;
    transition: all 1s 600ms;

    .letter {
      display: inline-block;
      opacity: 0;
      padding: 0 10px;
      animation: slide-in 1s var(--delay) ease(out-quart) forwards;
    }
  }
  .root--minify & {
    font-size: 2rem;
    line-height: 2rem;
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

.image-header{
  position: absolute;
  top: 0;
}

/*
.fade {
  &:global(#{'-enter-active'}),
  &:global(#{'-leave-active'}) {
    transition: opacity 800ms 200ms;
  }
  &:global(#{'-enter'}),
  &:global(#{'-leave-to'}) {
    opacity: 0;
  }
}
 */

.text-intro {
  position: absolute;
  left: 50px;
  bottom: 50px;
  max-width: 440px;
  font-weight: 300;
  font-style: italic;
  opacity: 0;
  transition: background-color 300ms;
  padding: 8px 15px;

  .root--done & {
    opacity: 1;
    background-color: color(light-yellow);
  }

  strong {
    font-weight: 600;
  }

  .line {
    overflow: hidden;
    padding: 2px 0;
  }

  .line__inner {
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%) rotate(5deg);
    transition: transform 300ms var(--delay) ease-in-out, opacity 300ms var(--delay) ease-in-out;
    display: inline-block;

    .root--done & {
      transform: translateY(0) rotate(0);
      opacity: 1;
      visibility: inherit;
    }
  }
}

.about-icon {
  position: fixed;
  right: 20px;
  top: 20px;
  padding: 10px;
  border: 4px solid black;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  z-index: 11;
  visibility: hidden;
  transform: translateX(calc(100% + 20px));
  transition: transform 700ms ease(out-quart) 800ms;

  .root--done & {
    transform: translateX(0);
    visibility: inherit;
  }

  &--open {
    user-select: none;
    z-index: -3;
  }

  span {
    position: absolute;
    top: 110%;
    left: 50%;
  }

  img {
    transition: transform 600ms ease(out-quart);
  }

  &:not(#{&}--open):hover {
    img {
      transform: rotateY(180deg);
    }
  }
}

</style>
