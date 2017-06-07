/*
 *
 * UserMoments
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import AppContent from 'components/AppContent';
import MomentCard from 'components/MomentCard';
import { NavBar, SegmentedControl, Tabs, ListView, RefreshControl } from 'antd-mobile';
import { makeSelectUserMomentDemand, makeSelectUserMomentSupplier } from 'containers/UserCenter/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { fetchUserMoments } from 'containers/UserCenter/actions';

export class UserMoments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const dataSourceSupplier = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    const dataSourceDemand = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.initData = [];
    this.state = {
      type: 2, // type-> 1: 我的供应, 2:我的需求
      startPage: 1,
      supplier: {
        page: 1,
        dataSourceSupplier: dataSourceSupplier.cloneWithRows(this.initData),
      },
      demand: {
        page: 1,
        dataSourceDemand: dataSourceDemand.cloneWithRows(this.initData),
      },
      supplierLoaded: false,
    };
  }

  componentWillMount() {
    const { getMoments } = this.props;

    getMoments(this.state.type, 1);
  }

  onRefresh = (type) => {
    const { startPage } = this.state;
    const { getMoments } = this.props;

    getMoments(type, startPage);
  }

  onEndReached = () => {
    const { type, demand, supplier } = this.state;
    const { momentDemand, momentSupplier, getMoments } = this.props;

    if (type === 1) {
      if (momentSupplier.loading || !momentSupplier.hasNext) {
        return;
      }

      getMoments(type, supplier.page + 1);
      this.setState({
        supplier: {
          ...supplier,
          page: supplier.page + 1,
        },
      });
    } else {
      if (momentDemand.loading || !momentDemand.hasNext) {
        return;
      }

      getMoments(type, demand.page + 1);
      this.setState({
        demand: {
          ...mindemande,
          page: demand.page + 1,
        },
      });
    }
  }

  onChangeTitle = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    const { getMoments } = this.props;
    const { supplierLoaded } = this.state;

    if (Number(index) === 1 && !supplierLoaded) {
      getMoments(1);
      this.setState({
        supplierLoaded: true,
        type: 1,
      });
    } else if(Number(index) === 1) {
      this.setState({
        type: 1,
      });
    } else {
      this.setState({
        type: 2,
      });
    }
  }

  render() {
    const { type } = this.state;
    const { momentDemand, momentSupplier, currentUser } = this.props;

    const row = (moment) => (
      <MomentCard
        moment={moment}
        currentUser={currentUser}
        from="list"
        type="business"
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
          <SegmentedControl
            selectedIndex={type === 2 ? 0 : 1}
            values={['需求', '供应']}
            style={{ height: '0.3rem', width: '3rem' }}
            onChange={this.onChangeTitle}
          />
        </NavBar>
        <AppContent>
          {(type === 2 && momentDemand.list && momentDemand.list.length > 0) &&
            <ListView
              dataSource={this.state.demand.dataSourceDemand.cloneWithRows(momentDemand.list)}
              renderRow={row}
              renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                {momentDemand.loading ? 'Loading...' : 'Loaded'}
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
                refreshing={momentDemand.refresh}
                onRefresh={() => this.onRefresh(2)}
              />}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          }

          {(type === 1 && momentSupplier.list && momentSupplier.list.length > 0) &&
            <ListView
              dataSource={this.state.demand.dataSourceSupplier.cloneWithRows(momentSupplier.list)}
              renderRow={row}
              renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                {momentSupplier.loading ? 'Loading...' : 'Loaded'}
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
                refreshing={momentSupplier.refresh}
                onRefresh={() => this.onRefresh(2)}
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

UserMoments.propTypes = {
  getMoments: PropTypes.func,
  momentDemand: PropTypes.object,
  momentSupplier: PropTypes.object,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  momentDemand: makeSelectUserMomentDemand(),
  momentSupplier: makeSelectUserMomentSupplier(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMoments: (type, page) => dispatch(fetchUserMoments(type, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMoments);
