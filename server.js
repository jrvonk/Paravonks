import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173

async function createServer() {
  const app = express()

  let vite
  if (!isProd) {
    const { createServer: createVite } = await import('vite')
    vite = await createVite({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl
    try {
      let template, render

      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
        const mod = await import('./dist/server/entry-server.js')
        render = mod.render
      }

      const appHtml = render()
      const html = template.replace('<!--ssr-outlet-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e)
      console.error(e.stack)
      res.status(500).end(e.message)
    }
  })

  app.listen(port, () => {
    console.log(`  PARAVONK SSR: http://localhost:${port}`)
  })
}

createServer()
