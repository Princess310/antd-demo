/*
 *
 * UserInfo
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import pallete from 'styles/colors';
import { zeroFull } from 'utils/utils';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import CompHeader from 'components/CompHeader';
import ExpandContent from 'components/UserInfoCard/ExpandContent';
import Gallery from 'components/UserInfoCard/Gallery';
import UserInfoCard from 'components/UserInfoCard';
import MomentInfoCard from 'components/MomentCard/MomentInfoCard';
import AppContent from 'components/AppContent';
import { NavBar, Popover, Tabs, WhiteSpace, Icon } from 'antd-mobile';

import { makeSelectUserInfo } from 'containers/UserCenter/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectMyMomentsDemand, makeSelectMyMomentsSupplier } from 'containers/BusinessPage/selectors';
import { fetchUserInfo, loadUserInfo, doFollow } from 'containers/UserCenter/actions';
import { fetchMyMoments } from 'containers/BusinessPage/actions';

const ListWrapper = styled.div`
  display: flex;
  backgroundColor: ${pallete.white};
`;

const Item = Popover.Item;
const TabPane = Tabs.TabPane;
export class UserInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      visiblePopover: false,
      selected: '',
      startPage: 1,
      type: 2,
    };
  }

  componentWillMount() {
    const { location: { query: { id } }, getUserInfo, getMyMoments } = this.props;
    const { type, startPage } = this.state;

    getUserInfo(id);
    getMyMoments(type, startPage);
  }
  
  componentWillUnmount() {
    this.props.saveUserInfo(false);
  }

  onSelect = (opt) => {
    const value = opt.props.value;
    const { userInfo, followUser } = this.props;
    
    if (value === 'complaint') {
      browserHistory.push({
        pathname: '/complaintUser',
        state: {
          id: userInfo.id,
          module: 0,
        },
      });
    }

    // if (value === 'follow') {
    //   const type = userInfo.is_my_friend === 0 ? 'add' : 'cancel';
    //   followUser(userInfo.id, type);
    // } else if (value === 'setting') {
    //   browserHistory.push({
    //     pathname: '/editUser',
    //     query: {
    //       id: userInfo.id,
    //     },
    //   });
    // }

    this.setState({
      visiblePopover: false,
      selected: opt.props.value,
    });
  };

  handleVisibleChange = (visiblePopover) => {
    this.setState({
      visiblePopover,
    });
  };

  callback = () => {
    
  }

  handleTabClick = (key) => {
    const { startPage } = this.state;
    const { mySupplier, getMyMoments } = this.props;
    const type = Number(key);

    if (type === 1 && !mySupplier.list) {
      getMyMoments(type, startPage);

      this.setState({
        type,
      });
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
    const { myDemand, mySupplier, getMyMoments } = this.props;

    if (type === 1) {
      if (mySupplier.loading || !mySupplier.hasNext) {
        return;
      }

      getMyMoments(type, mySupplier.page + 1);
    } else {
      if (myDemand.loading || !myDemand.hasNext) {
        return;
      }

      getMyMoments(type, myDemand.page + 1);
    }
  }

  render() {
    const { type } = this.state;
    const { userInfo, currentUser, myDemand, mySupplier } = this.props;
    const isSelf = String(currentUser.id) === String(userInfo.id);

    const loading = (type === 2 && myDemand.loading) || (type === 1 && mySupplier.loading);
    const hasNext = (type === 2 && myDemand.hasNext) || (type === 1 && mySupplier.hasNext);
    
    const sortedDemand = this.handleSortYar(myDemand.list);
    const sortedSupplier = this.handleSortYar(mySupplier.list);

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visiblePopover}
              overlay={[
                (<Item key="1" value="complaint">
                  投诉
                </Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-26, 15],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 0.3rem',
                marginRight: '-0.3rem',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
        >
          {userInfo ? userInfo.nickname : '用户详情'}
        </NavBar>
        <ScrollContainer scrollKey="user_info">
          <TouchLoader
            initializing={0}
            hasMore={hasNext}
            loading={loading}
            onLoadMore={this.onEndReached}
            autoLoadMore={true}
            className="tloader app-content"
          >
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
        </ScrollContainer>
      </div>
    );
  }
}

UserInfo.propTypes = {
  userInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  currentUser: PropTypes.object,
  getUserInfo: PropTypes.func,
  followUser: PropTypes.func,
  myDemand: PropTypes.object,
  mySupplier: PropTypes.object,
  getMyMoments: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
  currentUser: makeSelectCurrentUser(),
  myDemand: makeSelectMyMomentsDemand(),
  mySupplier: makeSelectMyMomentsSupplier(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: (id) => dispatch(fetchUserInfo(id)),
    saveUserInfo: (data) => dispatch(loadUserInfo(data)),
    followUser: (id, type) => dispatch(doFollow(id, type)),
    getMyMoments: (type, page) => dispatch(fetchMyMoments(type, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
