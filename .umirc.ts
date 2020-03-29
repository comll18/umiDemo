import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {},//开启按需加载，umi路由会自动分割文件
  routes: [
    { path: '/', component: '@/pages/index/index' },
    { path: '/user', component: '@/pages/user/index' },
  ],
});
