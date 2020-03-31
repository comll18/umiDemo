export default [
  {
    path: '/',
    component: './index/index',
    menu: {
      name: '首页',
    },
    layout: {
      hideNav: true,
    },
  },
  {
    path: '/user',
    component: './user/index',
    menu: {
      name: '用户',
    },
    access: 'admin',
  },
];
