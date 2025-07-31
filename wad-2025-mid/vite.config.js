import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/wad-2025-mid/',
  build: {
    outDir: 'dist',
  plugins: [react()],
  }
})
