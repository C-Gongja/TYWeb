import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: "./postcss.config.js",  // PostCSS 설정 경로 추가
	},
})
