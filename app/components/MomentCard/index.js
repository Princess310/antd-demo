/**
*
* MomentCard
*
*/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import pallete from 'styles/colors';
import oss from 'utils/oss';
import request from 'utils/request';
import shareUtil from 'utils/shareUtil';
import shareConfig from 'utils/shareConfig';
import brower from 'utils/brower';

import { browserHistory } from 'react-router';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIdefault from 'photoswipe/dist/photoswipe-ui-default';

import { Icon, ActionSheet, Button, Toast } from 'antd-mobile';
import operation from 'components/Operation';
import FlexSB from 'components/FlexSB';
import LineTag from 'components/LineTag';
import chatTool from 'components/ChatTool';
import showWeixinGuide from 'components/WeixinGuide';
import { likeMoment, sendComment, delMoment, collectMoment, setTopMoment, changeMomentTrade } from 'containers/BusinessPage/actions';
import MomentHeader from './MomentHeader';
import TypeHeader from './TypeHeader';
import CmsMomentHeader from 'components/MomentCard/CmsMomentHeader';
import MomentComment from './MomentComment';

const ContentWrapper= styled.div`
  position: relative;
  padding: 0 0 0.12rem 1.08rem;
  fontSize: 0.26rem;
  color: ${pallete.text.content};
`;

const WordsWrapper = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const PicWrapper = styled.div`
  margin-bottom: 0.12rem;
  display: flex;
  flex-wrap: wrap;
`;

const Remark = styled.span`
  color: ${pallete.theme};
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const contentActionStyle = {
  margin: '0.12rem 0',
  fontSize: '0.28rem',
  color: pallete.text.deepBlue,
};

const actionSheetStyle = {
  paddingLeft: 0,
  textAlign: 'center',
  color: pallete.theme,
};

const buttonStyle = {
  position: 'absolute',
  top: '0.2rem',
  left: 0,
  height: '0.4rem',
  width: '1rem',
  lineHeight: '0.4rem',
  fontSize: '0.24rem',
  color: pallete.white,
}

const actionItemStyle = {
  marginLeft: '0.36rem',
};

const tagStyle = {
  borderColor: pallete.theme,
  backgroundColor: pallete.theme,
  color: pallete.white,
}

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

class MomentCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { moment: { content }, from } = this.props;

    const moreContent = (from !== 'detail' && content.length > 100);
    this.state = {
      moreContent,
      expanded: false,
    };
  }

  handleView = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment } = this.props;
    const eTarget = e.target || e.srcElement;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const length = document.body.clientWidth;

    const items = moment.pictures.map((p) => ({
      src: p,
      w: length,
      h: length,
      doGetSlideDimensions: true,
    }));

    const options = {
      index: i,
      shareEl: false,
      bgOpacity: 0.5,
      // getThumbBoundsFn: () => {
      //   const thumbnail = eTarget;
      //   const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      //   const rect = thumbnail.getBoundingClientRect();

      //   return {
      //     x: rect.left,
      //     y: rect.top + pageYScroll,
      //     w: rect.width,
      //   };
      // },
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIdefault, items, options);

    function getSlideDimensions(slide) {

      if (!slide.doGetSlideDimensions)
          return;    // make sure we don't keep requesting the image if it doesn't exist etc.

      let img = new Image();

      img.onerror = () => {
        slide.doGetSlideDimensions = false;
      };

      img.onload = () => {
        slide.doGetSlideDimensions = false;

        slide.w = img.naturalWidth;
        slide.h = img.naturalHeight;

        gallery.invalidateCurrItems();
        gallery.updateSize(true);
      }

      img.src = slide.src;
    }

    gallery.listen("gettingData", function(index, slide){
      if (slide.doGetSlideDimensions) {
        setTimeout(
          // use setTimeout so that it runs in the event loop
          function(){ getSlideDimensions(slide); }
          ,300
        );
      }
    });

    gallery.listen("imageLoadComplete", function(index, slide){
      if (slide.doGetSlideDimensions) {
        getSlideDimensions(slide);
      }
    });

    gallery.init();
  }

  showActionSheet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment, from, currentUser, doDelMoment, doCollectMoment, doChangeMomentTrade, type } = this.props;
    let moreAction = [];

    if (type === 'business' && moment.reward_as === '2') {
      moreAction = [
        { text: '关闭或打开需求', onPress: () => {
          doChangeMomentTrade(moment.id, from);
        }, style: actionSheetStyle },
        { text: '公布或隐藏电话', onPress: () => {
          request.doPost('moments/show-mobile').then(() => {
            Toast.info('操作成功!', 2);
          });
        }, style: actionSheetStyle },
      ];
    }

    if (String(currentUser.id) === String(moment.uid)) {
      operation([
        { text: '收藏', onPress: () => {
          doCollectMoment(moment.id);
        }, style: actionSheetStyle },
        ...moreAction,
        { text: '删除', onPress: () => {
          doDelMoment(moment.id, from);
        }, style: {...actionSheetStyle, color: pallete.text.red} },
        { text: '取消', onPress: () => {
          // TODO: add action
        }, style: actionSheetStyle },
      ], { platform: 'ios' });
    } else {
      operation([
        { text: '收藏', onPress: () => {
          doCollectMoment(moment.id);
        }, style: actionSheetStyle },
        { text: '举报', onPress: () => {
          browserHistory.push({
            pathname: '/complaintUser',
            state: {
              id: moment.id,
              module: 1,
            },
          });
        }, style: actionSheetStyle },
        { text: '取消', onPress: () => {
          // TODO: add action
        }, style: actionSheetStyle },
      ], { platform: 'ios' });
    }
  }

  handleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment, doLikeMoment } = this.props;

    doLikeMoment(moment.id, moment.uid, 'list');
  }

  handleShowChatTool = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment, doSendComment } = this.props;

    chatTool((message) => {
      doSendComment(moment.id, moment.uid, message, 'list');
    });
  }

  handleSetTop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment, doSetTopMoment } = this.props;

    doSetTopMoment(moment.id, moment.reward_as);
  }

  handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { currentUser, moment } = this.props;
    const { id, content, pictures } = moment;
    const shareInfo = shareConfig.share('momment', moment, currentUser);

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

  handleIntroduce = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment } = this.props;

    request.doGet('moments/check-referral', {
      moments_id: moment.id,
    }).then((res) => {
      browserHistory.push({
        pathname: 'introducePublish',
        query: {
          id: moment.id,
        },
      });
    });
  }

  render() {
    const { moreContent, expanded } = this.state;
    const { moment, style, from, type, currentUser } = this.props;
    const {
      id,
      uid,
      avatar,
      verify_status,
      nickname,
      tag_identity_name,
      main_service_name,
      company,
      position,
      source_type,
      content,
      pictures,
      hits,
      comment_count,
      like_count,
      share_count,
      referral_count,
      is_like,
      comments,
      item_name,
      section,
      units,
      trade_status,
      created_at,
      category,
      reward_as,
      demand_counts,
      is_my_friend,
      characteristic_service,
      ...other,
    } = moment;

    // dom root style
    const rootStyle = {
      backgroundColor: pallete.white,
      borderBottom: `0.01rem ${pallete.border.deep} solid`,
    };

    // moment content wrapper style
    const contentStyle = Number(source_type) === 1 ? {
      paddingLeft: 0,
      paddingRight: 0,
    } : {};

    // check pic length to show
    const picLength = pictures.length === 1 ? '3.5rem' : ((pictures.length === 4 || pictures.length === 2) ? '2.2rem' : '1.88rem')
    const picturesView = pictures.map((pic, i) => (
      <div
        key={i}
        onClick={(e) => this.handleView(e, i)}
        style={{
          backgroundImage: `url(${oss.getImgSuitablePath(pic)})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          width: (Number(source_type) === 1 ? '100%' : picLength),
          height: picLength,
          marginTop: '0.06rem',
          marginRight: '0.06rem'
        }}
      />
    ));

    // check type of moment
    const businessType = (category === '3' || reward_as === '2') ? 'demand' : ((category === '0' || reward_as === '1') ? 'supplier' : 'status');
    // defined the theme color for moment to show: special for business demand && supplier
    let themeColor = pallete.theme ;

    // if (businessType) {
    //   themeColor = businessType === 'demand' ? pallete.theme : pallete.yellow;
    // }

    // content to show
    const contentResult = businessType === 'demand' ? `需求描述：${content}` : content;
    const contentView = businessType === 'demand' ? (
      <div>
        <div>{nickname}已经发布了<Remark>{demand_counts}</Remark>条需求</div>
        <div>需求类别：<Remark>{item_name}</Remark></div>
        <div>需求数量：{section === '' ? '不限' : section}</div>
        <div>{contentResult}</div>
      </div>
    ) : contentResult;

    // check is self
    const isSelf = String(currentUser.id) === String(uid);

    return (
      <div
        style={Object.assign(rootStyle, style)}
        onClick={() => {
          if (from !== 'detail') {
            browserHistory.push({
              pathname: 'momentDetail',
              query: {
                id,
              },
              state: {
                type,
              },
            });
          }
        }}
      >
        {
          from === 'list' && type === 'business' &&
          <TypeHeader type={businessType} trade_status={trade_status} />
        }
        <div style={{ padding: '0.15rem'}}>
          {(Number(source_type) !== 1 || from !== 'detail') &&
          <MomentHeader
            user={{
              id: uid,
              avatar,
              verify_status,
              nickname,
              tag_identity_name,
              main_service_name,
              company,
              position,
            }}
            type={type}
            source_type={source_type}
            businessType={businessType}
            created_at={created_at}
            {...other}
            rightContent={(
              from !== 'search' && <div style={{ width: '0.48rem', height: '0.48rem', textAlign: 'right', zIndex: 20 }} onClick={this.showActionSheet}>
                <Icon
                  type={require('icons/ali/下拉.svg')}
                  size="xs"
                  color={pallete.text.words}
                />
              </div>
            )}
          />}
          <ContentWrapper style={contentStyle}>
            {(type === 'business' && businessType === 'supplier') && (
              <div style={{ marginBottom: '0.08rem' }}>
                {item_name !== '' && <LineTag style={tagStyle}>{item_name}</LineTag>}
                {section !== '' && <LineTag style={{ marginLeft: '0.08rem', ...tagStyle }}>{section}</LineTag>}
                {characteristic_service !== '' && <LineTag style={{ marginLeft: '0.08rem', ...tagStyle }}>{characteristic_service}</LineTag>}
              </div>
            )}
            {moreContent ?
              (
                <div>
                  {expanded ?
                    (
                      <div>
                        <div>{contentView}</div>
                        <div style={contentActionStyle} onClick={this.handleExpand}>收起</div>
                      </div>
                    ) : (
                      <div>
                        <WordsWrapper>
                          {contentView}
                        </WordsWrapper>
                        <div style={contentActionStyle} onClick={this.handleExpand}>全文</div>
                      </div>
                    ) 
                  }
                </div>
              ) : (
                (Number(source_type) === 1 && from === 'detail') ? (
                  <div>
                    <CmsMomentHeader
                      user={{
                        id: uid,
                        avatar,
                        verify_status,
                        nickname,
                        tag_identity_name,
                        main_service_name,
                        company,
                        position,
                      }}
                      created_at={created_at}
                      hits={hits}
                      style={{
                        paddingBottom: '0.12rem',
                        borderBottom: `0.01rem ${pallete.border.normal} solid`,
                      }}
                    />                    
                    <div className="app-cms-content" dangerouslySetInnerHTML={{__html: contentView}} />
                  </div>                  
                ) : (
                  <div style={{ paddingTop: '0.12rem', marginBottom: '0.12rem' }}>{contentView}</div>
                )
              )
            }
            {(Number(source_type) !== 1 || from === 'list') && <PicWrapper style={contentStyle}>{picturesView}</PicWrapper>}
            {businessType === 'demand' && <div><Remark>※符合要求的请及时联系我※</Remark></div>}
            {Number(source_type) !== 1 && (
              (Number(hits) > 0 && from !== 'search') && <div style={{ fontSize: '0.26rem', color: pallete.text.help }}>{hits}人看过</div>
            )}
            {(type === 'business' && Number(is_my_friend) === 0 && !isSelf) && <Button style={{backgroundColor: themeColor, ...buttonStyle}} onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              browserHistory.push({
                pathname: '/addFriend',
                state: {
                  id: uid,
                  name: nickname,
                  flag: (businessType === 'demand' ? 1 : 2),
                  moments_id: id,
                },
              });
            }}>加好友</Button>}
          </ContentWrapper>
          {from === 'list' && 
            <ActionWrapper style={{ paddingRight: '0.12rem', fontSize: '0.28rem', color: themeColor}}>
              {(type === 'business' && isSelf) &&
                <FlexSB onClick={this.handleSetTop} style={actionItemStyle}>
                  <Icon type={require('icons/ali/置顶.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>置顶</span>
                </FlexSB>
              }
              {
                type === 'business' && trade_status === '0' &&
                <FlexSB onClick={this.handleIntroduce} style={actionItemStyle}>
                  <Icon type={require('icons/ali/转介绍.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>{referral_count > 0 ? referral_count : '转介绍'}</span>
                </FlexSB>
              }
              {
                type !== 'business' &&
                <FlexSB onClick={this.handleShowChatTool} style={actionItemStyle}>
                  <Icon type={require('icons/ali/消息.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>{comment_count > 0 ? comment_count : '评论'}</span>
                </FlexSB>
              }
              {
                type !== 'business' &&
                <FlexSB onClick={this.handleLike} style={actionItemStyle}>
                  <Icon type={is_like > 0 ? require('icons/ali/点赞-active.svg') : require('icons/ali/点赞.svg')} size="sm" />
                  <span style={{ marginLeft: '0.04rem' }}>{like_count > 0 ? like_count : '点赞'}</span>
                </FlexSB>
              }
              <FlexSB onClick={this.handleShare} style={actionItemStyle}>
                <Icon type={require('icons/ali/分享.svg')} size="xxs" />
                <span style={{ marginLeft: '0.04rem' }}>{share_count > 0 ? share_count : '分享'}</span>
              </FlexSB>
            </ActionWrapper>
          }
        </div>
        {(comments && comments.length > 0 && from === 'list') && 
          <MomentComment
            id={id}
            comments={comments}
            comment_count={comment_count}
            type={type}
            style={{ padding: '0.15rem' }}
            businessType={businessType}
          />
        }
      </div>
    );
  }
}

MomentCard.propTypes = {
  moment: PropTypes.object,
  currentUser: PropTypes.object,
  // from: check where to show & how to control view
  from: PropTypes.string,
  // communication or business
  type: PropTypes.string,
  style: PropTypes.object,
  doLikeMoment: PropTypes.func,
  doSendComment: PropTypes.func,
  doDelMoment: PropTypes.func,
  doCollectMoment: PropTypes.func,
  doSetTopMoment: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    doLikeMoment: (id, uid, from) => dispatch(likeMoment(id, uid, from)),
    doSendComment: (id, uid, content, from) => dispatch(sendComment(id, uid, content, from)),
    doDelMoment: (id, from) => dispatch(delMoment(id, from)),
    doCollectMoment: (id) => dispatch(collectMoment(id)),
    doSetTopMoment: (id, reward_as) => dispatch(setTopMoment(id, reward_as)),
    doChangeMomentTrade: (id, from) => dispatch(changeMomentTrade(id, from)),
  };
}

export default connect(null, mapDispatchToProps)(MomentCard);
