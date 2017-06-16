/*
 *
 * UserCenterCollects
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import { NavBar, ListView, RefreshControl, Icon, ActionSheet, Result, WhiteSpace } from 'antd-mobile';
import AppContent from 'components/AppContent';
import UserMomentHeader from 'components/UserMomentHeader';
import DateInfo from 'components/DateInfo';
import FlexRow from 'components/FlexRow';
import pallete from 'styles/colors';

import { fetchCollects, delCollect } from 'containers/UserCenter/actions';
import { makeSelectUserCollects } from 'containers/UserCenter/selectors';
import noResultPage from 'assets/images/no-data-collect.png';

const WrapperStyle = {
  paddingLeft: '1.2rem',
  paddingRight: '0.24rem',
  backgroundColor: pallete.white,
};

const CollectContentStyle = {
  backgroundColor: pallete.background.collect,
  padding: '0.12rem',
  color: pallete.text.words,
  fontSize: '0.24rem',
};

export class UserCenterCollects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    };
  }

  componentWillMount() {
    const { getCollects } = this.props;

    getCollects(1);
  }

  onRefresh = () => {
    const { getCollects } = this.props;

    getCollects(this.state.startPage);
  }

  onEndReached = () => {
    const { page } = this.state;
    const { collectInfo, getCollects } = this.props;

    if (collectInfo.loading || !collectInfo.hasNext) {
      return;
    }

    getCollects(page + 1);
    this.setState({
      page: page + 1,
    });
  }

  showActionSheet = (id) => {
    const { deleteCollect } = this.props;
    const BUTTONS = ['删除', '取消'];

    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      message: '删除该收藏',
      maskClosable: true,
      'data-id': id,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        deleteCollect(id);
      }
    });
  }

  render() {
    const { collectInfo } = this.props;

    const row = (moment) => (
      <div
        style={{ borderBottom: `0.01rem ${pallete.border.normal} solid` }}
        onClick={() => {
          browserHistory.push({
            pathname: 'momentDetail',
            query: {
              id: moment.moments_id,
            },
            state: {
              type: moment.type,
            },
          });
        }}
      >
        <UserMomentHeader
          key={moment.id}
          user={moment.user}
          rightContent={
            <div style={{ width: '0.48rem', height: '0.48rem', textAlign: 'right' }} onClick={() => this.showActionSheet(moment.id)}>
              <Icon
                type={require('icons/ali/下拉.svg')}
                size="xs"
                color={pallete.text.words}
              />
            </div>
          }
        />
        <div style={WrapperStyle}>
          <FlexRow style={CollectContentStyle}>
            {moment.url !== '' && <img role="presentation" style={{ maxWidth: '1.8rem', maxHeight: '1.8rem', marginRight: '0.12rem' }} src={moment.url} />}
            <div>{moment.content}</div>
          </FlexRow>
        </div>
        <DateInfo
          time={moment.created_at}
          style={{
            textAlign: 'right',
            backgroundColor: pallete.white,
            padding: '0.24rem',
          }}
        />
      </div>
    );

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          我的收藏
        </NavBar>
        <AppContent>
          {
            (collectInfo.list && collectInfo.list.length > 0) ?
            (
              <ListView
                dataSource={this.state.dataSource.cloneWithRows(collectInfo.list)}
                renderRow={row}
                renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                  {collectInfo.loading ? 'Loading...' : 'Loaded'}
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
                  refreshing={collectInfo.refresh}
                  onRefresh={this.onRefresh}
                />}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
              />
            ) : (
              <div>
                <WhiteSpace size="xs" />
                <Result
                  img={<img role="presentation" src={noResultPage} style={{ height: '100%', width: 'auto' }} />}
                  message="暂无收藏"
                />
              </div>
            )
          }
        </AppContent>
      </div>
    );
  }
}

UserCenterCollects.propTypes = {
  getCollects: PropTypes.func,
  collectInfo: PropTypes.object,
  deleteCollect: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  collectInfo: makeSelectUserCollects(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCollects: (page) => dispatch(fetchCollects(page)),
    deleteCollect: (id) => dispatch(delCollect(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenterCollects);
