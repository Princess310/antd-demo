/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import { TabBar, Icon } from 'antd-mobile';

import { makeSelectCurrentUser, makeSelectTab } from './selectors';
import {
  fetchUser,
  loadSelectTab,
} from './actions';

import Communicate from '../Communicate';
import BusinessPage from '../BusinessPage';
import UserCenter from '../UserCenter';

const TabItem = TabBar.Item;
export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  componentWillMount() {
    const { getUser } = this.props;

    getUser();
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;

    if (!currentUser.id) {
      browserHistory.replace('/preview');
    }

    // do change loaction if user info not complete
    const { industry_son_id, main_service_id, company, position } = currentUser;

    if (industry_son_id === '0' || main_service_id === '0' || company === '' || position === '') {
      browserHistory.push('/guide');
    }
  }

  render() {
    const { location, children, selectTab, setSelectTab } = this.props;
    const hideTabs = location.pathname !== '/';
    return (
      <div>
        {hideTabs && React.Children.toArray(children)}
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={hideTabs}
        >
          <TabItem
            title="动态"
            key="动态"
            icon={<Icon type={require('icons/ali/动态.svg')} />}
            selectedIcon={<Icon type={require('icons/ali/动态.svg')} />}
            selected={selectTab === 'communicate'}
            onPress={() => {
              setSelectTab('communicate');
            }}
          >
            {!hideTabs && <Communicate />}
          </TabItem>
          <TabItem
            icon={<Icon type={require('icons/ali/生意.svg')} />}
            selectedIcon={<Icon type={require('icons/ali/生意.svg')} />}
            title="生意"
            key="生意"
            selected={selectTab === 'business'}
            onPress={() => {
              setSelectTab('business');
            }}
          >
            {!hideTabs && <BusinessPage />}
          </TabItem>
          {/*<TabItem
            icon={<Icon type={require('icons/ali/消息.svg')} />}
            selectedIcon={<Icon type={require('icons/ali/消息.svg')} />}
            title="消息"
            key="消息"
            dot
            selected={selectTab === 'message'}
            onPress={() => {
              this.setState({
                selectedTab: 'message',
              });
            }}
          >
            {!hideTabs && <div>消息</div>}
          </TabItem>*/}
          <TabItem
            icon={<Icon type={require('icons/ali/我的.svg')} />}
            selectedIcon={<Icon type={require('icons/ali/我的.svg')} />}
            title="我的"
            key="我的"
            selected={selectTab === 'mine'}
            onPress={() => {
              setSelectTab('mine');
            }}
          >
            <div className="home-container">
              {!hideTabs && <UserCenter />}
            </div>
          </TabItem>
        </TabBar>
      </div>
    );
  }
}

HomePage.propTypes = {
  getUser: PropTypes.func,
  setSelectTab: PropTypes.func,
  currentUser: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.node,
  selectTab: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(fetchUser()),
    setSelectTab: (selectTab) => dispatch(loadSelectTab(selectTab)),
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  selectTab: makeSelectTab(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
