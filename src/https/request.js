import { dataStorage } from '../utils/common';
const API  = uni
export default {
  request(options, method = 'GET') {
    return new Promise((resolve, reject) => {
      API.request({
        ...options,
        method,
        header: {
          'Content-Type': 'application/json',
          Authorization: getApp().globalData.sessionKey,
          // Authorization: dataStorage.getStorage('userAuth') || '',
          ...options.header,
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            API.showToast({
              title: res.data.tips,
              icon: 'none',
              duration: 2000
            })
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },
  put(option) {
    let options = {
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      ...option,
    };
    return this.request(options, 'PUT');
  },
  get(option) {
    return this.request(option, 'GET');
  },
  post(option) {
    let options = {
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      ...option,
    };
    return this.request(options, 'POST');
  },
};
