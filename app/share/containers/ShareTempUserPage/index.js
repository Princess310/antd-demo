/*
 *
 * ShareUserInfoPage
 *
 */

import React, { PropTypes } from 'react';

import styled from 'styled-components';
import pallete from 'styles/colors';
import Helmet from 'react-helmet';

import TouchLoader from 'components/TouchLoader';
import UserInfoCard from 'components/UserInfoCard';
import MomentInfoCard from 'components/MomentCard/ShareMomentInfoCard';
import AppContent from 'components/AppContent';
import { WhiteSpace, Icon } from 'antd-mobile';
import DownloadBar from 'share/components/DownloadBar';

import request from 'utils/shareRequest';

import shareConfig from 'utils/shareConfig';

const ContentWrapper = styled.div`
  padding: 0 0.24rem 0.2rem;
  font-size: 0.3rem;
  color: #333333;
  background-color: ${pallete.white};
`;

const Title = styled.div`
  padding-top: 0.24rem;
  font-size: 0.32rem;
`;

const Content = styled.div`
  margin-top: 0.2rem;
`;

export class ShareTempUserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
      userInfo: null,
      supplier: {
        page: 1,
        loading: false,
        list: false,
        hasNext: false,
      },
    };
  }

  componentWillMount() {
    const { startPage } = this.state;

    // fetch moments
    this.handleFetchInfo(startPage);
  }

  handleFetchInfo = (page) => {
    const self = this;
    const { id, uid } = this.props;
    const { userInfo, supplier } = this.state;

    if (page !== 1) {
      this.setState({
        supplier: {
          loading: true,
          ...supplier,
        },
      });
    }

    request.doGet('moments/ali-user-info', { fid: id, page, uid, 'from_share': 1})
      .then((res) => {
        const { info, list, page } = res;

        let hasNext = true;

        if (page) {
          if (page.current_page >= page.page_count) {
            hasNext = false;
          }
        } else {
          hasNext = false;
        }

        if (!userInfo) {
          self.setState({
            userInfo: info,
          });

          shareConfig.share('temp_user', info, info.share_user);
        }

        self.setState({
          supplier: {
            page: (page ? page.current_page : 1),
            loading: false,
            list: supplier.list ? [...supplier.list, ...list] : list,
            hasNext,
          },
        });
      });
  }

  onEndReached = () => {
    const { supplier } = this.state;

    this.handleFetchInfo(supplier.page + 1);
  }

  render() {
    const { userInfo, supplier } = this.state;

    const loading = supplier.loading;
    const hasNext = supplier.hasNext;

    return userInfo ? (
      <div>
        <Helmet
          title={userInfo.username}
          meta={[
            { name: 'description', content: '健康商信' },
            { name: 'keywords', content: '健康, 商业, 健康商信' },
          ]}
        />
        <TouchLoader
          initializing={0}
          hasMore={hasNext}
          loading={loading}
          onLoadMore={this.onEndReached}
          autoLoadMore={true}
          className="tloader app-content"
          style={{ top: 0, paddingBottom: '2rem' }}
        >
          <div>
            <UserInfoCard user={{ is_my_friend: 1, nickname: userInfo.username, ...userInfo }} />
            <WhiteSpace />
            {(userInfo.registered_fund !== '' || userInfo.business_scope !== '') && (
              <ContentWrapper>
                {userInfo.registered_fund && (
                  <div>
                    <Title style={{ fontWeight: 'bolder' }}>注册资金</Title>
                    <Content style={{ color: '#999999' }}>{userInfo.registered_fund}</Content>
                  </div>
                )}
                {userInfo.business_scope && (
                  <div>
                    <Title style={{ fontWeight: 'bolder' }}>经营范围</Title>
                    <Content style={{ color: '#999999' }}>{userInfo.business_scope}</Content>
                  </div>
                )}
              </ContentWrapper>
            )}
            <WhiteSpace />
            {userInfo.business_intro && (
              <ContentWrapper>
                <Title>业务介绍</Title>
                <Content>{userInfo.business_intro}</Content>
              </ContentWrapper>
            )}
          </div>
          <WhiteSpace />
          <ContentWrapper>
            <Title>他的供应</Title>
            <Content>
              {supplier.list && supplier.list.map(moment => (
                <MomentInfoCard
                  key={moment.id}
                  moment={{ ...moment, pictures: [moment.pictures] }}
                  style={{ padding: 0 }}
                />
              ))}
            </Content>
          </ContentWrapper>
          <DownloadBar />
        </TouchLoader>
      </div>
    ) : null;
  }
}

ShareTempUserPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareTempUserPage;
