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
