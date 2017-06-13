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
import { NavBar, Icon, ListView, RefreshControl } from 'antd-mobile';

import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectCommunicate } from './selectors';
import { fetchCommunicate } from './actions';

export class Communicate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
      page: 1,
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
            <div key={1} onClick={() => {
              browserHistory.push('/communicatePublish');
            }}>
              <Icon key={1} type={require('icons/ali/编辑.svg')} color={pallete.theme} />
            </div>,
          ]}
        >
          交流
        </NavBar>
        <div onClick={() => {
          browserHistory.push('/communicateSearch');
        }}>
          <SearchBar title="搜索动态" />
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