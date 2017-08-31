/*
 *
 * LoginPage
 *
 * path --> login
 * 
 * Login page for the access token is invalid of current user
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import request from 'utils/request';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import FlexSB from 'components/FlexSB';
import CallPhone from 'components/CallPhone';
import { NavBar, List, InputItem, Icon, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';

import { makeSelectInitialState } from 'containers/App/selectors';
import makeSelectLoginPage from './selectors';
import { doLogin } from './actions';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    pwdInputType: 'password',
    phone: '',
    password: '',
  }

  handlePhone = (value) => {
    this.setState({
      phone: value,
    });
  }

  handlePassword = (value) => {
    this.setState({
      password: value,
    });
  }

  changeInputType = () => {
    this.setState({
      pwdInputType: this.state.pwdInputType === 'text' ? 'password' : 'text',
    });
  }

  // do the login action
  handleLogin = () => {
    const { phone, password } = this.state;

    return this.props.doLogin(phone.replace(/\s/g, ''), password);
  }

  render() {
    const { phone, password, pwdInputType } = this.state;
    const { initialInfo } = this.props;
    const disableBtn = (phone === '' || password === '');

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          登录
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <InputItem
            type="phone"
            placeholder="手机号/健康商信号"
            value={phone}
            onChange={this.handlePhone}
            labelNumber={2}
          >
            <Icon
              type={require('icons/ali/手机.svg')}
              color={phone === '' ? pallete.button.grey.background : pallete.theme}
              size="md"
            />
          </InputItem>
          <InputItem
            type={pwdInputType}
            placeholder="重置密码"
            value={password}
            onChange={this.handlePassword}
            labelNumber={2}
            extra={
              <Icon
                type={require('icons/ali/查看.svg')}
                color={pwdInputType === 'password' ? pallete.button.grey.background : pallete.theme}
                size="md"
              />
            }
            onExtraClick={this.changeInputType}
          >
            <Icon
              type={require('icons/ali/输入密码.svg')}
              color={password === '' ? pallete.button.grey.background : pallete.theme}
              size="md"
            />
          </InputItem>
        </List>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button className="btn" type="primary" disabled={disableBtn} onClick={this.handleLogin}>完成</Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        <WingBlank>
          <FlexSB>
            <span style={{ color: pallete.theme, fontSize: '0.28rem' }} onClick={() => {
              browserHistory.push('/resetPassword');
            }}>忘记密码？</span>

            <span style={{ color: pallete.theme, fontSize: '0.28rem' }} onClick={() => {
              browserHistory.push('/register');
            }}>免费注册</span>
        </FlexSB>
        </WingBlank>
        {initialInfo && <CallPhone phone={initialInfo.phone.data} />}
      </div>
    );
  }
}

LoginPage.propTypes = {
  /**
   * action: do login action
   */
  doLogin: PropTypes.func,
  /**
   * reducer: the initial info for app
   */
  initialInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  initialInfo: makeSelectInitialState(),
});

function mapDispatchToProps(dispatch) {
  return {
    doLogin: (u, p) => dispatch(doLogin(u, p)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
