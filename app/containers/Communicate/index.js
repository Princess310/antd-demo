/*
 *
 * Communicate
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';

import AppContent from 'components/AppContent';
import SearchBar from 'components/SearchBar';
import MomentCard from 'components/MomentCard';
import { NavBar, Icon, ListView, RefreshControl } from 'antd-mobile';

import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectCommunicate } from './selectors';
import { fetchCommunicate } from './actions';

export class Communicate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const { getList, communicationList } = this.props;

    if (!communicationList.list) {
      getList(this.state.startPage);
    }
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
          iconName={false}
          mode="light"
          rightContent={[
            <div key={1} onClick={() => this.onRefresh()}><Icon key={1} type={require('icons/ali/编辑.svg')} color={pallete.theme} /></div>,
          ]}
        >
          交流
        </NavBar>
        <div onClick={() => console.log('in')}>
          <SearchBar title="搜索动态" />
        </div>
        <AppContent style={{ top: '1.85rem' }}>
          {(communicationList.list && communicationList.list.length > 0) &&
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(communicationList.list)}
              renderRow={row}
              renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                {communicationList.loading ? 'Loading...' : 'Loaded'}
              </div>)}
              initialListSize={20}
              pageSize={20}
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

Communicate.propTypes = {
  communicationList: PropTypes.object,
  getList: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  communicationList: makeSelectCommunicate(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getList: (page) => dispatch(fetchCommunicate(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Communicate);
