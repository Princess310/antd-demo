/*
 *
 * UserSettingPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { NavBar, List, WhiteSpace, Modal } from 'antd-mobile';

import { loadUser } from 'containers/App/actions';
import makeSelectUserSettingPage from './selectors';
import messages from './messages';

const Item = List.Item;
const alert = Modal.alert;
export class UserSettingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
        >
          设置
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/userPrivacy');
            }}
          >隐私设定</Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/resetPassword');
            }}
          >修改密码</Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/about');
            }}
          >关于健康商信</Item>
          <Item
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/feedBack')
            }}
          >意见反馈</Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <Item
            onClick={() => {
              alert('确定退出？', '', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => {
                  // clear user info
                  localStorage.setItem('access_token', '');
                  this.props.setUser({});
                  browserHistory.push('/login');
                }, style: { fontWeight: 'bold' } },
              ]);
            }}
          >
            <div style={{ textAlign: 'center' }}>
              注销
            </div>
          </Item>
        </List>
      </div>
    );
  }
}

UserSettingPage.propTypes = {
  setUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  UserSettingPage: makeSelectUserSettingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(loadUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingPage);
