import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/ (deploy en Vercel: base raíz por defecto)
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
