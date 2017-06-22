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

import { Icon } from 'antd-mobile';
import FlexSB from 'components/FlexSB';
import LineTag from 'components/LineTag';
import chatTool from 'components/ChatTool';
import MomentHeader from './MomentHeader';
import MomentComment from './MomentComment';

const ContentWrapper= styled.div`
  padding: 0 0 0.12rem 0;
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
  padding-right: 1.24rem;
  margin-bottom: 0.12rem;
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

class ShareMomentCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    e.stopPropagation()
    console.log('handle view');
  }

  handleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  handleShowChatTool = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { moment, doSendComment } = this.props;

    chatTool((message) => {
      this.props.doSendComment(moment.id, moment.uid, message);
    });
  }

  handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('handle share');
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
      item_name,
      section,
      units,
      trade_status,
      ...other,
    } = moment;

    const rootStyle = {
      backgroundColor: pallete.white,
    };
    const contentStyle = Number(source_type) === 1 ? {
      paddingLeft: 0,
      paddingRight: 0,
    } : {};

    const picLength = pictures.length === 1 ? '3.5rem' : ((pictures.length === 4 || pictures.length === 2) ? '2.2rem' : '1.45rem')
    const picturesView = pictures.map((pic, i) => (
      <img
        key={i}
        role="presentation"
        src={oss.getImgSuitablePath(pic)}
        onClick={(e) => this.handleView(e, i)}
        style={{
          width: (Number(source_type) === 1 ? '100%' : picLength),
          height: picLength,
          marginTop: '0.06rem',
          marginRight: '0.06rem'
        }} />
    ));

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
        <div style={{ padding: '0.15rem', borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
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
            trade_status={trade_status}
            {...other}
          />}
          <ContentWrapper style={contentStyle}>
            {type === 'business' && (
              <div style={{ marginBottom: '0.08rem' }}>
                {item_name !== '' && <LineTag>{item_name}</LineTag>}
                {section !== '' && <LineTag style={{ marginLeft: '0.08rem' }}>{section}</LineTag>}
              </div>
            )}
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
                Number(source_type) === 1 ? (
                  <div dangerouslySetInnerHTML={{__html: content}} />
                ) : (
                  <div style={{ marginBottom: '0.12rem' }}>{content}</div>
                )
              )
            }
            {(Number(source_type) !== 1 || from === 'list') && <PicWrapper style={contentStyle}>{picturesView}</PicWrapper>}
            {(Number(source_type) === 1 && from === 'detail') ? (
              Number(hits) > 0 && <div style={{ paddingTop: '0.24rem', fontSize: '0.26rem', color: pallete.text.words, borderTop: `0.01rem ${pallete.border.normal} solid` }}>阅读{hits}</div>
            ) : (
              (Number(hits) > 0 && from !== 'search') && <div style={{ fontSize: '0.26rem', color: pallete.text.help }}>{hits}人看过</div>
            )}
          </ContentWrapper>
          <FlexSB style={{ paddingLeft: (type === 'business' ? '2.6rem' : '3.6rem'), paddingRight: '0.12rem', fontSize: '0.28rem', color: pallete.text.help }}>
            <FlexSB onClick={this.handleShowChatTool}>
              <Icon type={require('icons/ali/评论.svg')} size="sm" color={pallete.text.help} />
              <span style={{ marginLeft: '0.04rem' }}>{comment_count > 0 ? comment_count : '评论'}</span>
            </FlexSB>
            <FlexSB onClick={this.handleLike}>
              <Icon type={require('icons/ali/点赞.svg')} size="sm" color={is_like > 0 ? pallete.theme : pallete.text.help} />
              <span style={{ marginLeft: '0.04rem' }}>{like_count > 0 ? like_count : '点赞'}</span>
            </FlexSB>
            <FlexSB onClick={this.handleShare}>
              <Icon type={require('icons/ali/分享.svg')} size="xxs" color={pallete.text.help} />
              <span style={{ marginLeft: '0.04rem' }}>{share_count > 0 ? share_count : '分享'}</span>
            </FlexSB>
          </FlexSB>
        </div>
        {(comments && comments.length > 0 && from === 'list') && 
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

ShareMomentCard.propTypes = {
  moment: PropTypes.object,
  // from: check where to show & how to control view
  from: PropTypes.string,
  // communication or business
  type: PropTypes.string,
  style: PropTypes.object,
};

export default ShareMomentCard;
