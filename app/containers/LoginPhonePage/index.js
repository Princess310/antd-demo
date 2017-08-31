/*
 *
 * LoginPhonePage
 *
 * path --> loginPhone
 * 
 * the login page for just use phone number && verify code to login
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

let timer = null;
export class LoginPhonePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    pwdInputType: 'password',
    phone: '',
    code: '',
    password: '',
    startTime: 60,
    time: 60,
  }

  componentWillUnmount() {
    // clear the timer when comp unmount
    if (timer) {
      clearInterval(timer);
    }
  }

  getCode = () => {
    const { phone, time, startTime } = this.state;
    if (time < startTime) {
      return;
    }

    const self = this;
    request.doGet('code/getcode', {
      type: 6,
      username: phone.replace(/\s/g, ''),
    }).then(() => {
      Toast.success('验证码已发送', 1);

      timer = setInterval(() => {
        self.setState({
          time: (this.state.time - 1),
        });

        if (this.state.time === 0) {
          this.setState({
            time: startTime,
          });

          clearInterval(timer);
        }
      }, 1000);
    });
  }

  handleCode = (value) => {
    this.setState({
      code: value,
    });
  }

  handlePhone = (value) => {
    this.setState({
      phone: value,
    });
  }

  doLogin = () => {
    const { phone, code } = this.state;

    request.doPost('user/code-login', {
      username: phone.replace(/\s/g, ''),
      code,
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access_token);
      browserHistory.push('/');
    });
  }

  render() {
    const { phone, code, startTime, time } = this.state;
    const { initialInfo } = this.props;
    const disableBtn = (phone === '' || code === '');

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          手机快速登录
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <InputItem
            type="phone"
            placeholder="手机号码"
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
            placeholder="验证码"
            value={code}
            onChange={this.handleCode}
            labelNumber={2}
            extra={<div
              style={{ height: '0.42rem', lineHeight: '0.42rem', color: time === startTime ? pallete.theme : pallete.button.grey.background }}
              onClick={this.getCode}
            >{time === startTime ? '获取验证码' : `${time}s重新获取`}</div>}
          >
            <Icon
              type={require('icons/ali/绑定.svg')}
              color={code === '' ? pallete.button.grey.background : pallete.theme}
              size="md"
            />
          </InputItem>
        </List>
        <FlexCenter style={{ margin: '0.44rem 0', fontSize: '0.28rem', color: pallete.text.subHelp }}>
          点击下一步即表示同意<span style={{ color: pallete.theme }} onClick={() => {
          browserHistory.push({
            pathname: 'browser',
            state: {
              link: `${request.getWebRoot()}agree_page.html`,
              title: '用户协议',
            },
          });
        }}>《用户协议》</span>
        </FlexCenter>
        <WingBlank>
          <Button className="btn" type="primary" disabled={disableBtn} onClick={this.doLogin}>完成</Button>
        </WingBlank>
         {initialInfo && <CallPhone phone={initialInfo.phone.data} />}
      </div>
    );
  }
}

LoginPhonePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPhonePage);
