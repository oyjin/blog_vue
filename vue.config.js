const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081/', // 本地后端地址
        changeOrigin: true, //允许跨域
        ws: false, // 关闭websocket报错
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
