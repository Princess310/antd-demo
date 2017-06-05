import date from './date';

const OSS_REGION = 'oss-cn-hangzhou';
const IMG_REGION = 'img-cn-hangzhou';
const ACCESS_KEY_ID = 'n70Ga5w3Bw4nCxNB';
const ACCESS_KEY_SECRET = 'ApAmZ2VhKIcWzaSYIM6ee9WAa1tb04';
const BUCKET_NAME = 'alijian-yaoyue-uploads-1';
const DOMAIN = 'http://alijian-yaoyue-uploads-1.oss-cn-hangzhou.aliyuncs.com/';
const module = {
  chat: 'chat',
  avatar: 'avatar',
  moments: 'moments',
};

const client = new OSS.Wrapper({
  region: OSS_REGION,
  accessKeyId: ACCESS_KEY_ID,
  accessKeySecret: ACCESS_KEY_SECRET,
  bucket: BUCKET_NAME,
});

const oss = {
  list: (maxKeys) => (new Promise((resolve, reject) => {
    client.list({
      'max-keys': maxKeys,
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })),
  multipartUpload: (storeAs, file) => (new Promise((resolve, reject) => {
    client.multipartUpload(storeAs, file).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })),
  signatureUrl: (saveAs, objectKey) => (new Promise((resolve, reject) => {
    client.signatureUrl(objectKey, {
      expires: 3600,
      response: {
        'content-disposition': `attachment; filename=${saveAs}`,
      },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })),
  getFolderPath: (m, userId) => {
    const path = module[m];
    const prefix = date.getRoundTimeStr();

    return `${path}/${userId}/${prefix}`;
  },
  getSourthRegionPath: () => (OSS_REGION),
  getImgRegionPath: () => (IMG_REGION),
  getFileDomain: () => (DOMAIN),
  // url地址的问号转义，也可以用encodeURL
  getFilePath: (str) => (str.replace('?', '%3F')),
  // 获取文件后缀名
  getFileSuffix: (fileName) => {
    const fileExt = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName.toLowerCase()) : '';
    return `.${fileExt}`;
  },
  getImgSuitablePath: (path) => {
    const arr1 = path.split('__');
    const size = arr1[arr1.length - 2];

    // 150kb for now
    const checkPicSize = 150 * 1024;
    let resizePercent = 100;

    if (path.indexOf("__") >= 0) {
      if (Number(size) > checkPicSize) {
        resizePercent = Math.round(checkPicSize / (size * 100));

        if (resizePercent === 0) {
          resizePercent = 1;
        }
      }

      return `${path}@${resizePercent}p`;
    }

    return path;
  },
  // 将缩小的图片地址转换成原有地址
  getImgSourcePath: (path) => {
    const str = '__.';
    let newPath = path;

    if (path.indexOf(str) >= 0) {
      const arr = path.split('__.');
      const fix = arr[1].split('@')[0];
      newPath = arr[0] + str + fix;
    }

    return newPath;
  },
  getAudioTime: (path) => {
    const str = '__.';
    let time = 0;
    if (path.indexOf(str) >= 0) {
      const arr = path.split('__');
      time = arr[arr.length - 2];
    }

    return time;
  },
  // 文件路径转换
  getImgDomain: (url) => {
    const path = oss.getSourthRegionPath();
    const imgPath = oss.getImgRegionPath();
    const regex = new RegExp(path);

    return url.replace(regex, imgPath);
  },
};

export default oss;
