import 'whatwg-fetch';
import { Toast } from 'antd-mobile';
import md5 from 'md5';
import { Base64 } from 'js-base64';

export const API_ROOT = 'http://jkhz-api-dev.test.alijian.net/index.php?r=';
export const WEB_ROOT = 'http://jkhz-wap.test.alijian.net/';

const fetchDao = {
  doGet(url, params) {
    return this.request('GET', url, params);
  },

  doPost(url, params) {
    return this.request('POST', url, params);
  },

  doPut(url, params) {
    return this.request('PUT', url, params);
  },

  doDelete(url, params) {
    return this.request('DELETE', url, params);
  },

  doUploadFile(url, params) {
    return this.request('POST', url, params, true);
  },

  getWebRoot() {
    return WEB_ROOT;
  },

  getDomain() {
    return window.document.domain;
  },

  paramsParse(params) {
    const arr = [];

    Object.keys(params).forEach((key) => {
      arr.push(`${key}=${params[key]}`);
    });

    return `& + ${arr.join('&')}`;
  },

  request(method, u, params, file) {
    const self = this;
    let url = API_ROOT + u;
    const config = {
      method,
      headers: {},
      credentials: 'same-origin',
    };

    if ((method === 'GET') && typeof params !== 'undefined') {
      url += self.paramsParse(params);
    }

    // only post method to add body config
    if (method !== 'GET') {
      if (typeof params === 'undefined') {
        params = {};
      }

      const t = new Date();
      const times = t.getTime();
      params['_ts'] = times
    }
    if ((method !== 'GET') && typeof params !== 'undefined') {
      const payload = [];
      let signParams = [];
      let signParamsResult = [];
      Object.keys(params).forEach((key) => {
        payload.push(`${key}=${params[key]}`);
      });

      config.body = payload.join('&');
      signParams = payload.sort((a, b) => {
        const key1 = a.split('=')[0];
        const key2 = b.split('=')[0];
        return key1.localeCompare(key2);
      });
      signParams = signParams.reverse();
      // do resort
      signParams.forEach((p) => {
        const ps = p.split('=');
        signParamsResult.push(`${Base64.encode(ps[0])}=${Base64.encode(ps[1])}`);
      });

      // add x-sign header for params sign
      const s = md5(signParamsResult.join('&'));
      const s2 = md5(s + 'web_123456');
      let signStr = s2.toUpperCase();
      config.headers['X-Sign'] = Base64.encode(signStr);

      if (file) {
        const formData = new FormData();
        formData.append('file', params.file);
        config.body = formData;
      } else {
        // change the Content-Type for mime
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      }
    }

    Toast.loading('加载中...', 10);
    return new Promise((resolve, reject) => {
      fetch(url, config)
      .then(self.checkStatus)
      .then(self.parseJSON)
      .then((data) => {
        // remove the toast after responded
        Toast.hide();

        if (data && data.code !== 200) {
          Toast.info(data.message, 2);
        } else {
          resolve(data);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  },

  parseJSON(response) {
    return response.json();
  },
};

export default fetchDao;
