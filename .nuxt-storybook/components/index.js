export { default as VBoldMarkdown } from '../../components/atoms/VBoldMarkdown.vue'
export { default as VButton } from '../../components/atoms/VButton.vue'
export { default as VButtonCross } from '../../components/atoms/VButtonCross.vue'
export { default as VCounterDom } from '../../components/atoms/VCounterDom.vue'
export { default as VImage } from '../../components/atoms/VImage.vue'
export { default as VInput } from '../../components/atoms/VInput.vue'
export { default as VNewPill } from '../../components/atoms/VNewPill.vue'
export { default as VPill } from '../../components/atoms/VPill.vue'
export { default as VSelect } from '../../components/atoms/VSelect.vue'
export { default as VSlider } from '../../components/atoms/VSlider.vue'
export { default as VSplitWord } from '../../components/atoms/VSplitWord.vue'
export { default as VAboutArticle } from '../../components/molecules/VAboutArticle.vue'
export { default as VAboutSection } from '../../components/molecules/VAboutSection.vue'
export { default as VProjectCard } from '../../components/molecules/VProjectCard.vue'
export { default as VSectionParameter } from '../../components/molecules/VSectionParameter.vue'
export { default as VAbout } from '../../components/organisms/VAbout.vue'
export { default as VFooter } from '../../components/organisms/VFooter.vue'
export { default as VNavProject } from '../../components/organisms/VNavProject.vue'
export { default as VProject } from '../../components/organisms/VProject.vue'
export { default as VSplashScreen } from '../../components/organisms/VSplashScreen.vue'
export { default as VTopBar } from '../../components/organisms/VTopBar.vue'
export { default as VUiOptions } from '../../components/organisms/VUiOptions.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
