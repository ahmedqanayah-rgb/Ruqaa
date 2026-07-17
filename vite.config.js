import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is relative so the built site can be hosted from any sub-path.
export default defineConfig({
  plugins: [react()],
  base: './',
  // PORT is set by the Claude Code preview harness when auto-assigning a port.
  server: { open: true, port: Number(process.env.PORT) || 5273 }
})
