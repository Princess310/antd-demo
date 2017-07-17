/*
 *
 * UserCenter
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import styled from 'styled-components';
import pallete from 'styles/colors';
import request from 'utils/request';
import shareUtil from 'utils/shareUtil';
import shareConfig from 'utils/shareConfig';
import brower from 'utils/brower';

import ExpProgress from 'components/ExpProgress';
import LevelProgress from 'components/LevelProgress';
import Avatar from 'components/Avatar';
import FlexSB from 'components/FlexSB';
import FlexRow from 'components/FlexRow';
import showWeixinGuide from 'components/WeixinGuide';
import { List, Icon, WhiteSpace, Button, ActionSheet, Modal } from 'antd-mobile';
import userBg from 'assets/images/person-bg.png';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { loadSelectTab } from 'containers/HomePage/actions';

import './styles.scss';

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 3.2rem;
  padding: 0.24rem;
  background-image: url(${userBg});
  background-size: 100% 100%;
`;

const InfoWrapper = styled.div`
  margin-left: 0.2rem;
  width: 4rem;
  color: ${pallete.white};
`;

const SubInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${pallete.white};
  font-size: 0.26rem;
  height: 0.72rem;
  color: ${pallete.text.subHelp};
`;

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const shareIconList = [
  { icon: <Icon type={require('icons/share/微博icon.svg')} color={pallete.theme} />, title: '新浪微博', type: 'sina' },
  { icon: <Icon type={require('icons/share/QQicon.svg')} color={pallete.theme} />, title: 'QQ', type: 'qq' },
];

if (brower.checkIfWeixin()) {
  shareIconList.push({
    icon: <Icon type={require('icons/share/微信icon.svg')} color={pallete.theme} />,
    title: '微信好友',
    type: 'weixin',
  });
}

const verifyStyle = {
  marginLeft: '0.12rem',
  color: pallete.text.yellow,
};
const Item = List.Item;
const alert = Modal.alert;
export class UserCenter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    point: 0,
  };

  componentDidMount() {
    const { setSelectTab } = this.props;
    
    request.doGet('user/user-new-status').then((res) => {
      const { data: { status, message } } = res;

      if (status === 1) {
         alert(message, '', [
          { text: '我知道了', onPress: () => console.log('cancel') },
          { text: '立即前去', onPress: () => {
            setSelectTab('business');
          }, style: { fontWeight: 'bold' } },
        ]);
      }
    });
  }

  showShareActionSheet = () => {
    const { currentUser } = this.props;
    const shareInfo = shareConfig.share('app', { name: currentUser.nickname });

    ActionSheet.showShareActionSheetWithOptions({
      options: shareIconList,
      message: '邀请好友帮你增加影响力',
    },
    (index) => {
      if (index > -1) {
        const type = shareIconList[index].type;

        if (type !== 'weixin') {
          shareUtil.config(type, {
            title: shareInfo.title,
            pic: shareInfo.imgUrl,
            content: shareInfo.desc,
            url: shareInfo.link,
          });
        } else {
          showWeixinGuide();
        }
      }
    });
  }

  render() {
    const { currentUser } = this.props;

    let verifyItem = null;
    switch (currentUser.verify_status) {
      case 0:
        verifyItem = (
          <FlexRow style={{ justifyContent: 'flex-end' }}>
            <Icon type={require('icons/ali/感叹号提示.svg')} color={pallete.text.yellow} />
            <span style={verifyStyle}>未认证</span>
          </FlexRow>
        );
        break;
      case -1:
        verifyItem = (
          <span style={verifyStyle}>认证失败</span>
        );
        break;
      case 1:
        verifyItem = (
          <span style={verifyStyle}>认证中</span>
        );
        break;
      case 2:
        verifyItem = (
          <span style={verifyStyle}>认证成功</span>
        );
        break;
      default:
        break;
    }

    return (
      <div className="user-center">
        <UserWrapper>
          <div className="t-r">
            <Icon
              type={require('icons/user-home-page/setting-sm.svg')}
              color={pallete.white}
              size="lg"
              onClick={() => {
                browserHistory.push('/userSetting');
              }}
            />
          </div>
          <FlexSB>
            <FlexRow style={{ alignItems: 'flex-end' }}>
              <Avatar id={currentUser.id} avatar={currentUser.avatar} isVip={Number(currentUser.verify_status) === 2} />
              <InfoWrapper>
                <section>{currentUser.nickname}</section>
                <section style={{ marginTop: '0.04rem' }}>
                  {currentUser.position !== '' && <span>{currentUser.position}</span>}
                  {currentUser.company !== '' &&
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: '0.24rem',
                        paddingLeft: '0.24rem',
                        borderLeft: `1px ${pallete.white} solid`,
                      }}
                    >
                      {currentUser.company}
                    </span>
                  }
                </section>
              </InfoWrapper>
            </FlexRow>
            <Button
              inline
              size="small"
              onClick={() => {
                browserHistory.push('/userEdit');
              }}
            >编辑资料</Button>
          </FlexSB>
        </UserWrapper>
        <List>
          <SubInfoWrapper onClick={() => {
            browserHistory.push('/userPointsRule');
          }}>
            我的积分:<span style={{ color: pallete.theme }}>{currentUser.point}</span>分
            <Icon type={require('icons/ali/个人中心-积分帮助.svg')} size="xs" color="#AAAAAA" style={{ marginLeft: '0.08rem' }} />
          </SubInfoWrapper>
        </List>
        <WhiteSpace size="md" />
        <List>
          <Item
            thumb={<Icon type={require('icons/ali/多人.svg')} color={pallete.theme} />}
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/userCenterVisitor');
            }}
          >访客</Item>
          <Item
            thumb={<Icon type={require('icons/ali/我的需求.svg')} color={pallete.theme} />}
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/userMoments');
            }}
          >我的供求</Item>
          <Item
            thumb={<Icon type={require('icons/ali/朋友圈.svg')} color={pallete.theme} />}
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/userCommunicate');
            }}
          >我的动态</Item>
          <Item
            thumb={<Icon type={require('icons/ali/收藏.svg')} color={pallete.theme} />}
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/userCenterCollects');
            }}
          >我的收藏</Item>
          {/*<Item
            thumb={<Icon type={require('icons/ali/我的钱包.svg')} color={pallete.theme} />}
            arrow="horizontal"
            onClick={() => {}}
          >我的钱包</Item>*/}
        </List>
        <WhiteSpace size="md" />
        <List>
          <Item
            thumb={<Icon type={require('icons/ali/感叹号.svg')} color={pallete.theme} />}
            arrow="horizontal"
            extra={
              verifyItem
            }
            onClick={() => {
              browserHistory.push('/userAuthorize');
            }}
          >成为认证用户</Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <Item
            onClick={this.showShareActionSheet}
          >
            <ItemWrapper>
              <Icon type={require('icons/ali/分享.svg')} color={pallete.theme} />
              <span style={{ marginLeft: '0.16rem' }}>邀请好友帮你增加影响力</span>
            </ItemWrapper>
          </Item>
        </List>
        <WhiteSpace size="md" />
      </div>
    );
  }
}

UserCenter.propTypes = {
  currentUser: PropTypes.object,
  setSelectTab: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectTab: (selectTab) => dispatch(loadSelectTab(selectTab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);
