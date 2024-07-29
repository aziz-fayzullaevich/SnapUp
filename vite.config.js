import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/auth': {
                target: 'https://dummyjson.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/auth/, '/auth')
            }
        }
    }
});
