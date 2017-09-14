/*
 *
 * ShareAppPage
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { WhiteSpace, Icon } from 'antd-mobile';
import AppContent from 'components/AppContent';
import DownloadBtn from 'share/components/DownloadBtn';

import pallete from 'styles/colors';
import request from 'utils/shareRequest';
import { zeroFull } from 'utils/utils';
import { getQueryString } from 'utils/utils';
import shareConfig from 'utils/shareConfig';

import HongbaoTitle from './HongbaoTitle';
import HongbaoBackground from './HongbaoBackground';
import HongbaoFooter from './HongbaoFooter';
import HongBaoList from './HongBaoList';
import HongbaoDesc from './HongbaoDesc';

import gif from 'assets/images/exhibition-share.gif';

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export class ShareAppPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      isLike: false,
      likeCount: 3024,
      viewCount: 100000,
      hongbaoList: [],
      hongbaoTotal: 0,
    };
  }

  componentWillMount() {
    const name = getQueryString('name');

    shareConfig.share('app', { name });

    request.doGet('user/scroll-red-packet-list').then((res) => {
      const { data: { list, total } } = res;
      this.setState({
        hongbaoList: list,
        hongbaoTotal: total,
      });
    });
  }

  handleLike = () => {
    this.setState({
      isLike: !this.state.isLike,
    });
  }

  render() {
    const { isLike, likeCount, viewCount, hongbaoList, hongbaoTotal } = this.state;
    const date = new Date();
    const dateStr = `${zeroFull(date.getFullYear())}-${zeroFull(date.getMonth() + 1)}-${zeroFull(date.getDate())}`;
    const isHongbao = true;

    const contentView = isHongbao ? (
      <div style={{ backgroundColor: pallete.white, paddingBottom: '1.74rem' }}>
        <HongbaoTitle />
        <HongbaoBackground>
          {hongbaoList.length > 0 && <HongBaoList list={hongbaoList}/>}
          <HongbaoDesc count={hongbaoTotal}/>
        </HongbaoBackground>
        <HongbaoFooter />
      </div>
    ) : (
      <div style={{
        padding: '0.48rem 0',
        backgroundColor: pallete.white,
      }}>
        <div style={{ fontSize: '0.48rem', paddingLeft: '0.24rem', letterSpacing: '0.04rem' }}>邀请您加入全国健康产业群</div>
        <WhiteSpace size="sm" />
        <ItemWrapper style={{ fontSize: '0.36rem', color: '#8c8c8c', paddingLeft: '0.24rem' }}>
          <div>{dateStr}</div>
          <div style={{ marginLeft: '0.24rem' }}>健康商信APP</div>
        </ItemWrapper>
        <WhiteSpace />
        <div
          style={{
            overflow: 'hidden',
            height: '4rem',
            margin: '0 0.08rem',
            padding: '0.08rem',
            backgroundColor: '#ececec',
          }}
        >
          <img role="presetation" src={gif} style={{ width: '100%', height: '100%' }} />
        </div>
        <WhiteSpace />
        <div style={{ fontSize: '0.36rem', padding: '0 0.2rem' }}>
          <div>“免费”下载《健康商信》</div>
          <div>1：在这里发布您的需求是您现在的选择！</div>
          <div>2：在这里推广依然是您现在的选择！</div>
        </div>
        <DownloadBtn label="点击下载进群" />
        <ItemWrapper style={{ paddingLeft: '0.24rem' }}>
          <div>阅读 {viewCount}+</div>
          <ItemWrapper onClick={this.handleLike}>
            <Icon type={require('icons/ali/点赞.svg')} size="sm" style={{ marginLeft: '0.48rem' }} color={isLike ? pallete.theme : '#4d5059'} />
            <div style={{ marginLeft: '0.08rem' }}>{isLike ? likeCount + 1 : likeCount}</div>
          </ItemWrapper>
        </ItemWrapper>
      </div>
    );

    return (
      <div>
        {contentView}
      </div>
    );
  }
}

ShareAppPage.propTypes = {
};

export default ShareAppPage;
