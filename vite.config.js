import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext' // Add this line
  },
  server: {
    proxy: {
      '/api': 'https://<YOUR_VERCEL_PROJECT_URL>',
    }
  }
})

