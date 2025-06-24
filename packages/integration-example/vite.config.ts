import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@visall/core': resolve(__dirname, '../core/dist/index.esm.js'),
      '@visall/table': resolve(__dirname, '../table/dist/index.esm.js'),
      '@visall/text': resolve(__dirname, '../text/dist/index.esm.js'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "sass:math";`
      }
    }
  },
  optimizeDeps: {
    exclude: ['@visall/core', '@visall/table', '@visall/text']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
}); 