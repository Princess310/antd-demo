/*
 *
 * MomentDetail
 *
 * path --> momentDetail
 * 
 * the page to diplay for moment detail info
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

import AppContent from 'components/AppContent';
import MomentCard from 'components/MomentCard';
import UserHeaderBar from 'components/UserHeaderBar';
import FlexSB from 'components/FlexSB';
import FlexCenter from 'components/FlexCenter';
import chatTool from 'components/ChatTool';
import showWeixinGuide from 'components/WeixinGuide';
import { NavBar, Tabs, WhiteSpace, Icon, ActionSheet } from 'antd-mobile';

import { makeSelectBusinessDetail } from 'containers/BusinessPage/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { fetchMomentDetail, loadMomentDetail, likeMoment, sendComment, delComment, likeComment, collectMoment, setTopMoment } from 'containers/BusinessPage/actions';

const CommentWrapper = styled.div`
  fontSize: 0.26rem;
  padding: 0 0.12rem 0.12rem 1.2rem;
  background-color: ${pallete.white};
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${pallete.text.help};
`;

const ActionWrapper = styled(FlexSB)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.96rem;
  border-top: 0.01rem ${pallete.border.deep} solid;
  background-color: ${pallete.white};
  z-index: 20;
`
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

const TabPane = Tabs.TabPane;
export class MomentDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { location: { query: { id } }, getMoment } = this.props;

    getMoment(id);
  }

  // clear the reducer info
  componentWillUnmount() {
    this.props.saveMoment(false);
  }

  callback = () => {

  }

  handleTabClick = () => {

  }

  // handle do like moment action
  handleLike = () => {
    const { momentDetail, doLikeMoment } = this.props;

    doLikeMoment(momentDetail.id, momentDetail.uid, 'detail');
  }

  // handle do like comment action
  handleLikeComment = (cid, uid) => {
    const { momentDetail, doLikeComment } = this.props;

    doLikeComment(momentDetail.id, cid, uid);
  }

  // handle to show the send message tool
  handleShowChatTool = (e) => {
    const { momentDetail, doSendComment } = this.props;

    chatTool((message) => {
      doSendComment(momentDetail.id, momentDetail.uid, message, 'detail');
    });
  }

  // the action to handle send comment for another comment
  handleDoublueSendComment = (id, uid) => {
    const { currentUser, momentDetail, doSendComment, doDelComment } = this.props;

    if (String(currentUser.id) === String(uid)) {
      const BUTTONS = ['删除', '取消'];
      ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        maskClosable: true,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          doDelComment(momentDetail.id, id);
        }
      });
    } else {
      const BUTTONS = ['回复', '取消'];
      ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        maskClosable: true,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          chatTool((message) => {
            doSendComment(momentDetail.id, momentDetail.uid, message, 'detail', id);
          });
        }
      });
    }
  }

  // handle more menu actions
  handleMore = () => {
    const { momentDetail, doCollectMoment } = this.props;

    const BUTTONS = ['收藏', '取消'];
      ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        maskClosable: true,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          doCollectMoment(momentDetail.id);
        }
      });
  }

  // set moment to top action
  handleSetTop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { momentDetail, doSetTopMoment } = this.props;

    doSetTopMoment(momentDetail.id, momentDetail.reward_as);
  }

  // handle show the share panel
  handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { currentUser, momentDetail } = this.props;
    const { id, content, pictures } = momentDetail;
    const shareInfo = shareConfig.share('momment', momentDetail, currentUser);

    ActionSheet.showShareActionSheetWithOptions({
      options: shareIconList,
      message: '分享动态',
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
    const { momentDetail, currentUser, location: { state: { type } } } = this.props;
    const {
      uid,
      is_like,
      comments,
      comment_count,
      likes,
      like_count,
      shares,
      share_count,
      reward_as,
      category,
      title,
      trade_status,
      referral_count,
      referrals,
    } = momentDetail;

    const cmsTitle = title ? (title.length > 18 ? `${title.substring(0, 15)}...` : title) : '动态详情';

    // check type of moment
    const businessType = (category === '3' || reward_as === '2') ? 'demand' : ((category === '0' || reward_as === '1') ? 'supplier' : 'status');
    // defined the theme color for moment to show: special for business demand && supplier
    const themeColor = pallete.theme;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          {(category === '3' || reward_as === '2') ? '需求详情' : ((category === '0' || reward_as === '1') ? '供应详情' : cmsTitle)}
        </NavBar>
        {momentDetail && (
          <div>
            <AppContent style={{ paddingBottom: '1rem' }}>
              <MomentCard
                moment={momentDetail}
                currentUser={currentUser}
                from="detail"
                type={type}
              />

              <WhiteSpace size="md" />
              <Tabs
                defaultActiveKey={businessType === 'status' ? '1' : '3'}
                animated={false}
                onChange={this.callback}
                onTabClick={this.handleTabClick}
                className={`moment-detail-tabs moment-detail-tabs-${businessType}`}
              >
                {businessType === 'status' && (
                  <TabPane tab={`评论 ${comment_count}`} key="1">
                    <div>
                      {comments && comments.map((u)  => (
                        <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }} onClick={() => {
                          this.handleDoublueSendComment(u.id, u.created_by);
                        }}>
                          <UserHeaderBar
                            user={{...u, id: u.created_by}}
                          />
                          <CommentWrapper>
                            <div>
                              {u.to_name !== '' && <span>回复<span style={{ color: pallete.theme }}>{u.to_name}</span>：</span>}
                              {u.content}
                            </div>
                            <LikeWrapper
                              style={{ color: businessType === 'status' ? (u.is_like > 0 ? pallete.theme : pallete.text.help) : themeColor }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.handleLikeComment(u.id, u.created_by);
                              }}
                            >
                              <Icon type={u.is_like > 0 ? require('icons/ali/点赞-active.svg') : require('icons/ali/点赞.svg')} size="sm" />
                              {u.like_count}
                            </LikeWrapper>
                          </CommentWrapper>
                        </div>
                      ))}
                    </div>
                  </TabPane>
                )}
                {businessType === 'status' && (
                  <TabPane tab={`赞 ${like_count}`} key="2">
                    <div>
                      {likes && likes.map((u)  => (
                        <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                          <UserHeaderBar
                            user={{...u, id: u.created_by}}
                          />
                        </div>
                      ))}
                    </div>
                  </TabPane>
                )}
                <TabPane tab={`分享 ${share_count}`} key="3">
                  <div>
                    {shares && shares.map((u)  => (
                      <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                        <UserHeaderBar
                          user={{...u, id: u.created_by}}
                        />
                      </div>
                    ))}
                  </div>
                </TabPane>
                {businessType !== 'status' && (
                  <TabPane tab={`转介绍 ${referral_count}`} key="4">
                    <div>
                      {referrals && referrals.map((u)  => (
                        <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                          <UserHeaderBar
                            user={{...u, id: u.created_by}}
                          />
                        </div>
                      ))}
                    </div>
                  </TabPane>
                )}
              </Tabs>
            </AppContent>
            <ActionWrapper style={{ color: themeColor }}>
              {(type === 'business' && String(currentUser.id) === uid) &&
                <FlexCenter onClick={this.handleSetTop}>
                  <Icon type={require('icons/ali/置顶.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>置顶</span>
                </FlexCenter>
              }
               {
                type === 'business' && trade_status === '0' &&
                <FlexCenter onClick={this.handleIntroduce}>
                  <Icon type={require('icons/ali/转介绍.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>{referral_count > 0 ? referral_count : '转介绍'}</span>
                </FlexCenter>
              }
              {
                type !== 'business' &&
                <FlexCenter onClick={this.handleShowChatTool}>
                  <Icon type={require('icons/ali/消息.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>{comment_count > 0 ? comment_count : '评论'}</span>
                </FlexCenter>
              }
              {
                type !== 'business' &&
                <FlexCenter onClick={this.handleLike}>
                  <Icon type={is_like > 0 ? require('icons/ali/点赞-active.svg') : require('icons/ali/点赞.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>{like_count > 0 ? like_count : '点赞'}</span>
                </FlexCenter>
              }
              <FlexCenter onClick={this.handleShare}>
                <Icon type={require('icons/ali/分享.svg')} size="xxs" />
                <span style={{ marginLeft: '0.04rem' }}>{share_count > 0 ? share_count : '分享'}</span>
              </FlexCenter>
               {type === 'communication' &&
                <FlexCenter  onClick={this.handleMore}>
                  <Icon type={require('icons/ali/更多.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>更多</span>
                </FlexCenter>
              }
            </ActionWrapper>
          </div>
        )}
      </div>
    );
  }
}

MomentDetail.propTypes = {
  /**
   * reducer: moment detail info
   */
  momentDetail: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /**
   * action: get the moment detail info
   */
  getMoment: PropTypes.func,
  /**
   * reducer: the current user info
   */
  currentUser: PropTypes.object,
  /**
   * action: do like moment
   */
  doLikeMoment: PropTypes.func,
  /**
   * action: do like comment
   */
  doLikeComment: PropTypes.func,
  /**
   * action: send comment
   */
  doSendComment: PropTypes.func,
  /**
   * action: del the comment for self
   */
  doDelComment: PropTypes.func,
  /**
   * action: do collect for this moment
   */
  doCollectMoment: PropTypes.func,
  /**
   * action: do set top for moment
   */
  doSetTopMoment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  momentDetail: makeSelectBusinessDetail(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMoment: (id) => dispatch(fetchMomentDetail(id)),
    saveMoment: (data) => dispatch(loadMomentDetail(data)),
    doLikeMoment: (id, uid, from) => dispatch(likeMoment(id, uid, from)),
    doLikeComment: (id, cid, uid) =>  dispatch(likeComment(id, cid, uid)),
    doSendComment: (id, uid, content, from, pid) => dispatch(sendComment(id, uid, content, from, pid)),
    doDelComment: (id, cid) => dispatch(delComment(id, cid)),
    doCollectMoment: (id) => dispatch(collectMoment(id)),
    doSetTopMoment: (id, reward_as) => dispatch(setTopMoment(id, reward_as)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MomentDetail);
