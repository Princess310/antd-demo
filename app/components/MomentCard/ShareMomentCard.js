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

import { Icon, Button, Toast } from 'antd-mobile';
import FlexSB from 'components/FlexSB';
import LineTag from 'components/LineTag';
import chatTool from 'components/ChatTool';
import CmsMomentHeader from 'components/MomentCard/CmsMomentHeader';

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
  margin-bottom: 0.12rem;
  display: flex;
  flex-wrap: wrap;
`;

const Remark = styled.span`
  color: ${pallete.theme};
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
  right: '0.2rem',
  height: '0.4rem',
  width: '1rem',
  lineHeight: '0.4rem',
  fontSize: '0.24rem',
  color: pallete.white,
  backgroundColor: pallete.theme,
}

class ShareMomentCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  handleView = (e, i) => {
    e.preventDefault();
    e.stopPropagation()
    const { moment: { pictures } } = this.props;

    wx.previewImage({
      current: pictures[i],
      urls: pictures,
    });
  }

  handleDownloadInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Toast.info('请注册或登录', 2);
  }

  render() {
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
      category,
      reward_as,
      created_at,
      demand_counts,
      ...other,
    } = moment;

    const rootStyle = {
      backgroundColor: pallete.white,
    };
    const contentStyle = Number(source_type) === 1 ? {
      paddingLeft: 0,
      paddingRight: 0,
    } : {
      marginTop: '0.2rem',
    };

    const picLength = pictures.length === 1 ? '7.2rem' : ((pictures.length === 4 || pictures.length === 2) ? '3.4rem' : '2.2rem')
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
          marginTop: '0.12rem',
          marginRight: '0.12rem'
        }}
      />
    ));

    // check type of moment
    const businessType = (category === '3' || reward_as === '2') ? 'demand' : ((category === '0' || reward_as === '1') ? 'supplier' : 'status');

    // content to show
    const contentResult = businessType === 'demand' ? `需求描述：${content}` : content;
    const contentView = businessType === 'demand' ? (
      <div>
        <div>{nickname}已经发布了<Remark>{demand_counts}</Remark>条需求</div>
        <div>需求类别：<Remark>{item_name}</Remark></div>
        <div>需求数量：{section === '' ? '不限' : section}</div>
        <div>{contentResult}</div>
      </div>
    ) : (
      businessType === 'demand' ? (
        <div style={{ marginBottom: '0.08rem' }}>
          {item_name !== '' && <LineTag>{item_name}</LineTag>}
          {section !== '' && <LineTag style={{ marginLeft: '0.08rem' }}>{section}</LineTag>}
        </div>
      ) : contentResult
    );

    const tagStyle = {
      borderColor: pallete.theme,
      color: pallete.text.help,
    };

    return (
      <div
        style={Object.assign(rootStyle, style)}
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
            businessType='demand'
            trade_status={trade_status}
            created_at={created_at}
            linkUser={false}
            {...other}
          />}
          <ContentWrapper style={contentStyle}>
            {(type === 'business' && businessType === 'supplier') && (
              <div style={{ marginBottom: '0.08rem' }}>
                {item_name !== '' && <LineTag style={tagStyle}>{item_name}</LineTag>}
                {section !== '' && <LineTag style={{ marginLeft: '0.08rem', ...tagStyle }}>{section}</LineTag>}
              </div>
            )}
            {
              Number(source_type) === 1 ? (
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
                  <div dangerouslySetInnerHTML={{__html: contentView}} />
                </div>                  
              ) : (
                <div style={{ marginBottom: '0.12rem' }}>{contentView}</div>
              )
            }
            {(Number(source_type) !== 1 || from === 'list') && <PicWrapper style={contentStyle}>{picturesView}</PicWrapper>}
            {businessType === 'demand' && <div><Remark>※符合要求的请及时联系我※</Remark></div>}
            {Number(source_type) !== 1 && (
              (Number(hits) > 0 && from !== 'search') && <div style={{ fontSize: '0.26rem', color: pallete.text.help }}>{hits}人看过</div>
            )}
            {type === 'business' && <Button style={buttonStyle} onClick={this.handleDownloadInfo}>加好友</Button>}
          </ContentWrapper>
          <FlexSB style={{ paddingLeft: (type === 'business' ? '2.6rem' : '3.6rem'), paddingRight: '0.12rem', fontSize: '0.28rem', color: pallete.text.help }}>
            <FlexSB onClick={this.handleDownloadInfo}>
              <Icon type={require('icons/ali/评论.svg')} size="sm" color={pallete.text.help} />
              <span style={{ marginLeft: '0.04rem' }}>{comment_count > 0 ? comment_count : '评论'}</span>
            </FlexSB>
            <FlexSB onClick={this.handleDownloadInfo}>
              <Icon type={require('icons/ali/点赞.svg')} size="sm" color={is_like > 0 ? pallete.theme : pallete.text.help} />
              <span style={{ marginLeft: '0.04rem' }}>{like_count > 0 ? like_count : '点赞'}</span>
            </FlexSB>
            <FlexSB onClick={this.handleDownloadInfo}>
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
