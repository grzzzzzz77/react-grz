import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";


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
      }
  })],
  server: {
    open: true,
    host: true,
    port: 5177,
    proxy: {
      "/api": {
        target: "https://api.52vmy.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
