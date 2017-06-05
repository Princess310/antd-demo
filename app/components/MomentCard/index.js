/**
*
* MomentCard
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import oss from 'utils/oss';
import { browserHistory } from 'react-router';

import { Icon, Modal } from 'antd-mobile';
import FlexSB from 'components/FlexSB';
import MomentHeader from './MomentHeader';
import MomentComment from './MomentComment';

const ContentWrapper= styled.div`
  padding: 0.12rem 0 0.12rem 1.08rem;
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
  padding-right: 1.52rem;
  display: flex;
  flex-wrap: wrap;
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

const operation = Modal.operation;
class MomentCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { moment: { content }, from } = this.props;

    const moreContent = (from === 'list' && content.length > 60);
    this.state = {
      moreContent,
      expanded: false,
    };
  }

  showActionSheet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment, currentUser } = this.props;

    if (String(currentUser.id) === String(moment.uid)) {
      operation([
        { text: '删除', onPress: () => {
          // TODO: add action
        }, style: {...actionSheetStyle, color: pallete.text.red} },
        { text: '取消', onPress: () => {
          // TODO: add action
        }, style: actionSheetStyle },
      ]);
    } else {
      operation([
        { text: '收藏', onPress: () => {
          // TODO: add action
        }, style: actionSheetStyle },
        { text: '举报', onPress: () => {
          // TODO: add action
        }, style: actionSheetStyle },
        { text: '取消', onPress: () => {
          // TODO: add action
        }, style: actionSheetStyle },
      ]);
    }
  }

  handleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { moreContent, expanded } = this.state;
    const { moment, style, from, type } = this.props;
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
      is_like,
      comments,
      ...other,
    } = moment;

    const rootStyle = {
      backgroundColor: pallete.white,
    };
    const contentStyle = Number(source_type) === 1 ? {
      paddingLeft: 0,
    } : {};

    const picLength = pictures.length === 0 ? '100%' : ((pictures.length === 4 || pictures.length === 2) ? '2.2rem' : '1.45rem')
    const picturesView = pictures.map((pic, i) => (
      <img key={i} role="presentation" src={oss.getImgSuitablePath(pic)} style={{ width: picLength, height: picLength, marginTop: '0.06rem', marginRight: '0.06rem' }} />
    ));

    return (
      <div
        style={Object.assign(rootStyle, style)}
        onClick={() => {
          if (Number(source_type) === 1) {
            browserHistory.push('/service');
          } else {
            if (from === 'list') {
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
          }
        }}
      >
        <div style={{ padding: '0.15rem', borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
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
              type,
            }}
            source_type={source_type}
            {...other}
            rightContent={(
              <div style={{ width: '0.48rem', height: '0.48rem', textAlign: 'right' }} onClick={this.showActionSheet}>
                <Icon
                  type={require('icons/ali/下拉.svg')}
                  size="xs"
                  color={pallete.text.words}
                />
              </div>
            )}
          />
          <ContentWrapper style={contentStyle}>
            {moreContent ?
              (
                <div>
                  {expanded ?
                    (
                      <div>
                        <div>{content}</div>
                        <div style={contentActionStyle} onClick={this.handleExpand}>收起</div>
                      </div>
                    ) : (
                      <div>
                        <WordsWrapper>
                          {content}
                        </WordsWrapper>
                        <div style={contentActionStyle} onClick={this.handleExpand}>全文</div>
                      </div>
                    ) 
                  }
                </div>
              ) : (
                <div style={{ marginBottom: '0.12rem' }}>{content}</div>
              )
            }
            <PicWrapper>{picturesView}</PicWrapper>
            {Number(hits) > 0 && <div style={{ fontSize: '0.26rem', color: pallete.text.help }}>{hits}人看过</div>}
          </ContentWrapper>
          {from === 'list' && 
            <FlexSB style={{ paddingLeft: (type === 'business' ? '2.6rem' : '3.6rem'), paddingRight: '0.12rem', fontSize: '0.28rem', color: pallete.text.help }}>
              {type === 'business' &&
                <FlexSB>
                  <Icon type={require('icons/ali/置顶.svg')} size="sm" color={pallete.text.help} />
                  <span style={{ marginLeft: '0.04rem' }}>置顶</span>
                </FlexSB>
              }
              <FlexSB>
                <Icon type={require('icons/ali/评论.svg')} size="sm" color={pallete.text.help} />
                <span style={{ marginLeft: '0.04rem' }}>{comment_count > 0 ? comment_count : '评论'}</span>
              </FlexSB>
              <FlexSB>
                <Icon type={require('icons/ali/点赞.svg')} size="sm" color={is_like > 0 ? pallete.theme : pallete.text.help} />
                <span style={{ marginLeft: '0.04rem' }}>{like_count > 0 ? like_count : '点赞'}</span>
              </FlexSB>
              <FlexSB>
                <Icon type={require('icons/ali/分享.svg')} size="xxs" color={pallete.text.help} />
                <span style={{ marginLeft: '0.04rem' }}>{share_count > 0 ? share_count : '分享'}</span>
              </FlexSB>
            </FlexSB>
          }
        </div>
        {(comments.length > 0 && from === 'list') && 
          <MomentComment
            id={id}
            comments={comments}
            comment_count={comment_count}
            type={type}
            style={{ padding: '0.15rem' }}
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
};

export default MomentCard;
