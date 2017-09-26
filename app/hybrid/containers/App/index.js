/**
 *
 * share react.app
 *
 * this containers is to control the url query to show defined page
 * 
 * Format as below
 * 传递url地址：
 *  http://wap-jkhz.alijian.net/hybrid.html?type=' + type + "&token=" + token + "&other param" = 其他需要的参数
 *
 * 新人领奖:
 *  type: welcome
 *  number: 5
 *
 * 抽奖:
 *   type: lottery
 *
 */

import React from 'react';

import { getQueryString } from 'utils/utils';
import Welcome from 'hybrid/containers/Welcome';
import Lottery from 'hybrid/containers/Lottery';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  componentWillMount() {
    const token = getQueryString('token', '');
    localStorage.setItem('access_token', token);
  }

  render() {
    const path = getQueryString('path', '');
    const money = getQueryString('money', '');
    return (
      <div style={{ fontSize: '0.24rem' }}>
        {React.Children.toArray(this.props.children)}
        {path === 'welcome' && <Welcome money={money} />}
        {path === 'prize' && <Lottery />}
      </div>
    );
  }
}
