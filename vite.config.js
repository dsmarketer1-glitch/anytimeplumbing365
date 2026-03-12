import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Anytime Plumbing 365 Review',
        short_name: 'PlumbingReview',
        description: 'Review Anytime Plumbing 365 services and support us on social media.',
        theme_color: '#AA0428',
        background_color: '#0c0b0b',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'https://taplink.st/a/1/8/e/5/d9571b.png?1',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://taplink.st/a/1/8/e/5/d9571b.png?1',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
