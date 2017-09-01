/**
 *
 * share react.app
 *
 * this containers is to control the url query to show defined page
 * 
 * Format as below
 * 
 * 传递url地址：
 *  http://wap-jkhz.alijian.net/public_share.html?type=' + type + "&id=" + id + "&uid" = 分享人的id
 *
 * APP:
 *  链接: http://wap-jkhz.alijian.net/group_share.html?name=人的名字
 *
 * 名片:
 *   type: card
 *   id: 传递被分享用户的id
 *
 * 动态:
 *   type: momment
 *   id: 传递被分享动态的id
 *
 * 群公告:
 *   type: note
 *   id: 传递被分享动态的id
 *
 * 健康会展app分享和群分享:
 *   type: jk_group
  *  id: (1.分享群组的话，带群组id，2.分享app不用传)
 */

import React from 'react';

import ShareBusinessPage from 'share/containers/ShareBusinessPage';
import ShareUserInfoPage from 'share/containers/ShareUserInfoPage';
import ShareGroupPage from 'share/containers/ShareGroupPage';
import ShareNotePage from 'share/containers/ShareNotePage';

import { getQueryString } from 'utils/utils';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    let type = getQueryString('type', 'default');
    const id = getQueryString('id');
    const uid = getQueryString('uid');
    const name = getQueryString('name');

    if (type.indexOf('share_') > -1) {
      type = type.slice(6, type.length);
    }

    var m = new OpenInstall({
      /*appKey必选参数，openinstall平台为每个应用分配的ID,在开发者平台可查看此appKey*/
      appKey : ewrjhz
      /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；
        个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
      //apkFileName : "OpenInstallDemo-v2-1.1.1.apk",
    }, {
      uid: 6,
    });

    m.wakeupOrInstall({timeout:500});

    return (
      <div>
        {React.Children.toArray(this.props.children)}
        {type === 'momment' && <ShareBusinessPage id={id} uid={uid} />}
        {type === 'card' && <ShareUserInfoPage id={id} uid={uid} />}
        {type === 'jk_group' && <ShareGroupPage id={id} uid={uid} />}
        {type === 'note' && <ShareNotePage id={id} uid={uid} />}
      </div>
    );
  }
}
