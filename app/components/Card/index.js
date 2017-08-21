/**
*
* Card
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import oss from 'utils/oss';

const wrapperStyle = {
  margin: '0.32rem',
  padding: '0.15rem 0.15rem 0 0.15rem',
  backgroundColor: pallete.white,
};

const TitleWrapper = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

function Card(props) {
  const { style, title, subTitle, pic, content, footer } = props;

  return (
    <div style={{...style, ...wrapperStyle}}>
      {title && <TitleWrapper>{title}</TitleWrapper>}
      {subTitle && <div style={{ marginTop: '0.08rem' }}>{subTitle}</div>}
      {pic && <div style={{
        backgroundImage: `url(${oss.getImgSuitablePath(pic)})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        width: '100%',
        height: '3.6rem',
        marginTop: '0.08rem',
      }}></div>}
      {content && <div style={{ padding: '0 0.15rem', color: pallete.text.content }}>{content}</div>}
      {footer && <div style={{ borderTop: `0.01rem ${pallete.border.normal} solid` }}>{footer}</div>}
    </div>
  );
}

Card.propTypes = {
  style: PropTypes.object,
  title: PropTypes.any,
  subTitle: PropTypes.any,
  pic: PropTypes.string,
  content: PropTypes.any,
  footer: PropTypes.any,
};

export default Card;
