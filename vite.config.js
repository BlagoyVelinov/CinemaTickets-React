import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/imgbb': {
        target: 'https://api.imgbb.com/1',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/imgbb/, ''),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      provider: 'istanbul',
    }
  }
})
