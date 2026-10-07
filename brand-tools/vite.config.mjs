import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
const basePath = process.env.STATIC_EXPORT === '1' ? process.env.PAGES_BASE_PATH || '/motion-studio-open' : '';
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: `${basePath}/brand-tools/`,
  publicDir: false,
  plugins: [
    {
      name: 'moonvine-public-assets',
      enforce: 'pre',
      transform(code, id) {
        if (!basePath || !id.replaceAll('\\', '/').includes('/brand-tools/source/')) return;
        return { code: code.replace(/(["'(])\/(report-(?:logos|media)\/|NibPro-SemiBold\.woff2)/g, `$1${basePath}/$2`), map: null };
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./source', import.meta.url)) } },
  build: { outDir: '../public/brand-tools', emptyOutDir: true, chunkSizeWarningLimit: 2500 },
});
