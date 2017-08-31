/*
 *
 * Communicate
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import SearchBar from 'components/SearchBar';
import MomentCard from 'components/MomentCard';
import FlexColumnCenter from 'components/FlexColumnCenter';
import UpdateMessage from 'components/UpdateMessage';
import { NavBar, Icon, ListView, RefreshControl } from 'antd-mobile';

import { makeSelectBusinessUpdateMessage } from 'containers/BusinessPage/selectors';
import { loadUpdateMessage }from 'containers/BusinessPage/actions';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectCommunicate } from './selectors';
import { fetchCommunicate } from './actions';

export class Communicate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
    };
  }

  // get list info first
  componentWillMount() {
    const { getList, communicationList } = this.props;

    if (!communicationList.list) {
      getList(this.state.startPage);
    }
  }

  // handle refresh action
  onRefresh = () => {
    const { startPage } = this.state;
    const { getList } = this.props;

    getList(startPage);
  }

  // handle pagination
  onEndReached = () => {
    const { communicationList, getList } = this.props;

    if (communicationList.loading || !communicationList.hasNext) {
      return;
    }

    getList(communicationList.page + 1);
  }

  handleMessage = () => {
    const { setUpdateMessage } = this.props;

    // remove the update message after 2s
    setTimeout(() => {
      setUpdateMessage('communication', false, 0);
    }, 2E3);
  }

  render() {
    const { communicationList, currentUser, updateInfo } = this.props;

    const listView = communicationList.list ? communicationList.list.map((moment) => (
      <MomentCard
        key={moment.id}
        moment={moment}
        currentUser={currentUser}
        from="list"
        type="communication"
        style={{ marginTop: '0.12rem' }}
      />
    )) : null;

    return (
      <div>
        <NavBar
          iconName={false}
          mode="light"
          rightContent={[
            <FlexColumnCenter key={1} onClick={() => {
              browserHistory.push('/communicatePublish');
            }}>
              <Icon key={1} type={require('icons/ali/发布.svg')} color={pallete.theme} />
              <span style={{ fontSize: '0.2rem', color: pallete.theme }}>发布</span>
            </FlexColumnCenter>
          ]}
        >
          讨论
        </NavBar>
        <div onClick={() => {
          browserHistory.push('/communicateSearch');
        }}>
          <SearchBar title="搜索讨论" />
        </div>
        <ScrollContainer scrollKey="communicate">
          <TouchLoader
            initializing={0}
            refreshing={communicationList.refresh}
            onRefresh={this.onRefresh}
            hasMore={communicationList.hasNext}
            loading={communicationList.loading}
            onLoadMore={this.onEndReached}
            autoLoadMore={true}
            className="tloader app-content"
            style={{ top: '1.9rem', bottom: '1rem' }}
          >
            {listView}
          </TouchLoader>
        </ScrollContainer>
        {(updateInfo.communication && updateInfo.communication.show) &&
          <UpdateMessage
            message={`更新了${updateInfo.communication.count}条讨论`}
            style={{
              position: 'absolute',
              top: '1.8rem',
              left: 0,
            }}
            callback={this.handleMessage}
          />
        }
      </div>
    );
  }
}

Communicate.propTypes = {
  /**
   * reducer: communication list info
   */
  communicationList: PropTypes.object,
  /**
   * action: get list info
   */
  getList: PropTypes.func,
  /**
   * reducer: current user info
   */
  currentUser: PropTypes.object,
  /**
   * reducer: handle the update message info
   */
  updateInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  /**
   * action: set the update message info
   */
  setUpdateMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  communicationList: makeSelectCommunicate(),
  currentUser: makeSelectCurrentUser(),
  updateInfo: makeSelectBusinessUpdateMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getList: (page) => dispatch(fetchCommunicate(page)),
    setUpdateMessage: (type, show, count) => dispatch(loadUpdateMessage(type, show, count)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Communicate);
