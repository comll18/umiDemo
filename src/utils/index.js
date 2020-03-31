/* eslint-disable func-names */
import { parse } from 'qs';
import Cookies from 'js-cookie';
import { isObject, isArray, isString } from 'lodash';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export const getDataFormCookies = name => Cookies.get(name);

export const cacheDataToLocal = async obj => {
  const { beeToken, sysToken, username, menuPaths, expires } = obj;
  if (beeToken) {
    // expires: 0.0007  7秒过期
    await Cookies.set('beeToken', beeToken, { expires: expires || 1 });
  }
  if (sysToken) {
    await Cookies.set('sysToken', sysToken, { expires: expires || 1 });
  }
  if (menuPaths) {
    // size太大，超过cookies限制
    await localStorage.setItem('menuPaths', JSON.stringify(menuPaths));
  }
  if (username) {
    await Cookies.set('username', username, { expires: expires || 1 });
  }
  return 'ok';
};

/**
 *
 * @param {[]} data
 */
export const removeDataFormCookies = data => {
  if (isArray(data)) {
    data.forEach(item => {
      if (isString(item)) {
        Cookies.remove(item);
      }
    });
  }
};

export const clearCookies = () => {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie = `${keys[i]}=0;path=/;expires=${new Date(
        0,
      ).toUTCString()}`;
    }
  }
};

export const loginOutClean = () => {
  const rememberToken = localStorage.getItem('rememberToken');

  // 如果记住了密码，则退出的时候不清除 beeToken和username
  if (rememberToken) {
    //
  } else {
    localStorage.clear();
    clearCookies();
  }
};
