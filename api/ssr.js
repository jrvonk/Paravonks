import { render } from '../dist/server/entry-server.js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// On Vercel, process.cwd() is the project root where dist/ lives.
const template = readFileSync(join(process.cwd(), 'dist/client/index.html'), 'utf-8')

export default function handler(req, res) {
  try {
    const html = template.replace('<!--ssr-outlet-->', render())
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
  } catch (e) {
    console.error(e)
    res.status(500).end(e.message)
  }
}
