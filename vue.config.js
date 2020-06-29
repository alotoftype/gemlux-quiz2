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
        disable: process.env.NODE_ENV !== 'production',
        est: /\.(jpe?g|png|gif|svg)$/i,
        plugins: [
          imageminMozjpeg({
            quality: 85
          })
        ]
      })
    ]
  }
}