/*
 *
 * UserPrivacy
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';
import { NavBar, List, WhiteSpace, Icon } from 'antd-mobile';

const Item = List.Item;
export class UserPrivacy extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
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
