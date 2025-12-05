import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dnsPrefetchPlugin from "./dns-prefetch.js";


// https://vite.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      //别名
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  plugins: [
    react({
      babel:{
        // plugins:['babel-plugin-react-compiler']
        plugins:["./directives-react.js","./optimizeCodePlugin.js"],
      }
  }),
  // DNS 预解析插件
  dnsPrefetchPlugin({
    // includeDomains: ['api.elaina.cat'], // 只对白名单中的域名开启 DNS 预解析，为空则使用所有
  }),
],
  server: {
    open: true,
    host: true,
    port: 5177,
    proxy: {
      "/api": {
        target: "https://api.52vmy.cn/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
