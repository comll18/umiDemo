/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { isObject } from 'lodash';
import { history } from 'umi';
import { stringify } from 'querystring';
import { loginOutClean } from './index';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 * ~静态配置
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  // 浏览器不在请求中包含凭据
  credentials: 'omit',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    cloudMafType: 'king_bee_web',
    mode: 'cors',
  },
});

/**
 * request拦截器, 改变url 或 options.
 * ~动态配置
 */
request.interceptors.request.use((url, options) => {
  let newUrl = url;
  let newOptions = { ...options };
  if (!url.includes('login')) {
    newOptions.headers.beeToken = Cookies.get('beeToken');
  }

  if (options.method === 'post') {
    if (isObject(options.body)) {
      newOptions = { ...newOptions, body: JSON.stringify(options.body) };
    }
  } else if (options.method === 'get') {
    if (isObject(options.body)) {
      if (url.indexOf('?') > -1) {
        newUrl = `${newUrl}&${stringify(options.body)}`;
      } else {
        newUrl = `${newUrl}?${stringify(options.body)}`;
      }
      delete newOptions.body;
    }
  }
  return {
    url: newUrl,
    options: newOptions,
  };
});

// 克隆响应对象做解析处理
request.interceptors.response.use(async responseSelf => {
  const data = await responseSelf.clone().json();

  if (data && ![1, 0, -2, 401].includes(data.code)) {
    if (
      data.message.includes('失效') ||
      data.message.includes('过期') ||
      data.message.includes('登录信息')
    ) {
      history.push('/user/login');
      loginOutClean();
    } else {
      notification.error({
        description: data.message,
        message: '接口响应问题!!',
      });
    }
  }
  return responseSelf;
});

export default request;
