import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/index.js')],
      name: '@hnquang/vue3-business-hours',
    },
    rollupOptions: {
      external: ['uniqid', 'vue', '@vueform/toggle', 'moment'],
      output: {
        globals: {
          vue: 'vue',
          '@vueform/toggle': '@vueform/toggle',
          uniqid: 'uniqid',
          moment: 'moment',
        },
      },
    },
  },
});
