/*
 *
 * LoginSetPassword
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import request from 'utils/request';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import FlexCenter from 'components/FlexCenter';
import CallPhone from 'components/CallPhone';
import { NavBar, List, InputItem, WhiteSpace, WingBlank, Icon, Button, Toast } from 'antd-mobile';

import { makeSelectInitialState } from 'containers/App/selectors';

export class LoginSetPassword extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      pwdInputType: 'password',
      password: '',
    };
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

  handleLogin = () => {
    const { password } = this.state;
    const { location: { state } } = this.props;
    const { username, code } = state;

    request.doPost('user/code-login', {
      username: username,
      code,
      password,
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access_token);
      browserHistory.push('/');
    });
  }

  render() {
    const { password, pwdInputType } = this.state;
    const { initialInfo } = this.props;
    const disableBtn = password.length < 6;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          设置密码
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <InputItem
            type={pwdInputType}
            placeholder="密码(6个字符以上)"
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
        {initialInfo && <CallPhone phone={initialInfo.phone} />}
      </div>
    );
  }
}

LoginSetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  initialInfo: makeSelectInitialState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSetPassword);
