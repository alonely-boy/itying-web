const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  publicPath: process.env.NODE.ENV === 'production'
    ? '/' : '/',
  outputDir: '../server/public',
  lintOnSave: false,
  productionSourceMap: false,
  runtimeCompiler: true, //关键点在这
  configureWebpack:{
    resolve:{
        // extension:[].vue.js.css配置过了,
        alias:{
            'assets':'@/assets',
            // 'common':'@/common',
            'components':'@/components',
        }
    }
  },

}