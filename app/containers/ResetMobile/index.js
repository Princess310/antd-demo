/*
 *
 * ResetMobile
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import request from 'utils/request';
import pallete from 'styles/colors';

import { browserHistory } from 'react-router';
import { NavBar, List, InputItem, Icon, WhiteSpace, WingBlank, Button } from 'antd-mobile';

import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import messages from './messages';

export class ResetMobile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    pwdInputType: 'password',
    phone: '',
    code: '',
    password: '',
    startTime: 60,
    time: 60,
  }

  changeInputType = () => {
    this.setState({
      pwdInputType: this.state.pwdInputType === 'text' ? 'password' : 'text',
    });
  }

  handlePhone = (value) => {
    this.setState({
      phone: value,
    });
  }

  handleCode = (value) => {
    this.setState({
      code: value,
    });
  }

  handlePassword = (value) => {
    this.setState({
      password: value,
    });
  }

  getCode = () => {
    const { phone, time, startTime } = this.state;

    if (time < startTime) {
      return;
    }

    const self = this;
    request.doGet('code/getcode', {
      type: 2,
      username: phone,
    }).then(() => {
      const timer = setInterval(() => {
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

  saveMobile = () => {
    const {phone, code, password} = this.state;

    request.doPost('user/bind-mobile', {
      mobile: phone,
      code,
      password,
    }).then(() => {
      browserHistory.go(-1);
    });
  }

  render() {
    const { currentUser } = this.props;
    const { pwdInputType, phone, code, password, startTime, time } = this.state;
    const disableBtn = (phone === '' || code === '' || password === '');

    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
        >
          {currentUser.mobile === '' ? '绑定手机并设置密码' : '修改绑定手机号'}
        </NavBar>
        <List renderHeader={() => '请输入需要绑定的手机号'}>
          <InputItem
            type="phone"
            placeholder="手机号"
            value={phone}
            onChange={this.handlePhone}
            labelNumber={2}
          >
            <Icon
              type={require('icons/user-home-page/setting-sm.svg')}
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
              type={require('icons/user-home-page/setting-sm.svg')}
              color={code === '' ? pallete.button.grey.background : pallete.theme}
              size="md"
            />
          </InputItem>
          <InputItem
            type={pwdInputType}
            placeholder="密码 6-20位字符"
            value={password}
            onChange={this.handlePassword}
            labelNumber={2}
            extra={
              <Icon
                type={require('icons/user-home-page/setting-sm.svg')}
                color={pwdInputType === 'password' ? pallete.button.grey.background : pallete.theme}
                size="md"
              />
            }
            onExtraClick={this.changeInputType}
          >
            <Icon
              type={require('icons/user-home-page/setting-sm.svg')}
              color={password === '' ? pallete.button.grey.background : pallete.theme}
              size="md"
            />
          </InputItem>
        </List>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button className="btn" type="primary" disabled={disableBtn} onClick={this.saveMobile}>完成</Button>
        </WingBlank>
      </div>
    );
  }
}

ResetMobile.propTypes = {
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetMobile);
