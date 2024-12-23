import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Bind to 0.0.0.0 to be accessible externally
    port: 5173,       // Optional: Specify a port, or Vite will use the default
  },
})
