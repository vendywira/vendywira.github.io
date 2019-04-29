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
    }
  }