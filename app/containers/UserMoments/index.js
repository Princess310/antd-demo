/*
 *
 * UserMoments
 *
 * path --> userMoments
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import AppContent from 'components/AppContent';
import MomentCard from 'components/MomentCard';
import { NavBar, SegmentedControl, Tabs, Icon } from 'antd-mobile';
import { makeSelectUserMomentDemand, makeSelectUserMomentSupplier } from 'containers/UserCenter/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { fetchUserMoments } from 'containers/UserCenter/actions';

export class UserMoments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      type: 2, // type-> 1: 我的供应, 2:我的需求
      startPage: 1,
      supplier: {
        page: 1,
      },
      demand: {
        page: 1,
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

      getMoments(type, momentSupplier.page + 1);
    } else {
      if (momentDemand.loading || !momentDemand.hasNext) {
        return;
      }

      getMoments(type, momentDemand.page + 1);
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

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
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
            <ScrollContainer scrollKey="user_moment_demand">
              <TouchLoader
                initializing={0}
                refreshing={momentDemand.refresh}
                onRefresh={() => this.onRefresh(2)}
                hasMore={momentDemand.hasNext}
                loading={momentDemand.loading}
                onLoadMore={this.onEndReached}
                autoLoadMore={true}
                className="tloader app-content"
                style={{ top: '0' }}
              >
                {momentDemand.list.map((moment) => (
                  <div key={moment.id}>
                    <MomentCard
                      moment={moment}
                      currentUser={currentUser}
                      from="list"
                      type="business"
                      style={{ marginTop: '0.12rem' }}
                    />
                  </div>
                ))}
              </TouchLoader>
            </ScrollContainer>
          }

          {(type === 1 && momentSupplier.list && momentSupplier.list.length > 0) &&
            <ScrollContainer scrollKey="user_moment_supplier">
              <TouchLoader
                initializing={0}
                refreshing={momentSupplier.refresh}
                onRefresh={() => this.onRefresh(1)}
                hasMore={momentSupplier.hasNext}
                loading={momentSupplier.loading}
                onLoadMore={this.onEndReached}
                autoLoadMore={true}
                className="tloader app-content"
                style={{ top: '0' }}
              >
                {momentSupplier.list.map((moment) => (
                  <div key={moment.id}>
                    <MomentCard
                      moment={moment}
                      currentUser={currentUser}
                      from="list"
                      type="business"
                      style={{ marginTop: '0.12rem' }}
                    />
                  </div>
                ))}
              </TouchLoader>
            </ScrollContainer>
          }
        </AppContent>
      </div>
    );
  }
}

UserMoments.propTypes = {
  /**
   * action: get the moments info
   */
  getMoments: PropTypes.func,
  /**
   * reducer: demand status for user
   */
  momentDemand: PropTypes.object,
  /**
   * reducer: supplier status for user
   */
  momentSupplier: PropTypes.object,
  /**
   * reducer: the current user info
   */
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
