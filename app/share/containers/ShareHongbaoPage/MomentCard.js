/**
*
* MomentHeader
*
* Moment card header, which is spit to code easily
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import oss from 'utils/oss';
import { getQueryString } from 'utils/utils';

import FlexRow from 'components/FlexRow';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexSB from 'components/FlexSB';
import LineTag from 'components/LineTag';

const LineBar = styled.div`
  margin-right: 0.15rem;
  width: 0.06rem;
  height: 0.32rem;
  background-color: #f1ad92;
`;

const Remark = styled.span`
  color: ${pallete.black};
`;

const WordsWrapper = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ImageStyle = {
  width: 'calc((100vw - 0.72rem) / 3)',
  height: '2.25rem',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundColor: '#eee',
}

const tagStyle = {
  borderColor: pallete.theme,
  backgroundColor: pallete.theme,
  color: pallete.white,
}

class MomentCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {
      padding: '0 0.24rem',
    },
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

  render() {
    const {
      moment,
      style,
    } = this.props;

    const {
      id,
      nickname,
      content,
      pictures,
      hits,
      item_name,
      section,
      units,
      category,
      reward_as,
      demand_counts,
      characteristic_service,
      ...other,
    } = moment;

    // check type of moment
    const businessType = (category === '3' || reward_as === '2') ? 'demand' : ((category === '0' || reward_as === '1') ? 'supplier' : 'status');

    const imageView = pictures.length > 0 ? (
      pictures.slice(0, 3).map((pic, i) => (
        <div
          key={i}
          onClick={(e) => this.handleView(e, i)} 
          style={{
            backgroundImage: `url(${oss.getImgSuitablePath(pic)})`,
            ...ImageStyle,
          }}
        />
      ))
    ) : null;

    // content to show
    const contentResult = businessType === 'demand' ? `需求描述：${content}` : content;
    const contentView = businessType === 'demand' ? (
      <div style={{
        marginTop: '0.12rem',
        fontSize: '0.26rem',
        color: '#666666',
      }}>
        <div>{nickname}已经发布了{demand_counts}条需求</div>
        <FlexRowCenter>
          <div>需求类别：<Remark>{item_name}</Remark></div>
          <div style={{ marginLeft: '0.48rem' }}>需求数量：{section === '' ? '不限' : section}</div>
        </FlexRowCenter>
        <WordsWrapper>{`需求描述：${content}`}</WordsWrapper>
      </div>
    ) : <WordsWrapper style={{ fontSize: '0.26rem', color: '#666666' }}>{contentResult}</WordsWrapper>;;

    return (
      <div style={style}>
        <FlexSB>
          <FlexRowCenter style={{ width: '70%' }}>
            <LineBar />
            <div style={{ color: '#333333', fontSize: '0.26rem' }}>看看{nickname}的动态吧 | {businessType === 'demand' ? '需求' : '供应'}内容</div>
          </FlexRowCenter>
          <div style={{ fontSize: '0.2rem', color: '#999999' }}>
            浏览{hits}次
          </div>
        </FlexSB>
        <FlexSB style={{ marginTop: '0.12rem' }}>
          {imageView}
        </FlexSB>
        {businessType === 'supplier' && (
          <div style={{ marginBottom: '0.08rem' }}>
            {item_name !== '' && <LineTag style={tagStyle}>{item_name}</LineTag>}
            {section !== '' && <LineTag style={{ marginLeft: '0.08rem', ...tagStyle }}>{section}</LineTag>}
            {characteristic_service !== '' && <LineTag style={{ marginLeft: '0.08rem', ...tagStyle }}>{characteristic_service}</LineTag>}
          </div>
        )}
        {contentView}
      </div>
    );
  }
}

MomentCard.propTypes = {
  moment: PropTypes.object,
};

export default MomentCard;
