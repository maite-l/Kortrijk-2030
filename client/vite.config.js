import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://kortrijk2030.ddev.site",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
