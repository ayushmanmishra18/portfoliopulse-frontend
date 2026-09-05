import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const apiUrl = loadEnv(mode, process.cwd(), '').VITE_API_URL

  return {
    plugins: [
      react(),
      {
        name: 'replace-api-url-in-legacy-bundle',
        transform(code, id) {
          if (!id.endsWith('/dist/assets/index-CESIacOY.js')) {
            return
          }

          return code.replaceAll('http://localhost:5000/api', apiUrl)
        },
      },
    ],
    build: {
      emptyOutDir: false,
    },
  }
})
