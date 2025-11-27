import { defineConfig, loadEnv } from 'vite'
// elment plus自动导入的配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// svg图标插件的配置
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock插件的配置
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
// 代理的配置

// path模块,路径别名的配置
import path from "path";
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 配置svg图标插件
    createSvgIconsPlugin({
      // 图标放置的位置
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定生成的symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    // 配置mock插件
    viteMockServe({
      mockPath: 'src/mocks', // mock文件存放的目录
      enable: command === 'serve' ? true : false // 开发环境下启用mock
    }),
    ],

    //设置别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")//这样配置后 @ 就表示 src 目录
      },
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          // scss全局变量配置
          additionalData: '@import "@/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        '/api': {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE || 'http://127.0.0.1:10086',
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})
