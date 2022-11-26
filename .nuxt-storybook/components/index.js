export { default as VBoldMarkdown } from '../../src/components/atoms/VBoldMarkdown.vue'
export { default as VButton } from '../../src/components/atoms/VButton.vue'
export { default as VButtonCross } from '../../src/components/atoms/VButtonCross.vue'
export { default as VCounterDom } from '../../src/components/atoms/VCounterDom.vue'
export { default as VCounterDomTemplate } from '../../src/components/atoms/VCounterDomTemplate.vue'
export { default as VHtmlParser } from '../../src/components/atoms/VHtmlParser.vue'
export { default as VImage } from '../../src/components/atoms/VImage.vue'
export { default as VInput } from '../../src/components/atoms/VInput.vue'
export { default as VInputFactory } from '../../src/components/atoms/VInputFactory.vue'
export { default as VLink } from '../../src/components/atoms/VLink.vue'
export { default as VNewPill } from '../../src/components/atoms/VNewPill.vue'
export { default as VPill } from '../../src/components/atoms/VPill.vue'
export { default as VSelect } from '../../src/components/atoms/VSelect.vue'
export { default as VSlider } from '../../src/components/atoms/VSlider.vue'
export { default as VSplitWord } from '../../src/components/atoms/VSplitWord.vue'
export { default as VToggle } from '../../src/components/atoms/VToggle.vue'
export { default as VAboutArticle } from '../../src/components/molecules/VAboutArticle.vue'
export { default as VAboutSection } from '../../src/components/molecules/VAboutSection.vue'
export { default as VProjectCard } from '../../src/components/molecules/VProjectCard.vue'
export { default as VSectionParameter } from '../../src/components/molecules/VSectionParameter.vue'
export { default as VAbout } from '../../src/components/organisms/VAbout.vue'
export { default as VFooter } from '../../src/components/organisms/VFooter.vue'
export { default as VNavProject } from '../../src/components/organisms/VNavProject.vue'
export { default as VProject } from '../../src/components/organisms/VProject.vue'
export { default as VSplashScreen } from '../../src/components/organisms/VSplashScreen.vue'
export { default as VTopBar } from '../../src/components/organisms/VTopBar.vue'
export { default as VUiOptions } from '../../src/components/organisms/VUiOptions.vue'

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
