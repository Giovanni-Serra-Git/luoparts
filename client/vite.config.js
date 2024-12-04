
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
      configure: (proxy) => {
        proxy.on('proxyRes', (proxyRes) => {
          proxyRes.headers['Cross-Origin-Opener-Policy'] = 'same-origin-allow-popups';
        });
      },
    },
  },
  plugins: [react()],
});
