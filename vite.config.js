import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is relative so the built site can be hosted from any sub-path.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        /*
         * Split the libraries out of the app bundle. Members join from places
         * with very uneven connections, so this matters: recharts is by far the
         * heaviest dependency and is only needed once a chart actually renders
         * (the figure registry is lazy-loaded), while react/router change far
         * less often than our content and can stay cached across updates.
         */
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
        },
      },
    },
  },
  // PORT is set by the Claude Code preview harness when auto-assigning a port.
  server: { open: true, port: Number(process.env.PORT) || 5273 }
})
