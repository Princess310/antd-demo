/**
*
* MomentCard
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import FlexSB from 'components/FlexSB';
import FlexRowCenter from 'components/FlexRowCenter';
import DateInfo from 'components/DateInfo';

import oss from 'utils/oss';
import { browserHistory } from 'react-router';

const ContentWrapper= styled.div`
  fontSize: 0.26rem;
  color: ${pallete.text.content};
`;

const PicWrapper = styled.div`
  margin-bottom: 0.12rem;
  display: flex;
  flex-wrap: wrap;
`;

const ItemWrapper = styled.span`
  display: inline-block;
  padding: 0 0.12rem;
  height: 0.24rem;
  line-height: 0.24rem;
  color: ${pallete.text.help};
  font-size: 0.24rem;
  border-left: 0.01rem ${pallete.text.help} solid;
`;

class CmsMomentCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { moment, style } = this.props;
    const {
      id,
      content,
      pictures,
      hits,
      comment_count,
      share_count,
      like_count,
      created_at,
    } = moment;

    const rootStyle = {
      backgroundColor: pallete.white,
      padding: '0.04rem 0.1rem'
    };

    const picturesView = pictures.map((pic, i) => (
      <div
        key={i}
        style={{
          backgroundImage: `url(${oss.getImgSuitablePath(pic)})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          width: '100%',
          height: '3.5rem',
        }}
      />
    ));

    return (
      <div
        style={Object.assign(rootStyle, style)}
        onClick={() => {
          browserHistory.push({
            pathname: 'momentDetail',
            query: {
              id,
            },
            state: {
              type: 'communication',
            },
          });
        }}
      >
        <div style={{ padding: '0.15rem' }}>
          <ContentWrapper>
            <div>{content}</div>
            <PicWrapper>{picturesView}</PicWrapper>
            <FlexSB>
              <FlexRowCenter
                style={{
                  width: '4.8rem'
                }}
              >
                {hits > 0 && <ItemWrapper style={{ paddingLeft: 0, borderLeft: 0 }}>{hits}人看过</ItemWrapper>}
                {comment_count > 0 && <ItemWrapper>{comment_count}评论</ItemWrapper>}
                {like_count > 0 && <ItemWrapper>{like_count}点赞</ItemWrapper>}
                {share_count > 0 && <ItemWrapper>{share_count}分享</ItemWrapper>}
              </FlexRowCenter>
              {created_at && <DateInfo
                time={created_at}
                style={{
                  color: pallete.text.help,
                }}
              />}
            </FlexSB>
          </ContentWrapper>
        </div>
      </div>
    );
  }
}

CmsMomentCard.propTypes = {
  moment: PropTypes.object,
  style: PropTypes.object,
};

export default CmsMomentCard;
