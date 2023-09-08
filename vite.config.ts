import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'

const r = (...args: string[]) => resolve(__dirname, ...args)

export default defineConfig({
  plugins: [
    vue({ script: { defineModel: true }}),
    Components({
      dirs: [r('src/components')],
    }),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
