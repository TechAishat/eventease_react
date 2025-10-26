import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/', // Force base URL to root
    plugins: [react()],
    publicDir: fileURLToPath(new URL('../assets', import.meta.url)),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      fs: {
        allow: ['..']
      }
    },
    build: {
      cssCodeSplit: true,
      minify: 'esbuild', // Use esbuild for faster builds
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
      // Disable minification for debugging
      // minify: false,
    },
    css: {
      devSourcemap: true,
    },
    define: {
      'process.env': {}
    }
  };
});
