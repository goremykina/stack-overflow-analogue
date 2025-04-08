import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://codelang.vercel.app',
        changeOrigin: true,
        configure: proxy => {
          proxy.on('proxyRes', (_proxyRes, _req, res) => {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
          })
        }
      }
    }
  }
})
