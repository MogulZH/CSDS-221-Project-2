import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  // server:{
  //     host: '0.0.0.0',
  //   proxy:{
  //     "/api":{
  //       target: "",
  //       changeOrigin: true,
  //     },
  //   }
  // }
})
