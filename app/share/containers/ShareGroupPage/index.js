/*
 *
 * ShareGroupPage
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';
import AppContent from 'components/AppContent';
import DownloadBtn from 'share/components/DownloadBtn';

import pallete from 'styles/colors';
import request from 'utils/shareRequest';
import shareConfig from 'utils/shareConfig';

import gif from 'assets/images/exhibition-share.gif';

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export class ShareGroupPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      group: null,
    };
  }

  componentWillMount() {
    const { id, uid } = this.props;

    if (id && id !== '') {
      request.doGet('group/detail', {
        group_id: id,
        uid,
        'from_share': 1
      }).then((res) => {
        const { data } = res;
        const { share_user } = data;

        this.setState({
          group: data,
        });

        shareConfig.share('jk_group', data, share_user);
      });
    } else {
      shareConfig.share('app');
    }
  }

  render() {
    const { group } = this.state;

    return (
      <AppContent style={{
        top: 0,
        backgroundColor: pallete.white,
      }}>
        <ItemWrapper style={{ marginTop: '0.48rem', fontSize: '0.4rem' }}>邀请您加入{group ? group.name : '全国健康产业群' }</ItemWrapper>
        <WhiteSpace />
        <ItemWrapper
          style={{
            backgroundColor: '#fe022c',
            color: '#ffea06',
            fontSize: '0.4rem',
          }}
        >80万大健康行业精英汇聚交流</ItemWrapper>
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
        <DownloadBtn />
      </AppContent>
    );
  }
}

ShareGroupPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareGroupPage;
