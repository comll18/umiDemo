import React from 'react';
import ProLayout from '@ant-design/pro-layout';

const BasicLayout = props => {
  const { children } = props;

  return <ProLayout>{children}</ProLayout>;
};

export default BasicLayout;
