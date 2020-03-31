import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  dynamicImport: {}, //开启按需加载，umi路由会自动分割文件
  routes: routes,
  layout: {},
  antd: {},
  dva: {
    hmr: true,
  },
});
