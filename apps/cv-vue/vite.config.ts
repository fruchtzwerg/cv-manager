import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config';
import vue from '@vitejs/plugin-vue';
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths';

export default mergeConfig(baseConfig, {
  plugins: [
    vue(),
    ViteTsConfigPathsPlugin({
      root: '../../',
      projects: ['tsconfig.base.json'],
    }),
  ],
});
