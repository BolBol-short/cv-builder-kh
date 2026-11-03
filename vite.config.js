import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Each HTML file is its own page:
//   index.html         -> landing page (static, fast, good for search engines)
//   app.html           -> the CV editor (React)
//   privacy.html       -> privacy page (static)
//   spikes/index.html  -> Phase 0 device test page (removed before launch)
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Makes the editor work offline and installable on the Home Screen.
    VitePWA({
      registerType: 'prompt', // ask before updating, never reload in the middle of editing
      injectRegister: false, // the app registers it itself (see app/UpdatePrompt.jsx)
      manifest: {
        name: 'CV-Builder',
        short_name: 'CV-Builder',
        description: 'Make a CV for jobs in Cambodia, in Khmer or English.',
        start_url: '/app',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1d4ed8',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Save the app, its pictures and only the Latin and Khmer font files for offline use.
        globPatterns: ['**/*.{js,css,html,svg,png,jpg}', 'assets/*-latin-*.woff2', 'assets/*-khmer-*.woff2'],
        globIgnores: ['spikes/**', 'assets/spikes-*', '**/*latin-ext*', 'og-image.jpg', 'example-cv*.jpg'],
        navigateFallback: '/app.html',
        navigateFallbackAllowlist: [/^\/app/], // only the editor; the landing page stays a normal page
      },
    }),
  ],
  build: {
    manifest: true, // lets scripts/check-size.js tell first-load code from lazy code
    rollupOptions: {
      input: {
        landing: resolve(import.meta.dirname, 'index.html'),
        app: resolve(import.meta.dirname, 'app.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        spikes: resolve(import.meta.dirname, 'spikes/index.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true, // lets Testing Library clean up the page after each test
    include: ['src/**/*.test.{js,jsx}'],
  },
})
