import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          const normalizedId = id.replace(/\\/g, '/')

          if (normalizedId.includes('/node_modules/react-dom/')) {
            return 'react-dom'
          }

          if (normalizedId.includes('/node_modules/react-router-dom/')) {
            return 'react-router-dom'
          }

          if (normalizedId.includes('/node_modules/antd-style/')) {
            return 'antd-style'
          }

          if (
            normalizedId.includes('/node_modules/antd/') ||
            normalizedId.includes('/node_modules/@ant-design/') ||
            normalizedId.includes('/node_modules/@rc-component/') ||
            normalizedId.includes('/node_modules/rc-')
          ) {
            return 'antd'
          }

          if (normalizedId.includes('/node_modules/react/')) {
            return 'react'
          }
        },
        chunkFileNames: (chunkInfo) => {
          const moduleIds = chunkInfo.moduleIds.filter(Boolean)
          const isPureLucideChunk =
            moduleIds.length > 0 &&
            moduleIds.every((id) => id.includes('/node_modules/lucide-react/'))

          if (isPureLucideChunk) {
            return 'lucide/[name]-[hash].js'
          }

          return 'assets/[name]-[hash].js'
        },
      },
    },
  },
})
