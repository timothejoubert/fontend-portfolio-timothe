<template>
  <section :class="classNames">
    <div :class="$style.wrapper" @click="onClick">
      <div ref="aboutSection" :class="$style.content">
        <div :class="$style.main">
          <div :class="$style['wrapper-title']">
            <h2 :class="$style.title">{{ about.title }}</h2>
            <button :class="$style.close" aria-label="close modal" @click="(e) => onClick(e, true)">
              <img v-if="aboutData?.iconClose?.imagePath" :src="aboutData.iconClose.imagePath" alt="" />
            </button>
          </div>
          <v-rich-text v-if="about.description" :class="$style.description" :content="about.description" />
          <ul v-if="!!aboutData?.socials?.length" :class="$style['social-list']">
            <li v-for="(link, i) in aboutData.socials" :key="i" :class="$style['social-item']">
              <a :href="link.externalUrl" target="_blank">
                <img v-if="link.imagePath" :src="link.imagePath" :alt="link.alt" />
              </a>
            </li>
          </ul>
        </div>

        <div :class="$style.section">
          <h2 v-if="about?.experiences?.keyName" :class="$style.section__title" class="title-section">
            {{ about.experiences.keyName }}
          </h2>
          <ul v-if="!!about?.experiences?.options?.length" :class="$style['section__list']">
            <li
              v-for="(experience, i) in about.experiences.options"
              :key="`${i}-${experience.id}`"
              :class="$style['section__list__item']"
              class="tag-l"
            >
              {{ experience.name }}
            </li>
          </ul>
        </div>

        <div :class="[$style.section, $style['section--horizontal']]">
          <h2 v-if="about?.skills?.keyName" :class="$style.section__title" class="title-section">
            {{ about.skills.keyName }}
          </h2>
          <ul v-if="!!about?.skills?.options?.length" :class="$style['section__list']">
            <li
              v-for="(skill, i) in about.skills.options"
              :key="`${i}-${skill.id}`"
              :class="$style['section__list__item']"
              class="tag-m"
            >
              {{ skill.name }}
            </li>
          </ul>
        </div>

        <div :class="$style.texture"></div>
      </div>
    </div>
    <button
      :class="[$style['about-icon'], aboutOpen && $style['about-icon--open']]"
      aria-label="open modal à propos"
      @click="toggleAbout"
    >
      <img :src="require(`~/static/icons/icon-about.png`)" alt="illustration justine" />
    </button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
// import type { PropType } from 'vue'
import { mapGetters } from 'vuex'
import { AboutData } from '~/utils/api/notion-custom-type'
import { parseAboutData } from '~/utils/parse-database-properties'
import VRichText from '~/components/atoms/VRichText.vue'

export default Vue.extend({
  name: 'AboutSection',
  components: { VRichText },
  data() {
    return {
      aboutOpen: false,
    }
  },
  computed: {
    ...mapGetters(['aboutData', 'allDataFetch']),
    classNames(): (string | undefined | boolean)[] {
      console.log(this.allDataFetch)
      return [
        this.$style.about,
        this.allDataFetch && this.$style['about--loading-done'],
        this.aboutOpen && this.$style['about--open'],
      ]
    },
    about(): AboutData {
      return parseAboutData(this.aboutData)
    },
  },
  destroyed() {
    this.destroyListener()
  },
  methods: {
    onClick(event: Event, close: boolean = false) {
      const target = this.$refs.aboutSection as HTMLElement
      const currentElementClicked = event.target as HTMLElement
      if ((target !== event.target && !target?.contains(currentElementClicked)) || close) {
        this.removeAbout()
      }
    },
    toggleAbout() {
      const root = document.querySelector('body') as HTMLElement
      console.log(root)
      if (!this.aboutOpen) {
        this.setVarProperty('--color-scroll-thumb', 'white')
        this.setVarProperty('--color-scroll-width', '6px')

        this.initListener()
      } else {
        this.removeAbout()
        return
      }
      this.aboutOpen = !this.aboutOpen
    },
    removeAbout() {
      this.aboutOpen = false
      this.destroyListener()
      this.setVarProperty('--color-scroll-thumb', '#DF5A3F')
      this.setVarProperty('--color-scroll-width', '0px')
    },
    setVarProperty(name: string, value: null | string) {
      const selector = document.querySelector('body') as HTMLElement
      selector.style.setProperty(name, value)
    },
    preventDefault(e: Event) {
      e.preventDefault()
      return false
    },
    initListener() {
      window.addEventListener('scroll', this.preventDefault, {
        passive: false,
      })
      window.addEventListener('wheel', this.preventDefault, {
        passive: false,
      })
    },
    destroyListener() {
      window.removeEventListener('scroll', this.preventDefault)
      window.removeEventListener('wheel', this.preventDefault)
    },
    /*   var scrollLock = false;
        window.onresize = function() {
          if (scrollLock) {
            scrollMethod();
          }
        }

    // Set here your fix scroll position
        var fixYScrollPosition = 0;
    // this method makes that you only can scroll horizontal
        function scrollMethod(){
      // scrolls to position
      window.scrollTo(window.scrollX, fixYScrollPosition); // window.scrollX gives actual position
    }

    // when you zoom in or you have a div which is scrollable, you can watch only the height of the div
     scrollMethod2() {
      var windowHeight = window.innerHeight;
      // the actual y scroll position
      var scrollHeight = window.scrollY;
      // the height of the div under the window
      var restHeight = scrollableDivHeight - (scrollHeight + windowHeight);
      // the height of the div over the window
      var topDivHeight = scrollHeight - /!* the height of the content over the div *!/;
      // Set the scroll position if needed
      if (restHeight <= 0) {
        // don't let the user go under the div
        window.scrollTo(window.scrollX, scrollHeight + restHeight);
      }
      else if (scrollHeight - /!* the height of the content over the div *!/ < 0) {
        // don't let the user go over the div
        window.scrollTo(window.scrollX, scrollHeight - topDivHeight);
      }
    } */
  },
})
</script>

<style lang="scss" module>
.about {
  position: relative;
}
.wrapper {
  top: 0;
  left: 0;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(color(dark), 0.2);
  z-index: 20;
  cursor: pointer;
  display: none;

  .about--open & {
    display: flex;
  }
}

.content {
  position: relative;
  z-index: -2;
  background-color: color(main-orange);
  max-width: 850px;
  padding: 64px 47px;
  cursor: initial;
  display: none;

  .about--open & {
    display: block;
  }
}

.texture {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: lighten;
  opacity: 0.3;
  background: url('~static/images/texture-paper.png');
  z-index: -1;
  user-select: none;
}

.wrapper-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 41px;
  color: color(light-yellow);
  font-weight: 400;
}

.close {
  margin-left: 15px;
  width: 30px;
  height: 30px;

  img {
    width: 100%;
    height: 100%;
  }
}

.description {
  @include noi;
  font-size: 21px;
  color: color(light-yellow);
  font-weight: 300;
  margin-top: 15px;
  max-width: 480px;
}

.social-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.social-item {
  width: 25px;
  height: 25px;

  &:not(:last-child) {
    margin-right: 15px;
  }

  img {
    width: 100%;
  }
}

.section {
  margin-top: 45px;
  font-style: italic;

  &.section--horizontal {
    font-style: inherit;
  }
}

.section__list {
  .section--horizontal & {
    display: flex;
    flex-wrap: wrap;
  }
}

.section__list__item {
  margin-top: 18px;
  color: color(light-yellow);

  .section--horizontal &:not(:last-child) {
    margin-right: 40px;
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

  .about--loading-done & {
    transform: translateX(0);
    visibility: inherit;
  }

  &--open {
    user-select: none;
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
