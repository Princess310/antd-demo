/*
 *
 * UserCommunication
 *
 * path --> userCommunicate
 * 
 * the page to show the status for current user self
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';

import AppContent from 'components/AppContent';
import MomentCard from 'components/MomentCard';
import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import { NavBar, Tabs, Icon } from 'antd-mobile';
import { makeSelectUserCommunication } from 'containers/UserCenter/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { fetchCommunication } from 'containers/UserCenter/actions';

export class UserCommunication extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
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

    getList(communicationList.page + 1);
  }

  render() {
    const { communicationList, currentUser } = this.props;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          我的动态
        </NavBar>
        <AppContent>
          {(communicationList.list && communicationList.list.length > 0) &&
            <ScrollContainer scrollKey="user_communication">
              <TouchLoader
                initializing={0}
                refreshing={communicationList.refresh}
                onRefresh={() => this.onRefresh(2)}
                hasMore={communicationList.hasNext}
                loading={communicationList.loading}
                onLoadMore={this.onEndReached}
                autoLoadMore={true}
                className="tloader app-content"
                style={{ top: '0' }}
              >
                {communicationList.list.map((moment) => (
                  <div key={moment.id}>
                    <MomentCard
                      moment={moment}
                      currentUser={currentUser}
                      from="list"
                      type="communication"
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

UserCommunication.propTypes = {
  /**
   * reducer: the list info
   */
  communicationList: PropTypes.object,
  /**
   * action: get the list
   */
  getList: PropTypes.func,
  /**
   * reducer: the current user info
   */
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
