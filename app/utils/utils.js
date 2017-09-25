//import lrz from 'lrz';
import oss from 'utils/oss';

const utils = {
  parseDom: (arg) => {
    const objE = document.createElement('div');

    objE.innerHTML = arg;
    return objE.childNodes;
  },
};

export default utils;


export async function uploadFile(file, filePath) {
  //const res = await lrz(file);
  //const path = `${filePath}__${res.fileLen}__${oss.getFileSuffix(res.origin.name)}`;
  const path = `${filePath}__${file.size}__${oss.getFileSuffix(file.name)}`;
  const uploadRes = await oss.multipartUpload(path, file);
  const url = oss.getImgDomain(oss.getFileDomain() + oss.getFilePath(uploadRes.name));

  return url;
}

export function parseDistance(distance, city) {
  let result = '';

  if (distance >= 0) {
    if (distance < 1000) {
      result = `${Math.round(distance)} m`;
    } else if (distance < 99 * 1000) {
      result = `${Number(distance / 1000).toFixed(1)} km`;
    } else {
      result = city ? city : '>99km';
    }
  } else {
    result = '未知';
  }
  return result;
}

export function getQueryString(name) {
  const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  const r = window.location.search.substr(1).match(reg);

  return r == null ? (arguments[1] === undefined ? null : arguments[1]) : decodeURIComponent(r[2]);
}

export function zeroFull(str) {
  return str >= 10 ? str : `0${str}`;
}

//去掉所有的html标记
export function emptyHtml(str) {
  return str.replace(/<[^>]+>/g,"");
}

export function getDownloadUrl() {
  const DOWNLOAD_URL = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.alijian.jkhz&winzoom=1';
  return DOWNLOAD_URL;
}

export function linkOpenInstall() {
  if (OpenInstall) {
    const uid = getQueryString('uid');
    const m = new OpenInstall({
      /*appKey必选参数，openinstall平台为每个应用分配的ID,在开发者平台可查看此appKey*/
      appKey : 'ewrjhz',
      /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；
        个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
      //apkFileName : "OpenInstallDemo-v2-1.1.1.apk",
    }, {
      uid: uid,
    });

    m.wakeupOrInstall({ timeout: 500 });
  } else {
    window.location.href = getDownloadUrl();
  }
}

export function parseHash(hash) {
  const pathAndParam = hash.substring(1).split('!');
  let params = {};

  if (pathAndParam[1]) {
    const ps = pathAndParam[1].split("&");
    ps.forEach((param) => {
      const keyVal = param.split('=');
      const key = keyVal[0];
      const val = keyVal[1];
      params[key] = val;
    });
  }

  return {
    path: pathAndParam[0],
    params: params,
  };
}


/**
 * 缓动函数，由快到慢
 * @param {Num} t 当前时间
 * @param {Num} b 初始值
 * @param {Num} c 变化值
 * @param {Num} d 持续时间
 */
export function easeOut(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
};

/**
 * 缓动函数，由慢到快
 * @param {Num} t 当前时间
 * @param {Num} b 初始值
 * @param {Num} c 变化值
 * @param {Num} d 持续时间
 */
export function easeIn(t,b,c,d){
    return c*(t/=d)*t + b;
}

let hongbaoInfo = {};
export function setHongbaoInfo(info) {
  hongbaoInfo = info;
  hongbaoInfo.isHongbao = info['switch_newer'] && info['switch_newer'] === 1
}

export function getHongbaoInfo() {
  return hongbaoInfo;
}

export function resetAnimationFrame() {
  let lastTime = 0;
  let vendors = ['webkit', 'moz'];
  for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                    window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  //if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
          let currTime = new Date().getTime();
          let timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
          console.log('timeToCall', timeToCall);
          let id = window.setTimeout(function() {
              callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };
  //}
  //if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
  //}
}
