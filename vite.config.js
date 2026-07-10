import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is relative so the built site can be hosted from any sub-path.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { open: true }
})
