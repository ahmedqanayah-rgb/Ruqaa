import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleRoom } from './api/_mailbox.js'

/*
 * The game's one endpoint, on the dev and preview servers. In production
 * `api/room.js` is a Vercel Function; locally there is no Vercel, so the very
 * same `handleRoom` is mounted here as a middleware — `npm run dev` (and
 * `npm run preview`) can host a real multi-phone game, and with `--host` the
 * phones on the same Wi-Fi can join it.
 */
function roomApi() {
  const mount = (server) => {
    server.middlewares.use('/api/room', (req, res) => {
      res.setHeader('Cache-Control', 'no-store')
      if (req.method !== 'POST') { res.statusCode = 405; return res.end() }
      let raw = ''
      req.on('data', (chunk) => { raw += chunk; if (raw.length > 64_000) { raw = ''; req.destroy() } })
      req.on('end', () => {
        let body = null
        try { body = JSON.parse(raw) } catch { /* answered as a bad request below */ }
        const out = handleRoom(body)
        res.statusCode = out.status
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(out.json))
      })
    })
  }
  return { name: 'ruqaa-room-api', configureServer: mount, configurePreviewServer: mount }
}

// Base is relative so the built site can be hosted from any sub-path.
export default defineConfig({
  plugins: [react(), roomApi()],
  base: './',
  build: {
    /*
     * Never inline a font. Vite base64s assets under 4 kB by default, which
     * swept up the single-glyph ʿ cuts and added 6 kB gzipped to the
     * render-blocking CSS — paid by every visitor, in both languages. Inlining
     * also defeats the `unicode-range` on each @font-face, whose entire job is
     * to stop an Arabic reader ever fetching the Latin faces. Keep them files.
     */
    assetsInlineLimit: (filePath) => (/\.(woff2?|ttf|otf|eot)$/i.test(filePath) ? false : undefined),
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
