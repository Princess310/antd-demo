/*
 *
 * MomentDetail
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import pallete from 'styles/colors';

import AppContent from 'components/AppContent';
import MomentCard from 'components/MomentCard';
import UserHeaderBar from 'components/UserHeaderBar';
import FlexSB from 'components/FlexSB';
import FlexCenter from 'components/FlexCenter';
import chatTool from 'components/ChatTool';
import { NavBar, Tabs, WhiteSpace, Icon, ActionSheet } from 'antd-mobile';

import { makeSelectBusinessDetail } from 'containers/BusinessPage/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { fetchMomentDetail, loadMomentDetail, likeMoment, sendComment, delComment, likeComment } from 'containers/BusinessPage/actions';

const CommentWrapper= styled.div`
  fontSize: 0.26rem;
  padding: 0 0.12rem 0.12rem 1.2rem;
  background-color: ${pallete.white};
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

const TabPane = Tabs.TabPane;
export class MomentDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { location: { query: { id } }, getMoment } = this.props;

    getMoment(id);
  }
  
  componentWillUnmount() {
    this.props.saveMoment(false);
  }

  callback = () => {

  }

  handleTabClick = () => {

  }

  handleLike = () => {
    const { momentDetail, doLikeMoment } = this.props;
    
    doLikeMoment(momentDetail.id, momentDetail.uid, 'detail');
  }
  
  handleLikeComment = (cid, uid) => {
    const { momentDetail, doLikeComment } = this.props;
    
    doLikeComment(momentDetail.id, cid, uid);
  }

  handleShowChatTool = (e) => {
    const { momentDetail, doSendComment } = this.props;

    chatTool((message) => {
      doSendComment(momentDetail.id, momentDetail.uid, message, 'detail');
    });
  }

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
    } = momentDetail;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          {(category === '3' || reward_as === '2') ? '需求详情' : ((category === '0' || reward_as === '1') ? '供应详情' : '动态详情')}
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
                defaultActiveKey="1"
                animated={false}
                onChange={this.callback}
                onTabClick={this.handleTabClick}
                className="moment-detail-tabs"
              >
                <TabPane tab={`评论 ${comment_count}`} key="1">
                  <div>
                    {comments.map((u)  => (
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
                          <div style={{ textAlign: 'right' }} onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.handleLikeComment(u.id, u.created_by);
                          }}>
                            <Icon type={require('icons/ali/点赞.svg')} size="sm" color={u.is_like > 0 ? pallete.theme : pallete.text.help} />
                          </div>
                        </CommentWrapper>
                      </div>
                    ))}
                  </div>
                </TabPane>
                <TabPane tab={`赞 ${like_count}`} key="2">
                  <div>
                    {likes.map((u)  => (
                      <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                        <UserHeaderBar
                          user={{...u, id: u.created_by}}
                        />
                      </div>
                    ))}
                  </div>
                </TabPane>
                <TabPane tab={`分享 ${share_count}`} key="3">
                  <div>
                    {shares.map((u)  => (
                      <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                        <UserHeaderBar
                          user={{...u, id: u.created_by}}
                        />
                      </div>
                    ))}
                  </div>
                </TabPane>
              </Tabs>
            </AppContent>
            <ActionWrapper>
              {(type === 'business' && String(currentUser.id) === uid) &&
                <FlexCenter>
                  <Icon type={require('icons/ali/置顶.svg')} size="sm" color={pallete.text.help} />
                  <span style={{ marginLeft: '0.04rem', color: pallete.text.help }}>置顶</span>
                </FlexCenter>
              }
              <FlexCenter onClick={this.handleShowChatTool}>
                <Icon type={require('icons/ali/评论.svg')} size="sm" color={pallete.text.help} />
                <span style={{ marginLeft: '0.04rem', color: pallete.text.help }}>{comment_count > 0 ? comment_count : '评论'}</span>
              </FlexCenter>
              <FlexCenter onClick={this.handleLike}>
                <Icon type={require('icons/ali/点赞.svg')} size="sm" color={is_like > 0 ? pallete.theme : pallete.text.help} />
                <span style={{ marginLeft: '0.04rem', color: pallete.text.help }}>{like_count > 0 ? like_count : '点赞'}</span>
              </FlexCenter>
              <FlexCenter>
                <Icon type={require('icons/ali/分享.svg')} size="xxs" color={pallete.text.help} />
                <span style={{ marginLeft: '0.04rem', color: pallete.text.help }}>{share_count > 0 ? share_count : '分享'}</span>
              </FlexCenter>
            </ActionWrapper>
          </div>
        )}
      </div>
    );
  }
}

MomentDetail.propTypes = {
  momentDetail: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  getMoment: PropTypes.func,
  currentUser: PropTypes.object,
  doLikeMoment: PropTypes.func,
  doLikeComment: PropTypes.func,
  doSendComment: PropTypes.func,
  doDelComment: PropTypes.func,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MomentDetail);
