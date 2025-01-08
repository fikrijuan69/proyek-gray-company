import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 5174,
  },
  build: {
    outDir: 'dist', // Ensure Vercel knows where to find your build artifacts
  },
})
