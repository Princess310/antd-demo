/*
 *
 * UserCenterVisitor
 *
 * path --> userCenterVisitor
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import UserHeaderBar from 'components/UserHeaderBar';
import DateInfo from 'components/DateInfo';
import UserSubInfoBar from 'components/UserSubInfoBar';
import AppContent from 'components/AppContent';
import { NavBar, Tabs, Icon } from 'antd-mobile';

import { fetchVistor } from 'containers/UserCenter/actions';
import { makeSelectUserVisitorUsers, makeSelectUserVisitorMine } from 'containers/UserCenter/selectors';

const TabPane = Tabs.TabPane;
export class UserCenterVisitor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      type: 1, // type-> 0: 我的访客, 1:访问我的
      startPage: 1,
      users: {
        page: 1,
      },
      mine: {
        page: 1,
      },
      usersLoaded: false,
    };
  }

  componentWillMount() {
    const { getVisitor } = this.props;

    getVisitor(1);
  }

  onRefresh = (type) => {
    const { startPage } = this.state;
    const { getVisitor } = this.props;

    getVisitor(type, startPage);
  }

  onEndReached = () => {
    const { type, users, mine } = this.state;
    const { visitorUsers, visitorMine, getVisitor } = this.props;

    if (type === 0) {
      if (visitorUsers.loading || !visitorUsers.hasNext) {
        return;
      }

      getVisitor(type, users.page + 1);
      this.setState({
        users: {
          ...users,
          page: users.page + 1,
        },
      });
    } else {
      if (visitorMine.loading || !visitorMine.hasNext) {
        return;
      }

      getVisitor(type, mine.page + 1);
      this.setState({
        mine: {
          ...mine,
          page: mine.page + 1,
        },
      });
    }
  }

  callback = (key) => {
    const { getVisitor } = this.props;
    const { usersLoaded } = this.state;

    if (Number(key) === 0 && !usersLoaded) {
      getVisitor(0);
      this.setState({
        usersLoaded: true,
        type: Number(key),
      });
    } else {
      this.setState({
        type: Number(key),
      });
    }
  }

  handleTabClick = (key) => {
    const { getVisitor } = this.props;
    const { usersLoaded } = this.state;

    if (Number(key) === 0 && !usersLoaded) {
      getVisitor(0);
      this.setState({
        usersLoaded: true,
        type: Number(key),
      });
    } else {
      this.setState({
        type: Number(key),
      });
    }
  }

  render() {
    const { visitorUsers, visitorMine } = this.props;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          访客
        </NavBar>
        <AppContent>
          <Tabs defaultActiveKey="1" swipeable={false} onChange={this.callback} onTabClick={this.handleTabClick}>
            <TabPane tab="谁看过我" key="1">
              {
                (visitorMine.list && visitorMine.list.length > 0) &&
                <ScrollContainer scrollKey="user_visitor_mine">
                  <TouchLoader
                    initializing={0}
                    refreshing={visitorMine.refresh}
                    onRefresh={() => this.onRefresh(0)}
                    hasMore={visitorMine.hasNext}
                    loading={visitorMine.loading}
                    onLoadMore={this.onEndReached}
                    autoLoadMore={true}
                    className="tloader app-content"
                    style={{ top: '0', position: 'relative' }}
                  >
                    {visitorMine.list.map((user, i) => (
                      <div key={i}>
                        <UserHeaderBar
                          user={user}
                          rightContent={
                            <DateInfo time={user.created_at} style={{ alignSelf: 'flex-end' }} />
                          }
                        />
                        <UserSubInfoBar
                          influence={user.influence}
                          progress={user.integrity_progress}
                          level={user.integrity_level}
                          distance={user.distance}
                          city={user.city_name}
                          style={{ marginBottom: '0.16rem' }}
                        />
                      </div>
                    ))}
                  </TouchLoader>
                </ScrollContainer>
              }
            </TabPane>
            <TabPane tab="我看过谁" key="0">
              <div>
                {
                  (visitorUsers.list && visitorUsers.list.length > 0) &&
                  <ScrollContainer scrollKey="user_visitor_users">
                    <TouchLoader
                      initializing={0}
                      refreshing={visitorUsers.refresh}
                      onRefresh={() => this.onRefresh(1)}
                      hasMore={visitorUsers.hasNext}
                      loading={visitorUsers.loading}
                      onLoadMore={this.onEndReached}
                      autoLoadMore={true}
                      className="tloader app-content"
                      style={{ top: '0', position: 'relative' }}
                    >
                      {visitorUsers.list.map((user, i) => (
                        <div key={i}>
                          <UserHeaderBar
                            user={user}
                            rightContent={
                              <DateInfo time={user.created_at} style={{ alignSelf: 'flex-end' }} />
                            }
                          />
                          <UserSubInfoBar
                            influence={user.influence}
                            progress={user.integrity_progress}
                            level={user.integrity_level}
                            distance={user.distance}
                            city={user.city_name}
                            style={{ marginBottom: '0.16rem' }}
                          />
                        </div>
                      ))}
                    </TouchLoader>
                  </ScrollContainer>
                }
              </div>
            </TabPane>
          </Tabs>
        </AppContent>
      </div>
    );
  }
}

UserCenterVisitor.propTypes = {
  /**
   * action: get the visitor info
   */
  getVisitor: PropTypes.func,
  /**
   * reducer: the visitor users, who I visited
   */
  visitorUsers: PropTypes.object,
  /**
   * reducer: the visitor users, who visited me
   */
  visitorMine: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  visitorUsers: makeSelectUserVisitorUsers(),
  visitorMine: makeSelectUserVisitorMine(),
});

function mapDispatchToProps(dispatch) {
  return {
    getVisitor: (type, page) => dispatch(fetchVistor(type, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenterVisitor);
