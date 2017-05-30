/*
 *
 * UserPrivacy
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { browserHistory } from 'react-router';
import { NavBar, List, WhiteSpace, } from 'antd-mobile';

import messages from './messages';

const Item = List.Item;
export class UserPrivacy extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
        >
          隐私设定
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/userBlackList');
            }}
          >黑名单</Item>
        </List>
      </div>
    );
  }
}

UserPrivacy.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(UserPrivacy);
