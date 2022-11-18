const stories = ['../../src/components/**/*.stories.@(ts|js)','../../src/stories/**/*.stories.js']
const addons  = ["@storybook\u002Faddon-essentials",{name:"@storybook\u002Fpreset-scss",options:{cssLoaderOptions:{modules:true,localIdentName:"[name]__[local]--[hash:base64:5]"}}},{
  name: '@storybook/addon-postcss',
  options: {
    postcssLoaderOptions: {
      implementation: require('postcss')
    }
  }
}
]

function nuxifyStorybook(storybookConfig) {
  return {
    ...storybookConfig,
    webpackFinal(config, options) {
      if (options.nuxtStorybookConfig) {
        config = options.nuxtStorybookConfig.webpackFinal(config, options)
      }
      if (typeof storybookConfig.webpackFinal === 'function') {
        config = storybookConfig.webpackFinal(config, options)
      }
      return config
    },
    stories: [
      ...stories,
      ...storybookConfig.stories
    ],
    addons: [
      ...addons,
      ...storybookConfig.addons
    ],
  }
}

module.exports = {
  webpackFinal(config, options) {
    return options.nuxtStorybookConfig.webpackFinal(config, options)
  },
  stories,
  addons,
  nuxifyStorybook
}
