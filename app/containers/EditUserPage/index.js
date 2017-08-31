/*
 *
 * EditUserPage
 *
 * edit the back info for another user.
 * Note: it's not used for now after version 1.6.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, List, WhiteSpace, Icon, Switch } from 'antd-mobile';

import { fetchFollowUserInfo, changeFollowBlack } from 'containers/UserCenter/actions';
import { makeSelectFollowUserInfo } from 'containers/UserCenter/selectors';

const Item = List.Item;
export class EditUserPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { location: { query: { id } }, getUserInfo } = this.props;

    getUserInfo(id);
  }

  handleSwitchBlack = (value) => {
    const { location: { query: { id } }, setBlack } = this.props;
    setBlack(id, value);
  }

  render() {
    const { userInfo, location: { query: { id } } } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          资料编辑
        </NavBar>
        <WhiteSpace />
        {userInfo && userInfo.is_my_friend > 0 && (
          <div>
            <List>
              <Item arrow="horizontal" extra={userInfo.remark} onClick={() => {
                browserHistory.push({
                  pathname: '/editUserRemark',
                  state: {
                    id,
                    remark: userInfo.remark,
                  },
                });
              }}>修改备注名</Item>
              {/*<Item arrow="horizontal" extra={userInfo.group_name}>修改分组</Item>*/}
            </List>
            <WhiteSpace />
            <List>
              <Item extra={<Switch checked={userInfo.is_black !== '0'} onChange={this.handleSwitchBlack} />}>加入黑名单</Item>
            </List>
            <WhiteSpace />
          </div>
        )}
        <List>
          <Item arrow="horizontal" onClick={() => {
            browserHistory.push({
              pathname: '/complaintUser',
              state: {
                id: id,
                module: 0,
              },
            });
          }}>投诉</Item>
        </List>
      </div>
    );
  }
}

EditUserPage.propTypes = {
  userInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  getUserInfo: PropTypes.func,
  setBlack: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectFollowUserInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserInfo: (id) => dispatch(fetchFollowUserInfo(id)),
    setBlack: (id, isBlack) => dispatch(changeFollowBlack(id, isBlack)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
