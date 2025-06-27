import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:true,
    port: 5173,
    watch: {
      usePolling: true, // Use polling for file watching
    },
    proxy: {
      '/api':{
        target: 'http://backend:5000',
        changeOrigin: true,
        secure: false,   
         }
      }
  }
})
