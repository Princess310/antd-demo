import lrz from 'lrz';
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
  const res  = await lrz(file);
  const path = `${filePath}__${res.fileLen}__${oss.getFileSuffix(res.origin.name)}`;
  const uploadRes = await oss.multipartUpload(path, res.formData.get('file'));

  const url = oss.getImgDomain(oss.getFileDomain() + oss.getFilePath(uploadRes.name));

  return url;
}
