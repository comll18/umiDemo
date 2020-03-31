import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { getInitialInfo } from '@/services/userAndlogin';

//布局相关
// 页脚
moment.locale('zh-cn');
const footerRender = () => (
  <>
    <DefaultFooter
      copyright={`${moment().format('YYYY')}金蜜智造`}
      links={[]}
    />
  </>
);
//布局配置
export const layout = {
  layout: 'topmenu',
  logout: () => {}, // do something
  rightRender: initInfo => {
    return 'hahah';
  }, // return string || ReactNode;
  footerRender: footerRender,
};

//初始化数据
export async function getInitialState() {
  const { object } = await getInitialInfo();
  return object;
}
