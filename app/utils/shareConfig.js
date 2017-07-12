// share config control
import { emptyHtml } from 'utils/utils';

import logo from 'assets/images/logo-icon.png';

function onMenuShareTimeline(title, link, imgUrl, success, cancel) {
  wx.onMenuShareTimeline({
    title, // 分享标题
    link, // 分享链接
    imgUrl,
    success,
    cancel,
  });
}

function onMenuShareOther(title, desc, link, imgUrl, success, cancel) {
  // 分享给朋友
  wx.onMenuShareAppMessage({
    title, // 分享标题
    desc, // 分享描述
    link, // 分享链接
    imgUrl,
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success,
    cancel,
  });

  // 分享给QQ
  wx.onMenuShareQQ({
    title,
    desc,
    link,
    imgUrl,
    success,
    cancel,
  });

  // 分享给微博
  wx.onMenuShareWeibo({
    title,
    desc,
    link,
    imgUrl,
    success,
    cancel,
  });

  // 分享给QQ空间
  wx.onMenuShareQZone({
    title,
    desc,
    link,
    imgUrl,
    success,
    cancel,
  });
}

const domain = window.document.domain;
const shareConfig = {
  config: (type, data) => {
    let title = '';
    let desc = '';
    let link = `http://${domain}/public_share.html?type=${type}`;
    let imgUrl = '';
    let success = data.success ? data.success : () => {};
    let cancel = data.cancel ? data.cancel : () => {};

    switch (type) {
      case 'card': {
        const { id, avatar, nickname } = data;
        title = `${nickname}的健康商信名片`;
        desc = `${nickname}邀请你加入健康商信80万行业精英群`;
        link = `${link}&id=${id}`;
        imgUrl = avatar;
        break;
      }
      case 'momment': {
        const { id, nickname, content, pictures } = data;
        title = `分享${nickname}的健康商信动态`;
        desc = emptyHtml(content);
        link = `${link}&id=${id}`;
        imgUrl = pictures.length > 0 ? pictures[0] : `${domain}${logo}`;
      }
      default: {

      }
    }

    onMenuShareTimeline(title, link, imgUrl, success, cancel);
    onMenuShareOther(title, desc, link, imgUrl, success, cancel);
  },

  share: (type, data) => {
    shareConfig.config(type, data);

    // add weixin here to double check for weixin config
    wx.ready(shareConfig.config(type, data));
  },
};

export default shareConfig;
