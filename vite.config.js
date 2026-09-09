import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js}',
    }),
  ],
  resolve: {
    alias: [
      { find: /^firebase$/, replacement: path.resolve(__dirname, './src/firebase.js') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: 'api', replacement: path.resolve(__dirname, './src/api') },
      { find: 'Auth', replacement: path.resolve(__dirname, './src/Auth') },
      { find: 'components', replacement: path.resolve(__dirname, './src/components') },
      { find: 'constants', replacement: path.resolve(__dirname, './src/constants') },
      { find: 'assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: 'utils', replacement: path.resolve(__dirname, './src/utils') },
    ],
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
  },
  preview: {
    port: 3001,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) {
            return 'vendor-firebase';
          }
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/@mui') ||
            id.includes('node_modules/@emotion')
          ) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
