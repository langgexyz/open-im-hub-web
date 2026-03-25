import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const hubAddr = env.VITE_HUB_ADDR || 'http://localhost:8181'

  return {
    plugins: [react()],
    server: {
      port: 5174,
      proxy: {
        '/hub-api': {
          target: hubAddr,
          rewrite: path => path.replace(/^\/hub-api/, ''),
        },
      },
    },
  }
})
