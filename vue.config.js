const path = require("path");

module.exports = {
    publicPath: "./",
    css: {
      extract: false
    },
    chainWebpack: config => {
      config
        .plugin("html")
        .tap(args => {
          if (process.env.production) {
            args[0].template = "./index.html"
          }
          return args
        })
    },
    configureWebpack: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/'),
          '@component': path.resolve(__dirname, 'src/components'),
          '@page': path.resolve(__dirname, 'src/pages/'),
          '@mixin': path.resolve(__dirname, 'src/mixins/'),
          '@api': path.resolve(__dirname, 'src/api/'),
          '@mock': path.resolve(__dirname, 'src/api-mock/'),
          '@asset': path.resolve(__dirname, 'src/assets/'),
          '@i18n': path.resolve(__dirname, 'src/i18n'),
          '@router': path.resolve(__dirname, 'src/router/'),
          '@store': path.resolve(__dirname, 'src/store/'),
          '@util': path.resolve(__dirname, 'src/utils')
        }
      }
  }
}