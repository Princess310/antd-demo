import { emptyHtml } from 'utils/utils';

const title = '健康商信app';

const shareUtil = {
  config: (type, info) => {
    const { url, title, content, pic } = info;
    const shareTitle = emptyHtml(title).substring(0, 120);
    const shareContent = emptyHtml(content).substring(0, 120);
    let winUrl = '';
    switch (type) {
      case 'qq':
        winUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${shareTitle}&desc=${shareContent}&site=${shareTitle}&pics=${pic}&summary=${shareContent}`;
        break;
      case 'sina': 
        winUrl = `http://service.weibo.com/share/share.php?url=${url}&title=${shareTitle}&pic=${pic}&searchPic=false`;
        break;
      default:
        break;
    }

    window.open(winUrl);
  },
};

export default shareUtil;
