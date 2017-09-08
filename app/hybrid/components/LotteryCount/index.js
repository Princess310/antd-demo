import React from 'react';
import styled from 'styled-components';
import FlexRowContentCenter from 'components/FlexRowContentCenter';
import img from 'assets/images/hybrid-lottery-title.png';

import { Icon } from 'antd-mobile';

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -1.8rem;
  bottom: 1.08rem;
  width: 3.6rem;
  height: 0.72rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 黑体;
  font-weight: bold;
  border-radius: 0.36rem;
  border: 0.05rem #ff5c5d solid;
  background-color: rgba(255, 255, 255, 0.5);
`;

function LotteryCount(props) {
  const { style } = props;

  return (
    <FlexRowContentCenter style={{ position: 'relative', ...style }}>
      <img src={img} role="presetation" style={{ width: '6.14rem', height: '4.76rem' }} />
      <Wrapper>
        <Icon type={require('icons/ali/礼物.svg')} color="#51514f" />
        <div style={{ fontSize: '0.36rem', color: 'rgba(81, 81, 79, 0.7)', marginLeft: '0.16rem' }}>
          你还有<span style={{ color: '#ff5c5d'}}>1</span>次机会
        </div>
      </Wrapper>
    </FlexRowContentCenter>
  );
}

LotteryCount.propTypes = {

};

export default LotteryCount;

