/*
 *
 * UserBlackList
 *
 * path --> userBlackList
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import AppContent from 'components/AppContent';
import { NavBar, RefreshControl, ListView, List, WhiteSpace, Button, Icon } from 'antd-mobile';

import Avatar from 'components/Avatar';
import FlexRowCenter from 'components/FlexRowCenter';
import LevelTag from 'components/LevelTag';
import ExpTag from 'components/ExpTag';

import { makeSelectUserBlackList, makeSelectListStatus } from './selectors';

import {
  fetchList,
  deleteBlack,
} from './actions';

const Item = List.Item;
const Brief = Item.Brief;
export class UserBlackList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.initData = [];
    this.state = {
      startPage: 1,
      page: 1,
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
    };
  }

  componentWillMount() {
    const { getList } = this.props;

    getList(this.state.startPage);
  }

  onRefresh = () => {
    const { getList } = this.props;

    getList(this.state.startPage);
  }

  onEndReached = () => {
    const { page } = this.state;
    const { listStatus, getList } = this.props;

    if (listStatus.loading || !listStatus.hasNext) {
      return;
    }

    getList(page + 1);
    this.setState({
      page: page + 1,
    });
  }

  render() {
    const { userBlackList, listStatus, delBlack } = this.props;

    const row = (user) => (
      <Item
        key={user.id}
        thumb={<Avatar
          size="0.96rem"
          id={user.id}
          avatar={user.avatar}
          isVip={Number(user.verify_status) === 2}
          linkUser={true}
        />}
        multipleLine
        extra={<Button
          type="ghost"
          inline size="small"
          onClick={() => {
            delBlack(user.id);
          }}
        >取消屏蔽</Button>}
      >
        <FlexRowCenter>
          <span>{user.nickname}</span>
          <LevelTag>V{user.integrity_level}</LevelTag>
          <ExpTag>{user.influence}</ExpTag>
        </FlexRowCenter>
        <Brief>{user.tag_identity_name}</Brief>
      </Item>
    );

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          黑名单
        </NavBar>
        <AppContent>
          <WhiteSpace size="md" />
          {
            (userBlackList && userBlackList.length > 0) &&
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(userBlackList)}
              renderRow={row}
              renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                {listStatus.loading ? 'Loading...' : 'Loaded'}
              </div>)}
              initialListSize={10}
              pageSize={10}
              scrollRenderAheadDistance={200}
              scrollEventThrottle={20}
              onScroll={this.onScroll}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                WebkitOverflowScrolling: 'touch',
              }}
              scrollerOptions={{ scrollbars: true }}
              refreshControl={<RefreshControl
                refreshing={listStatus.refresh}
                onRefresh={this.onRefresh}
              />}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          }
        </AppContent>
      </div>
    );
  }
}

UserBlackList.propTypes = {
  /**
   * action: get the black list
   */
  getList: PropTypes.func,
  /**
   * reducer: the black list info
   */
  userBlackList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  /**
   * reducer: (XXX: the info to store the list status)
   */
  listStatus: PropTypes.object,
  /**
   * action: do delete the black user from list
   */
  delBlack: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userBlackList: makeSelectUserBlackList(),
  listStatus: makeSelectListStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    getList: (page) => dispatch(fetchList(page)),
    delBlack: (id) => dispatch(deleteBlack(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBlackList);
