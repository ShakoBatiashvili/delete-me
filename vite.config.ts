import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/delete-me/', // GitHub Pages base path for repository
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
