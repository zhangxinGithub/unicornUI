/*
 * @Author: your name
 * @Date: 2021-02-20 14:07:10
 * @LastEditTime: 2021-02-20 14:11:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /unicornUI/vue.config.js
 */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
const optimization = {
  runtimeChunk: {
    name: 'manifest',
  },
  // 分割代码块
  splitChunks: {

    cacheGroups: {
      vue_base: {
        name: 'vue_base',
        test: (module) => /vue|vue-router|vuex|vant|axios/.test(module.context),
        chunks: 'initial',
        priority: 10,
      },
      lib_vendor: {
        name: 'lib_vendor',
        test: (module) => /echarts|moment|lodash|html2canvas/.test(module.context),
        chunks: 'initial',
        priority: 8,
      },
      common: {
        name: 'common',
        chunks: 'initial',
        priority: 2,
        minChunks: 2,
      },
    },
  },
  minimizer: [
    new UglifyPlugin({
      uglifyOptions: {
        cache: true,
        parallel: true,
        compress: false,
      },
    }),
  ],
};

module.exports = {
  lintOnSave: false,
  publicPath: './',
  assetsDir: 'static', // 打包后静态资源路径
  css: {
    sourceMap: true,
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          /* rem适配忽略文件目录 */
          require('postcss-px2rem-exclude')({
            remUnit: 75,
            exclude: /node_modules|vant/i,
          }),
        ],
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
  productionSourceMap: false,
};
