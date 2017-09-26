import React from 'react';
import styled from 'styled-components';
import FlexRowContentCenter from 'components/FlexRowContentCenter';
import img from 'assets/images/hybrid-count-bg.png';

const Wrapper = styled.div`
  width: 6.76rem;
  height: 3.08rem;
  text-align: center;
  line-height: 3.08rem;
  font-size: 1.43rem;
  color: #ff5c5d;
  font-weight: bold;
  font-family: 黑体;
  background-image: url(${img});
  background-position: center center;
  background-size: 100% 100%;
`;

function WelcomeCount(props) {
  const { style, count } = props;
  return (
    <FlexRowContentCenter style={style} className="zoomIn animated-2">
      <Wrapper>{`${count}元`}</Wrapper>
    </FlexRowContentCenter>
  );
}

WelcomeCount.propTypes = {
};

export default WelcomeCount;

