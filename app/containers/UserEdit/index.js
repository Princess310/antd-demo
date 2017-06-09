/*
 *
 * UserEdit
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, List, WhiteSpace, Icon } from 'antd-mobile';
import Avatar from 'components/Avatar';
import AppContent from 'components/AppContent';

import { makeSelectCurrentUser } from './selectors';

const briefStyle = {
  overflow: 'auto',
  textOverflow: 'inherit',
  whiteSpace: 'inherit',
};

const Item = List.Item;
const Brief = Item.Brief;
export class UserEdit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          {currentUser.nickname}
        </NavBar>
        <AppContent>
          <WhiteSpace size="md" />
          <List>
            <Item
              thumb={<Avatar
                id={currentUser.id}
                avatar={currentUser.avatar}
                isVip={Number(currentUser.verify_status) === 2}
              />}
              multipleLine
              arrow="horizontal"
              onClick={() => {
                browserHistory.push('/userEditBasic');
              }}
            >
              <div>{currentUser.nickname}</div>
              <Brief>
                <section style={{ marginTop: '0.04rem' }}>
                  {currentUser.position !== '' && <span>{currentUser.position}</span>}
                  {currentUser.company !== '' &&
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: '0.24rem',
                      paddingLeft: '0.24rem',
                      borderLeft: `1px ${pallete.border.normal} solid`,
                    }}
                  >{currentUser.company}</span>}
                </section>
              </Brief>
            </Item>
          </List>
          <WhiteSpace size="md" />
          <List>
            <Item
              extra={currentUser.mobile === '' ? '未绑定' : currentUser.mobile}
              arrow="horizontal"
              onClick={() => {
                browserHistory.push('/resetMobile');
              }}
            >绑定手机</Item>
          </List>
          <WhiteSpace size="md" />
          <List>
            <Item
              extra={currentUser.tag_identity_name}
              arrow="horizontal"
              onClick={() => {
                browserHistory.push('/userEditIdentity');
              }}
            >行业角色</Item>
            <Item
              extra={currentUser.main_service_name}
              arrow="horizontal"
              onClick={() => {
                browserHistory.push('/userEditService');
              }}
            >主营类别</Item>
          </List>
          <WhiteSpace size="md" />
          <List>
            <Item
              extra={currentUser.company_locate === '' ? '未设置' : currentUser.company_locate}
              arrow="horizontal"
              onClick={() => {
                browserHistory.push('/selectAddress');
              }}
            >工作地区</Item>
            <Item
              arrow="horizontal"
              multipleLine
              onClick={() => {
                browserHistory.push('/userEditCompany');
              }}
            >
              公司地址
              <Brief style={briefStyle}>
                {currentUser.address === '' ? '请填写您的公司地址' : currentUser.address}
              </Brief>
            </Item>
          </List>
          <WhiteSpace size="md" />
          <List>
            <Item
              arrow="horizontal"
              multipleLine
              wrap
              onClick={() => {
                browserHistory.push('/userEditIntro');
              }}
            >
              业务介绍
              <Brief style={briefStyle}>
                {currentUser.intro === '' ? '完善您的业务介绍，让大家更容易了解您~' : currentUser.intro}
              </Brief>
            </Item>
          </List>
          <WhiteSpace size="md" />
          <List>
            <Item
              arrow="horizontal"
              onClick={() => {
                browserHistory.push('/userEditPics');
              }}
            >展示图片</Item>
          </List>
          <WhiteSpace size="md" />
        </AppContent>
      </div>
    );
  }
}

UserEdit.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
