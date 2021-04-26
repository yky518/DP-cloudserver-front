module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // prependData: '@import "./src/assets/scss/style.scss";',
      },
    },
  },
  // 基本路径,相对路径
  publicPath: './',
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint 是否在保存时检查
  assetsDir: 'static', // 配置js、css静态资源二级目录的位置
  // 输出文件目录
  // outputDir: process.env.outputDir,
  devServer: {
    port: 8081,
    proxy: {
      '/api': { // 这里最好有一个 /
        // target: 'http://dev.deepmd.net', // 后台接口域名
        target:'http://caokai.deepmd.net/',
        ws: true, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  pwa: {
    iconPaths: {
      favicon32: './static/img/favicon.ico',
      favicon16: './static/img/favicon.ico',
      appleTouchIcon: './static/img/favicon.ico',
      maskIcon: './static/img/favicon.ico',
      msTileImage: './static/img/favicon.ico',
    },
  },
};
