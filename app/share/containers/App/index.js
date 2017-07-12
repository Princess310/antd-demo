/**
 *
 * share react.app
 *
 * this containers is to control the url query to show defined page
 */

import React from 'react';

import ShareBusinessPage from 'share/containers/ShareBusinessPage';
import ShareUserInfoPage from 'share/containers/ShareUserInfoPage';

import { getQueryString } from 'utils/utils';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    let type = getQueryString('type', 'default');
    const id = getQueryString('id');

    if (type.indexOf('share_') > -1) {
      type = type.slice(6, type.length);
    }

    return (
      <div>
        {React.Children.toArray(this.props.children)}
        {type === 'momment' && <ShareBusinessPage id={id} />}
        {type === 'card' && <ShareUserInfoPage id={id} />}
      </div>
    );
  }
}
