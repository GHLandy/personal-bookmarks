import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

import htmlMetaBuildTime from './plugin/vite/htmlMetaBuildTime';

// https://cn.vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  console.log('%c 🍎', 'color:#3f7cff', { mode, command });

  return {
    plugins: [
      vue(),
      vueJsx(),
      components({
        /* 自动导入 ElementPlus, @element-plus/icons-vue */
        /* 形如 <el-icon size="24"><ElIconUser /></el-icon> */
        resolvers: [ElementPlusResolver(), IconsResolver()],
      }),
      Icons(),
      htmlMetaBuildTime(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
    },
  };
});
