import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Each HTML file is its own page:
//   index.html         -> landing page (static, fast, good for search engines)
//   app.html           -> the CV editor (React)
//   spikes/index.html  -> Phase 0 device test page (removed before launch)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        landing: resolve(import.meta.dirname, 'index.html'),
        app: resolve(import.meta.dirname, 'app.html'),
        spikes: resolve(import.meta.dirname, 'spikes/index.html'),
      },
    },
  },
})
