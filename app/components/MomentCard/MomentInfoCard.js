/**
*
* MomentInfoCard
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import oss from 'utils/oss';
import { browserHistory } from 'react-router';

const Wrapper = styled.div`
  display: flex;
`;

const ContentWrapper= styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  fontSize: 0.28rem;
  color: ${pallete.text.content};
`;

class MomentInfoCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { moment, style } = this.props;
    const {
      id,
      pictures,
      content,
      created_at,
    } = moment;

    const rootStyle = {
      position: 'relative',
      backgroundColor: pallete.white,
      padding: '0.24rem',
      borderBottom: `0.01rem ${pallete.border.normal} solid`,
    };

    const date = new Date(created_at * 1000);

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
              type: 'userinfo',
            },
          });
        }}
      >
        <Wrapper>
          {pictures.length > 0 && (
            <div
              style={{
                backgroundImage: `url(${oss.getImgSuitablePath(pictures[0])})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                width: '1.2rem',
                height: '1.2rem',
                marginRight: '0.06rem',
              }}
            />
          )}
          <ContentWrapper>{content}</ContentWrapper>
        </Wrapper>
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0.24rem',
          fontSize: '0.24rem',
          color: '#A4A9B8',
        }}>
          {`${date.getHours()}:${date.getMinutes()}`}
        </div>
      </div>
    );
  }
}

MomentInfoCard.propTypes = {
  moment: PropTypes.object,
  style: PropTypes.object,
};

export default MomentInfoCard;
