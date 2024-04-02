import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return {
    // 别名
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      react(),
      Unocss(),
    ],
    server: {
      host: '0.0.0.0',
      cors: true,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          // target: 'http://3.87.189.32:3000',
          secure: false,
          ws: true,
          changeOrigin: true,
          rewrite: pathApi => pathApi.replace(/^\/api/, '/')
        },
      },
    }
  }
})
