// share config control
import { emptyHtml } from 'utils/utils';
import { getQueryString } from 'utils/utils';
import request from 'utils/request';
import brower from 'utils/brower';
import { getHongbaoInfo, filterEmojiStr } from 'utils/utils';

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
  config: (type, data, user) => {
    let title = '80万行业资源平台，找讲师、找厂家、找经销商就上健康商信！';
    let timeLineTitle = '';
    let desc = '';
    let link = `http://${domain}/public_share.html?type=${type}`;
    let imgUrl = '';
    let success = data.success ? data.success : () => {};
    let cancel = data.cancel ? data.cancel : () => {};
    const uid = getQueryString('uid');
    const shareId = getQueryString('id');
    const hongbaoInfo = getHongbaoInfo();

    switch (type) {
      case 'app': {
        const { name } = data;
        title = hongbaoInfo.isHongbao ? '邀请健康行业朋友下载赢现金红包' : `${name ? name : ''}邀请您加入健康商信APP`;
        timeLineTitle = hongbaoInfo.isHongbao ? `${name ? name : ''}下载健康商信APP获得${hongbaoInfo.newer_money}元现金红包，邀请健康行业的朋友也来下载。` : `${name ? name : ''}邀请您加入健康商信APP，80万行业资源平台，找讲师、找厂家、找经销商就上健康商信！`;
        desc = hongbaoInfo.isHongbao ? `${name ? name : ''}下载健康商信APP获得${hongbaoInfo.newer_money}元现金红包，邀请健康行业的朋友也来下载。` : `80万行业资源平台，找讲师、找厂家、找经销商就上健康商信！`;
        link = `http://${domain}/group_share.html?&name=${name ? encodeURIComponent(name) : ''}&uid=${uid}`;
        imgUrl = `http://${domain}${logo}`;
        break;
      }
      case 'card': {
        const { id, avatar, nickname, company, position } = data;
        title = `${nickname}的健康商信名片`;
        timeLineTitle = `分享${nickname}的健康商信名片，公司：${company}，职位：${position}`;
        desc = `公司：${company}，职位：${position}`;
        link = `${link}&id=${id}&uid=${uid}`;
        imgUrl = avatar;
        break;
      }
      case 'momment': {
        const { id, nickname, title:cmsTitle, content, pictures, company, position, avatar } = data;
        title = cmsTitle ? cmsTitle : (content.trim() !== '' ? emptyHtml(content) : `分享${nickname}的健康商信动态`);
        timeLineTitle = `${cmsTitle ? cmsTitle : emptyHtml(content)} 健康商信APP：${user ? `${user.company}.${user.position}.${user.nickname}` : `${company}.${position}.${nickname}`}在分享动态，邀请您也来分享`;
        desc = `${cmsTitle ? cmsTitle + ' ' : ''}健康商信APP：${user ? `${user.company}.${user.position}.${user.nickname}` : `${company}.${position}.${nickname}`}在分享动态，邀请您也来分享`;
        link = `${link}&id=${id}&uid=${uid}`;
        imgUrl = pictures.length > 0 ? pictures[0] : (avatar !== '' ? avatar : `http://${domain}${logo}`);
        break;
      }
      case 'note': {
        const { id, nickname, content, pictures, company, position, avatar } = data;
        title = `${user ? user.nickname : nickname}分享了一条群公告`;
        timeLineTitle = `${user ? `${user.company}.${user.position}.${user.nickname}` : `${company}.${position}.${nickname}`}在分享群公告，点击了解详情`;
        desc = timeLineTitle;
        link = `${link}&id=${id}&uid=${uid}`;
        imgUrl = pictures.length > 0 ? pictures[0] : (avatar !== '' ? avatar : `http://${domain}${logo}`);
        break;
      }
      case 'jk_group': {
        const { id, name, head } = data;
        title = `${user ? user.nickname : ''}邀请您加入${name}`;
        timeLineTitle = `${user ? `${user.company}.${user.position}.${user.nickname}` : ``}邀请您加入健康商信${name}`;
        desc = timeLineTitle;
        link = `${link}&id=${id}&uid=${uid}`;
        imgUrl = head;
        break;
      }
      case 'stock': {
        const { id, name, images, user_info } = data;
        title = `${user_info ? user_info.nickname : ''}正在清仓处理${name}的库存，赶快来看看吧！`;
        timeLineTitle = title;
        desc = `下载健康商信APP，您也可以清理您积压的库存！`;
        link = `${link}&id=${id}&uid=${uid}`;
        imgUrl = images.length > 0 ? images[0] : `http://${domain}${logo}`;
        break;
      }
      case 'packet': {
        const { id, pictures, avatar, nickname } = data;
        title = `${nickname ? nickname + '的' : ''}红包广告分享`;
        timeLineTitle = `${user ? user.nickname : ''}在分享红包广告，邀请您也来分享！`;
        desc = timeLineTitle;
        link = `${link}&id=${id}&uid=${uid}`;
        imgUrl = (pictures && pictures.length > 0) ? pictures[0] :  (avatar !== '' ? avatar : `http://${domain}${logo}`);

        break;
      }
      case 'investment': {
        const { id, title: t, content, pictures } = data;
        title = t;
        timeLineTitle = `${title}.${content}`;
        desc = content;
        link = `${link}&id=${shareId}&uid=${uid}`;
        imgUrl = (pictures && pictures.length > 0) ? pictures[0] :  (avatar !== '' ? avatar : `http://${domain}${logo}`);

        break;
      }
      case 'temp_user': {
        const { username, company, position } = data;
        title = `${username}的健康商信名片`;
        timeLineTitle = `分享${username}的健康商信名片，公司：${company}，职位：${position}`;
        desc = `公司：${company}，职位：${position}`;
        link = `${link}&id=${shareId}&uid=${uid}`;
        imgUrl = `http://${domain}${logo}`;
        break;
      }
      default: {
      }
    }

    // title limit: 30, content limit: 50
    title = filterEmojiStr(title).substring(0, 30);
    desc = filterEmojiStr(desc).substring(0, 50);
    timeLineTitle = filterEmojiStr(timeLineTitle).substring(0, 50);

    onMenuShareTimeline(timeLineTitle, link, imgUrl, success, cancel);
    onMenuShareOther(title, desc, link, imgUrl, success, cancel);

    // share config for QQ
    window.setShareInfo && window.setShareInfo({
      title,
      summary: desc,
      pic: imgUrl,
      url: link,
    });

    return {
      title, desc, link, imgUrl
    };
  },

  share: (type, data, user) => {
    // add weixin here to double check for weixin config
    wx.ready(() => {
      shareConfig.config(type, data, user);
    });

    return shareConfig.config(type, data, user);
  },

  wxConfig: () => {
    // share api config
    if (brower.checkIfWeixin()) {
      request.doGet('user/js-api-config', {
        url: encodeURIComponent(location.href.split('#')[0]),
      })
        .then((res) => {
          let { list } = res;
          list.debug = false;

          wx.apiConfig = list;
          wx.config(list);
        })
    }
  },
};

export default shareConfig;
