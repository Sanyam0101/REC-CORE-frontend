import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This forwards any request starting with /api to your backend server
      '/api': 'http://localhost:3000',
    }
  }
})
