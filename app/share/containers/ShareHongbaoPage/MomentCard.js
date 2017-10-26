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

import FlexRow from 'components/FlexRow';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexSB from 'components/FlexSB';

const LineBar = styled.div`
  margin-right: 0.15rem;
  width: 0.06rem;
  height: 0.32rem;
  background-color: #f1ad92;
`;

const WordsContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;


const Remark = styled.span`
  color: ${pallete.black};
`;

const ImageStyle = {
  width: 'calc((100vw - 0.72rem) / 3)',
  height: '2.25rem',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundColor: '#eee',
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
      ...other,
    } = moment;

    const imageView = pictures.length > 0 ? (
      pictures.map((pic, i) => (
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

    const contentView = (
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
        <WordsContent>{`需求描述：${content}`}</WordsContent>
      </div>
    );

    return (
      <div style={style}>
        <FlexSB>
          <FlexRowCenter style={{ width: '70%' }}>
            <LineBar />
            <div style={{ color: '#333333', fontSize: '0.26rem' }}>看看{nickname}的动态吧 | 需求内容</div>
          </FlexRowCenter>
          <div style={{ fontSize: '0.2rem', color: '#999999' }}>
            浏览{hits}次
          </div>
        </FlexSB>
        <FlexSB style={{ marginTop: '0.12rem' }}>
          {imageView}
        </FlexSB>
        {contentView}
      </div>
    );
  }
}

MomentCard.propTypes = {
  moment: PropTypes.object,
};

export default MomentCard;
