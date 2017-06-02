/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { List, InputItem, Button } from 'antd-mobile';

import makeSelectLoginPage from './selectors';
import { doLogin } from './actions';

const BtnWrapper = styled.div`
  margin: 0.64rem 0.16rem 0;
`;

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    username: '',
    password: '',
  }

  handleUsername = (value) => {
    this.setState({
      username: value,
    });
  }

  handlePassword = (value) => {
    this.setState({
      password: value,
    });
  }

  handleLogin = () => {
    const { username, password } = this.state;

    return this.props.doLogin(username, password);
  }

  render() {
    const { username, password } = this.state;
    const disableBtn = (username === '' || password === '');

    return (
      <div>
        <List renderHeader={() => '登录'}>
          <InputItem
            clear
            placeholder="手机号/健康商信号"
            value={username}
            onChange={this.handleUsername}
            autoFocus
          >用户名</InputItem>
          <InputItem
            type="password"
            placeholder="密码"
            value={password}
            onChange={this.handlePassword}
          >密码</InputItem>
        </List>

        <BtnWrapper>
          <Button
            className="btn"
            type="primary"
            disabled={disableBtn}
            onClick={this.handleLogin}
          >登录</Button>
        </BtnWrapper>
      </div>
    );
  }
}

LoginPage.propTypes = {
  doLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  LoginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    doLogin: (u, p) => dispatch(doLogin(u, p)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
