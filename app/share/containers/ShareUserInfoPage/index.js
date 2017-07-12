/*
 *
 * ShareUserInfoPage
 *
 */

import React, { PropTypes } from 'react';

import styled from 'styled-components';
import pallete from 'styles/colors';
import { zeroFull } from 'utils/utils';

import TouchLoader from 'components/TouchLoader';
import CompHeader from 'components/CompHeader';
import ExpandContent from 'components/UserInfoCard/ExpandContent';
import Gallery from 'components/UserInfoCard/ShareGallery';
import UserInfoCard from 'components/UserInfoCard';
import MomentInfoCard from 'components/MomentCard/ShareMomentInfoCard';
import AppContent from 'components/AppContent';
import { NavBar, Tabs, WhiteSpace, Icon } from 'antd-mobile';

import request from 'utils/shareRequest';

import shareConfig from 'utils/shareConfig';

const ListWrapper = styled.div`
  display: flex;
  backgroundColor: ${pallete.white};
`;

const TabPane = Tabs.TabPane;
export class ShareUserInfoPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      startPage: 1,
      type: 2,
      userInfo: null,
      myMomentsDemand: {
        page: 1,
        loading: false,
        list: false,
        hasNext: false,
      },
      myMomentsSupplier: {
        page: 1,
        loading: false,
        list: false,
        hasNext: false,
      },
    };
  }

  componentWillMount() {
    const self = this;
    const { id } = this.props;
    const { type, startPage } = this.state;

    request.doGet('match/view', {
      id,
      from_share: 1,
    }).then((res) => {
      const { data } = res;

      this.setState({
        userInfo: data,
      });

      shareConfig.share('card', data);
    });

    // fetch my moments
    this.handleFetchMyMoments(type, startPage);
  }

  handleSetMomentsLoading = (loading) => {
    const { type, myMomentsDemand, myMomentsSupplier } = this.state;

    if (type === 2) {
      this.setState({
        myMomentsDemand: {
          loading,
          ...myMomentsDemand,
        },
      });
    } else {
      this.setState({
        myMomentsSupplier: {
          loading,
          ...myMomentsSupplier,
        },
      });
    }
  }

  handleFetchMyMoments = (type, page) => {
    const self = this;
    const { id } = this.props;

    if (page !== 1) {
      this.handleSetMomentsLoading(true);
    }

    request.doGet('moments/my-supplier-demand', { reward_as: type, page, uid: id })
      .then((res) => {
        const { list, page } = res;

        let hasNext = true;

        if (page) {
          if (page.current_page >= page.page_count) {
            hasNext = false;
          }
        } else {
          hasNext = false;
        }

        if (type === 2) {
          self.setState({
            myMomentsDemand: {
              page: (page ? page.current_page : 1),
              loading: false,
              list,
              hasNext,
            },
          });
        } else {
          self.setState({
            myMomentsSupplier: {
              page: (page ? page.current_page : 1),
              loading: false,
              list,
              hasNext,
            },
          });
        }
      });
  }

  handleTabClick = (key) => {
    const { startPage, myMomentsSupplier } = this.state;
    const type = Number(key);

    this.setState({
      type,
    });

    if (type === 1 && !myMomentsSupplier.list) {
      this.handleFetchMyMoments(type);
    }
  }

  handleSortYar = (list) => {
    const yearList = [];
    const sortedList = [];

    list && list.forEach((moment) => {
      const date = new Date(moment.created_at * 1000);
      const year = date.getFullYear();

      if (yearList.findIndex((y) => y === year) === -1) {
        yearList.push(year);
        sortedList.push({
          year,
          list: [],
        });
      }

      sortedList.forEach((sortedObj) => {
        if (sortedObj.year === year) {
          sortedObj.list.push(moment);
        }
      });
    });

    return sortedList;
  }

  handleSortList = (list) => {
    const dateList = [];
    const sortedList = [];

    list && list.forEach((moment) => {
      const date = new Date(moment.created_at * 1000);
      const d = zeroFull(date.getDate());
      const m = zeroFull(date.getMonth() + 1);
      const dm = `${d}-${m}`;

      if (dateList.findIndex((i) => i === dm) === -1) {
        dateList.push(dm);
        sortedList.push({
          dm,
          date: {
            d,
            m,
          },
          list: [],
        });
      }

      sortedList.forEach((sortedObj) => {
        if (sortedObj.dm === dm) {
          sortedObj.list.push(moment);
        }
      });
    });

    return sortedList;
  }

  onEndReached = () => {
    const { type } = this.state;
  }

  render() {
    const { type, userInfo, myMomentsDemand, myMomentsSupplier } = this.state;

    const loading = (type === 2 && myMomentsDemand.loading) || (type === 1 && myMomentsSupplier.loading);
    const hasNext = (type === 2 && myMomentsDemand.hasNext) || (type === 1 && myMomentsSupplier.hasNext);
    
    const sortedDemand = this.handleSortYar(myMomentsDemand.list);
    const sortedSupplier = this.handleSortYar(myMomentsSupplier.list);

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
        >
          {userInfo ? userInfo.nickname : '用户详情'}
        </NavBar>
        <TouchLoader
          initializing={0}
          hasMore={hasNext}
          loading={loading}
          onLoadMore={this.onEndReached}
          autoLoadMore={true}
          className="tloader app-content"
        >
          <WhiteSpace size="md" />
          {userInfo && (
            <div>
              <UserInfoCard user={userInfo} />
              {userInfo.intro !== '' && (
                <div>
                  <WhiteSpace size="md" />
                  <ExpandContent title="个人简介" content={userInfo.intro} />
                </div>
              )}
              {userInfo.business_intro !== '' && (
                <div>
                  <WhiteSpace size="md" />
                  <ExpandContent title="业务介绍" content={userInfo.business_intro} />
                </div>
              )}
              {
                userInfo.pictures.length > 0 && (
                  <div>
                    <WhiteSpace size="md" />
                    <Gallery
                      title="展示图片"
                      pictures={userInfo.pictures}
                    />
                  </div>
                )
              }
            </div>
          )}
          <WhiteSpace size="md" />
          <Tabs defaultActiveKey="2" swipeable={false} onChange={this.callback} onTabClick={this.handleTabClick}>
            <TabPane tab="Ta的需求" key="2">
              {sortedDemand.map((sortedDemand, i) => (
                <div key={i}>
                  <CompHeader>{sortedDemand.year}年</CompHeader>
                  {this.handleSortList(sortedDemand.list).map((sortedObj, i) => {
                    return (
                      <ListWrapper key={i}>
                        <div style={{
                          paddingTop: '0.24rem',
                          paddingLeft: '0.12rem',
                          width: '1.2rem',
                        }}>
                          <span>{sortedObj.date.d}</span>
                          <span style={{ marginLeft: '0.08rem', fontSize: '0.24rem' }}>{sortedObj.date.m}月</span>
                        </div>
                        <div style={{
                          width: '100%',
                        }}>
                          {sortedObj.list.map((moment) => (
                            <MomentInfoCard
                              key={moment.id}
                              moment={moment}
                            />
                          ))}
                        </div>
                      </ListWrapper>
                    );
                  })}
                </div>
              ))}
            </TabPane>
            <TabPane tab="Ta的供应" key="1">
              {sortedSupplier.map((sortedDemand, i) => (
                <div key={i}>
                  <CompHeader>{sortedDemand.year}年</CompHeader>
                  {this.handleSortList(sortedDemand.list).map((sortedObj, i) => {
                    return (
                      <ListWrapper key={i}>
                        <div style={{
                          paddingTop: '0.24rem',
                          paddingLeft: '0.12rem',
                          width: '1.2rem',
                        }}>
                          <span>{sortedObj.date.d}</span>
                          <span style={{ marginLeft: '0.08rem', fontSize: '0.24rem' }}>{sortedObj.date.m}月</span>
                        </div>
                        <div style={{
                          width: '100%',
                        }}>
                          {sortedObj.list.map((moment) => (
                            <MomentInfoCard
                              key={moment.id}
                              moment={moment}
                            />
                          ))}
                        </div>
                      </ListWrapper>
                    );
                  })}
                </div>
              ))}
            </TabPane>
        </Tabs>
        </TouchLoader>
      </div>
    );
  }
}

ShareUserInfoPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareUserInfoPage;
