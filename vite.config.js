import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
        menu: './menu.html',
        order: './order.html',
        simple: './simple.html',
        debug: './debug.html'
      }
    }
  },
  css: {
    devSourcemap: true,
    postcss: './postcss.config.js'
  }
})