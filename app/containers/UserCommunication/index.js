/*
 *
 * UserCommunication
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import AppContent from 'components/AppContent';
import MomentCard from 'components/MomentCard';
import { NavBar, SegmentedControl, Tabs, ListView, RefreshControl } from 'antd-mobile';
import { makeSelectUserCommunication } from 'containers/UserCenter/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { fetchCommunication } from 'containers/UserCenter/actions';

export class UserCommunication extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const { getList } = this.props;

    getList(this.state.startPage);
  }

  onRefresh = () => {
    const { startPage } = this.state;
    const { getList } = this.props;

    getList(startPage);
  }

  onEndReached = () => {
    const { page } = this.state;
    const { communicationList, getList } = this.props;

    if (communicationList.loading || !communicationList.hasNext) {
      return;
    }

    getList(page + 1);
    this.setState({
      page: page + 1,
    });
  }

  render() {
    const { communicationList, currentUser } = this.props;

    const row = (moment) => (
      <MomentCard
        moment={moment}
        currentUser={currentUser}
        from="list"
        type="communication"
        style={{ marginTop: '0.12rem' }}
      />
    );

    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
        >
          我的交流
        </NavBar>
        <AppContent>
          {(communicationList.list && communicationList.list.length > 0) &&
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(communicationList.list)}
              renderRow={row}
              renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                {communicationList.loading ? 'Loading...' : 'Loaded'}
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
                refreshing={communicationList.refresh}
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

UserCommunication.propTypes = {
  communicationList: PropTypes.object,
  getList: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  communicationList: makeSelectUserCommunication(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getList: (page) => dispatch(fetchCommunication(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCommunication);
