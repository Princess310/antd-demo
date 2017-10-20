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
 *   id: (1.分享群组的话，带群组id，2.分享app不用传)
 * 
 * 库存清仓:
 *   type: stock
 *   id: 传递被分享库存的id
 */

import React from 'react';
import Loader from 'components/Loader';
import FlexCenter from 'components/FlexCenter';
import { getQueryString } from 'utils/utils';

const rootStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
};

let ShareContainerPage = null;

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  static propTypes = {
    children: React.PropTypes.node,
  };

  componentDidMount() {
    const self = this;
    let type = getQueryString('type', 'default');

    if (type.indexOf('share_') > -1) {
      type = type.slice(6, type.length);
    }

    this.loadPage(type);
  }

  loadPage = (type) => {
    const self = this;

    // So, we do the asynchronous load containers for share page, which is better than load all things at first time
    switch(type) {
      case 'momment': {
        import('share/containers/ShareBusinessPage')
          .then((cb) => {
            self.loadModule(cb);
          });
        
        break;
      }
      case 'card': {
        import('share/containers/ShareUserInfoPage')
          .then((cb) => {
            self.loadModule(cb);
          });
        
        break;
      }
      case 'jk_group': {
        import('share/containers/ShareGroupPage')
          .then((cb) => {
            self.loadModule(cb);
          });

        break;
      }
      case 'note': {
        import('share/containers/ShareNotePage')
          .then((cb) => {
            self.loadModule(cb);
          });

        break;
      }
      case 'stock': {
        import('share/containers/ShareStockPage')
          .then((cb) => {
            self.loadModule(cb);
          });

        break;
      }
    }
  }

  loadModule = (componentModule) => {
    ShareContainerPage = componentModule.default;
    this.setState({
      loaded: true,
    });
  };

  render() {
    const id = getQueryString('id');
    const uid = getQueryString('uid');
    const name = getQueryString('name');

    const { loaded } = this.state;

    return (
      <div>
        {React.Children.toArray(this.props.children)}
        {loaded ? <ShareContainerPage id={id} uid={uid} /> : (
          <FlexCenter style={rootStyle}>
            <Loader />
          </FlexCenter>
        )}
      </div>
    );
  }
}
