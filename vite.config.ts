import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
// @ts-expect-error no definition file
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import { libInjectCss } from 'vite-plugin-lib-inject-css';
import pkg from './package.json';
import { fileURLToPath } from 'node:url';
import { copyFileSync } from 'node:fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const lib = defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    peerDepsExternal({ includeDependencies: true }),
    dts({
      include: ['lib'],
      pathsToAliases: true,
      tsconfigPath: resolve(__dirname, './tsconfig.lib.json'),
      outDir: resolve(__dirname, './dist/types'),
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
    },
  },
  build: {
    copyPublicDir: false,
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.devDependencies)],
    },
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
  },
});

const ghPages = defineConfig({
  base: '/dynamic-form',
  plugins: [
    react(),
    {
      name: 'copy-index-to-404',
      closeBundle() {
        const distDir = resolve(__dirname, '.gh-pages');
        copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'));
      },
    },
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
    },
  },
  build: {
    copyPublicDir: false,
    minify: false,
    sourcemap: true,
    outDir: resolve(__dirname, '.gh-pages'),
  },
});

export default process.argv.includes('--gh-pages') ? ghPages : lib;
