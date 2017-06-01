/*
 *
 * UserCenterVisitor
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import UserHeaderBar from 'components/UserHeaderBar';
import DateInfo from 'components/DateInfo';
import UserSubInfoBar from 'components/UserSubInfoBar';
import AppContent from 'components/AppContent';
import { NavBar, Tabs, ListView, RefreshControl, List, WhiteSpace, } from 'antd-mobile';

import { fetchVistor } from 'containers/UserCenter/actions';
import { makeSelectUserVisitorUsers, makeSelectUserVisitorMine } from 'containers/UserCenter/selectors';
import messages from './messages';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
export class UserCenterVisitor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const dataSourceUsers = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    const dataSourceMine = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.initData = [];
    this.state = {
      type: 0, // type-> 0: 我的访客, 1:访问我的
      startPage: 1,
      users: {
        page: 1,
        dataSourceUsers: dataSourceUsers.cloneWithRows(this.initData),
      },
      mine: {
        page: 1,
        dataSourceMine: dataSourceMine.cloneWithRows(this.initData),
      },
      mineLoaded: false,
    };
  }

  componentWillMount() {
    const { getVisitor } = this.props;

    getVisitor(1);
  }

  callback = (key) => {
    const { visitorMine, getVisitor }= this.props;
    const { mineLoaded } = this.state;

    if (Number(key) === 0 && !mineLoaded) {
      getVisitor(0);
      this.setState({
        mineLoaded: true,
        type: key,
      });
    } else {
      this.setState({
        type: key,
      });
    }
  }

  handleTabClick = (key) => {
    const { visitorMine, getVisitor }= this.props;
    const { mineLoaded } = this.state;

    if (Number(key) === 0 && !mineLoaded) {
      getVisitor(0);
      this.setState({
        mineLoaded: true,
        type: key,
      });
    } else {
      this.setState({
        type: key,
      });
    }
  }
  onRefresh = (type) => {
    const { startPage } = this.state;
    const { getVisitor } = this.props;

    getVisitor(type, startPage);
  }

  onEndReached = (event) => {
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
          page: users.page + 1
        }
      });
    } else {
      if (visitorMine.loading || !visitorMine.hasNext) {
        return;
      }

      getVisitor(type, mine.page + 1);
      this.setState({
        mine: {
          ...mine,
          page: mine.page + 1
        }
      });
    }
  }
  
  render() {
    const { visitorUsers, visitorMine }= this.props;

    const row = (user, sectionID, rowID) => {
      return (
        <div>
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
      );
    }

    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
        >
          访客
        </NavBar>
        <AppContent>
          <Tabs defaultActiveKey="1" swipeable={false} onChange={this.callback} onTabClick={this.handleTabClick}>
            <TabPane tab="谁看过我" key="1">
              {
                (visitorMine.list && visitorMine.list.length > 0) &&
                <ListView
                  dataSource={this.state.mine.dataSourceMine.cloneWithRows(visitorMine.list)}
                  renderRow={row}
                  renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                    {visitorMine.loading ? 'Loading...' : 'Loaded'}
                  </div>)}
                  initialListSize={10}
                  pageSize={10}
                  scrollRenderAheadDistance={200}
                  scrollEventThrottle={20}
                  onScroll={this.onScroll}
                  style={{
                    height: document.documentElement.clientHeight,
                  }}
                  scrollerOptions={{ scrollbars: true }}
                  refreshControl={<RefreshControl
                    refreshing={visitorMine.refresh}
                    onRefresh={() => this.onRefresh(1)}
                  />}
                  onEndReached={this.onEndReached}
                  onEndReachedThreshold={10}
                />
              }
            </TabPane>
            <TabPane tab="我看过谁" key="0">
              <div>
                {
                  (visitorUsers.list && visitorUsers.list.length > 0) &&
                  <ListView
                    dataSource={this.state.users.dataSourceUsers.cloneWithRows(visitorUsers.list)}
                    renderRow={row}
                    renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                      {visitorUsers.loading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    initialListSize={10}
                    pageSize={10}
                    scrollRenderAheadDistance={200}
                    scrollEventThrottle={20}
                    onScroll={this.onScroll}
                    style={{
                      height: document.documentElement.clientHeight,
                    }}
                    scrollerOptions={{ scrollbars: true }}
                    refreshControl={<RefreshControl
                      refreshing={visitorUsers.refresh}
                      onRefresh={() => this.onRefresh(0)}
                    />}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                  />
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
  getVisitor: PropTypes.func,
  visitorUsers: PropTypes.object,
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
