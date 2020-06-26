const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData:  `
          @import "@/scss/_variables.scss";
        `
      }
    }
  },
  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        plugins: [
          imageminMozjpeg({
            quality: 85
          })
        ]
      })
    ]
  }
}