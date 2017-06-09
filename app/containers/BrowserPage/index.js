/*
 *
 * BrowserPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, Icon } from 'antd-mobile';

export class BrowserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { location: { state } } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          {state.title}
        </NavBar>
        <iframe
          src={state.link}
          frameBorder="0"
          width="100%"
          scrolling="no"
          height="100%"
          className="app-browser"
        />
      </div>
    );
  }
}

BrowserPage.propTypes = {
  location: PropTypes.object,
};


function mapDispatchToProps() {
  return {
  };
}

export default connect(null, mapDispatchToProps)(BrowserPage);
