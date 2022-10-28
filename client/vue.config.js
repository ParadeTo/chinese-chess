var path = require('path')
var merge = require('webpack-merge')
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

function resolve(name) {
  return path.join(__dirname, name)
}

// TODO: not work
module.exports = {
  chainWebpack: config => {
    config.devServer.proxy('http://localhost:9090')

    config
      // Interact with entry points
      .entry('ai')
      .add(resolve('src/ai/bridge/worker.ts'))
      .end()
      // Modify output settings
      .output.path(resolve('dist'))
      .filename('[name].bundle.js')
      .globalObject('this') // https://github.com/webpack/webpack/issues/6642

    config.devtool(false)
    if (process.env.VUE_APP_ENV === 'blog' || process.env.VUE_APP_ENV === 'jj') {
      const images = config.module.rule('images')
      images.uses.clear()
      images
        .use('url-loader')
        .loader(require.resolve('url-loader'))
        .options({
          limit: 133120,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'images/vue-chinese-chess/[name].[hash:8].[ext]'
            }
          }
        })
    }

    // exclude ai.js
    config.plugin('html').tap(args => {
      args[0].excludeAssets = [/ai.*.js/]
      return args
    })

    // config
    //   .plugin('externals')
    //   .use(HtmlWebpackExternalsPlugin, [{
    //     externals: [
    //       {
    //         module: 'vue',
    //         entry: '//cdn.bootcss.com/vue/2.1.1/vue.min.js',
    //         global: 'Vue'
    //       }
    //     ]
    //   }])

    config.plugin('assets').use(HtmlWebpackExcludeAssetsPlugin)

    config.optimization.splitChunks(false) // will cause webworker not work if enable this
  }
}
