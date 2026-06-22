import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. Ye line upar add karo

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  logLevel: 'info',
  resolve: {
    alias: {
      // 2. Ye line add karo jo `@` ko `src` folder se jodti hai
      '@': path.resolve(__dirname, './src'), 
    },
  },
})