/*
 *
 * IntroducePublish
 *
 * path --> introducePublish
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import pallete from 'styles/colors';
import request from 'utils/request';

import { NavBar, List, WhiteSpace, Toast, Icon, InputItem } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';
import AppContent from 'components/AppContent';

import { doRefreshMoment } from 'containers/BusinessPage/actions';

const inputStyle = {
  height: '0.48rem',
  minHeight: '0.48rem',
  paddingRight: 0,
};

const Item = List.Item;
export class IntroducePublish extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      mobile: '',
      name: '',
    };
  }

  handleName = (value) => {
    this.setState({
      name: value,
    });
  }

  handleMobile = (value) => {
    this.setState({
      mobile: value,
    });
  }

  handleSave = () => {
    const { location: { query }, refreshMoment } = this.props;
    const { name, mobile } = this.state;

    if (name.trim().length > 6 || name.trim().length < 2) {
      Toast.info('姓名：2-6个字', 1.5);
      return;
    }

    if (mobile.replace(/\s/g, '').length !== 11) {
      Toast.info('输入11位手机号', 1.5);
      return;
    }

    request.doPost('moments/add-referral', {
      moments_id: query.id,
      name: name,
      mobile: mobile.replace(/\s/g, ''),
    }).then((res) => {
      Toast.info('操作成功！', 2);

      refreshMoment(query.id);
    });
  }

  render() {
    const { name, mobile } = this.state;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>发送</MenuBtn>,
          ]}
        >
          转介绍
        </NavBar>
        <AppContent>
          <WhiteSpace />
          <List>
            <Item
              extra={<InputItem
                maxLength={6}
                style={inputStyle}
                name="name"
                value={name}
                onChange={this.handleName}
                placeholder="请输入姓名"
              ></InputItem>}
            >推荐人的姓名</Item>
            <Item
              extra={<InputItem
                style={inputStyle}
                name="mobile"
                value={mobile}
                type="phone"
                onChange={this.handleMobile}
                placeholder="请输入电话"
              ></InputItem>}
            >推荐人的电话</Item>
          </List>
        </AppContent>
      </div>
    );
  }
}

IntroducePublish.propTypes = {
  /**
   * action: refresh moment info
   */
  refreshMoment: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    refreshMoment: (id) => dispatch(doRefreshMoment(id)),
  };
}

export default connect(null, mapDispatchToProps)(IntroducePublish);
