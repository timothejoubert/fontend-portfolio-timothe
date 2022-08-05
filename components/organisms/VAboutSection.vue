<template>
  <section :class="$style.root" @click="onClick">
    <div ref="aboutSection" :class="$style.content">
      <div :class="$style.main">
        <div :class="$style['wrapper-title']">
          <h1 :class="$style.title">{{ about.title }}</h1>
          <button
            :class="$style.close"
            aria-label="close modal"
            @click="(e) => onClick(e, true)"
          >
            <img
              v-if="aboutData?.iconClose?.imagePath"
              :src="aboutData.iconClose.imagePath"
              alt=""
            />
          </button>
        </div>
        <v-rich-text
          v-if="about.description"
          :class="$style.description"
          :content="about.description"
        />
        <ul v-if="!!aboutData?.socials?.length" :class="$style['social-list']">
          <li
            v-for="(link, i) in aboutData.socials"
            :key="i"
            :class="$style['social-item']"
          >
            <a :href="link.externalUrl" target="_blank">
              <img
                v-if="link.imagePath"
                :src="link.imagePath"
                :alt="link.alt"
              />
            </a>
          </li>
        </ul>
      </div>

      <div :class="$style.section">
        <h2
          v-if="about?.experiences?.keyName"
          :class="$style.section__title"
          class="title-section"
        >
          {{ about.experiences.keyName }}
        </h2>
        <ul
          v-if="!!about?.experiences?.options?.length"
          :class="$style['section__list']"
        >
          <li
            v-for="(experience, i) in about.experiences.options"
            :key="`${i}-${experience.id}`"
            :class="$style['section__list__item']"
            class="body-l"
          >
            {{ experience.name }}
          </li>
        </ul>
      </div>

      <div :class="[$style.section, $style['section--horizontal']]">
        <h2
          v-if="about?.skills?.keyName"
          :class="$style.section__title"
          class="title-section"
        >
          {{ about.skills.keyName }}
        </h2>
        <ul
          v-if="!!about?.skills?.options?.length"
          :class="$style['section__list']"
        >
          <li
            v-for="(skill, i) in about.skills.options"
            :key="`${i}-${skill.id}`"
            :class="$style['section__list__item']"
            class="body-s"
          >
            {{ skill.name }}
          </li>
        </ul>
      </div>

      <div :class="$style.texture"></div>
    </div>
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
  computed: {
    ...mapGetters(['aboutData']),
    about(): AboutData {
      return parseAboutData(this.aboutData)
    },
  },
  methods: {
    onClick(event: Event, close: boolean = false) {
      const target = this.$refs.aboutSection as HTMLElement
      const currentElementClicked = event.target as HTMLElement
      if (
        (target !== event.target && !target?.contains(currentElementClicked)) ||
        close
      ) {
        this.$emit('toggleAbout', false)
      }
    },
  },
})
</script>

<style lang="scss" module>
.root {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(color(dark), 0.2);
  z-index: 20;
  cursor: pointer;
}

.content {
  position: relative;
  z-index: -2;
  background-color: color(main-orange);
  max-width: 850px;
  padding: 64px 47px;
  cursor: initial;
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

  .section--horizontal &:not(:last-child) {
    margin-right: 40px;
  }
}
</style>
