/*
 *
 * UserEdit
 *
 * path --> userEdit
 * 
 * page to show user detail info and edit for them
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, List, WhiteSpace, Icon, Modal } from 'antd-mobile';
import Avatar from 'components/Avatar';
import AppContent from 'components/AppContent';

import { makeSelectCurrentUser } from './selectors';

const briefStyle = {
  overflow: 'auto',
  textOverflow: 'inherit',
  whiteSpace: 'inherit',
};

const imgStyle = {
  marginTop: '0.08rem',
  marginRight: '0.08rem',
  width: '2.2rem',
  height: '2.2rem',
}

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
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
                const editNumber = currentUser.role_edit_number;

                if (editNumber && editNumber >= 2) {
                  alert('您已经修改过行业角色信息，不能再次修改', '', [
                    { text: '我知道了', onPress: () => console.log('confirm') },
                  ])
                } else {
                  alert('行业角色信息只能修改一次，并且会清空您之前的所有信息，请谨慎修改', '', [
                    { text: '我知道了', onPress: () => console.log('cancel') },
                    { text: '确定修改', onPress: () => {
                      browserHistory.push('/userEditIdentity');
                    }, style: { fontWeight: 'bold' } },
                  ]);
                };
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
                {currentUser.business_intro === '' ? '完善您的业务介绍，让大家更容易了解您~' : currentUser.business_intro}
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
          <div style={{ paddingLeft: '0.08rem' }}>
            {currentUser.pictures && currentUser.pictures.map((p, i) => (
              <img key={i} role="presentation" src={p} style={imgStyle} />
            ))}
          </div>
          <WhiteSpace size="md" />
        </AppContent>
      </div>
    );
  }
}

UserEdit.propTypes = {
  /**
   * reducer: the current user info
   */
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
