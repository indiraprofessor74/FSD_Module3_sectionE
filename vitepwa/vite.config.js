import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'vitepwa',
      short_name: 'vitepwa',
      description: 'my first vite pwa app',
      theme_color: '#ffffff',
        icons: [
      {
        src: 'pwa-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],

    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})