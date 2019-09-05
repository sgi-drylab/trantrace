let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/* 路由懒加载配置：文件存放位置 及 文件命名格式 */
mix.webpackConfig({
  output:{
    publicPath:'/',
    chunkFilename:'js/lazy/[name].js'
  },
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.common.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
  //   }
  // },
  // module: {
  //   rules: [{
  //     test: /vue-preview.src.*?js$/,
  //     loader: 'babel'
  //   }]
  // }
})

mix.js('resources/assets/js/app.js', 'public/js')
   .combine('resources/assets/less/init.css', 'public/css/init.css')
   .version()
   // .sourceMaps()  // 追踪错误信息
   .browserSync({
     proxy: 'www.translationpaper.com'
   });
