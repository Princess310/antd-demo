/*
 *
 * BrowserPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import { NavBar } from 'antd-mobile';

import messages from './messages';

export class BrowserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log();
    const { location: { state } } = this.props;
    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
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
          className='app-browser'
        />
      </div>
    );
  }
}

BrowserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(BrowserPage);
