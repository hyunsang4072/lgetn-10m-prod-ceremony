import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE to override the deploy sub-path (default targets GitHub Pages).
// `vite preview` serves the built bundle, so it must use the same base as the build.
export default defineConfig(({ command, isPreview }) => ({
  base: process.env.VITE_BASE ?? (command === 'build' || isPreview ? '/lgetn-10m-prod-ceremony/' : '/'),
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
  },
}))
