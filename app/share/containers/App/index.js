/**
 *
 * share react.app
 *
 * this containers is to control the url query to show defined page
 */

import React from 'react';

import ShareBusinessPage from 'share/containers/ShareBusinessPage';

import { getQueryString } from 'utils/utils';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    const type = getQueryString('type', 'default');
    const id = getQueryString('id');

    return (
      <div>
        {React.Children.toArray(this.props.children)}
        {type === 'momment' && <ShareBusinessPage id={id} />}
      </div>
    );
  }
}
