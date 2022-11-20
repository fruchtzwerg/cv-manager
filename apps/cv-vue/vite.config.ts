import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config';
import vue from '@vitejs/plugin-vue';
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths';
import Icons from 'unplugin-icons/vite';
import vueJSX from '@vitejs/plugin-vue-jsx';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

export default mergeConfig(baseConfig, {
  plugins: [
    vue(),
    vueJSX(),
    Components({
      resolvers: [IconsResolver({ prefix: 'icon' })],
    }),
    Icons(),
    ViteTsConfigPathsPlugin({
      root: '../../',
      projects: ['tsconfig.base.json'],
    }),
  ],
});
