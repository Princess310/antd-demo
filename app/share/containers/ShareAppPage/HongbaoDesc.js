/**
*
* HongbaoDesc
*
*/

import React from 'react';
import styled from 'styled-components';
import FlexColumnCenter from 'components/FlexColumnCenter';
import descImg from 'assets/images/share-hongbao-des.png';

const DescItem = styled.div`
  position: relative;
  z-index: 0;
  width: 5.2rem;
  font-size: 0.37rem;
  font-weight: bold;
  color: #ff5d5a;

  &::before{
    content: attr(data-text);
    position: absolute;
    -webkit-text-stroke: 0.03rem #fff;
    z-index: -1;
  }
`;

const CountWrapper = styled.div`
  margin-top: 0.12rem;
  display: flex;
  align-items: flex-end;
  color: #1e1e1e;
  font-size: 0.28rem;
  font-weight: bold;
`;

const CountItem = styled.div`
  margin-right: 0.28rem;
  height: 0.86rem;
  width: 0.68rem;
  font-size: 0.37rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.86rem;
  border-radius: 0.05rem;
  background-color: rgba(0, 0, 0, 0.8);
`;

class HongbaoDesc extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  getPerCount = (i) => {
    const { count } = this.props;
    let countStr = count.toString();
    
    if (countStr.length <= 5) {
      countStr = '0'.repeat(5 - countStr.length) + countStr;
    } else if (countStr.length === 6) {
      countStr = `${countStr[0]}${countStr[1]}.${countStr[2]}${countStr[3]}`;
    } else if (countStr.length === 7) {
      countStr = `${countStr[0]}${countStr[1]}${countStr[2]}.${countStr[3]}`;
    } else {
      const needAddCount = 9 - countStr.length;
      countStr = '0'.repeat(needAddCount) + countStr;
      countStr = countStr.substring(0, 5);
    }

    return countStr.substring(i, i + 1);
  }

  render() {
    const { count } = this.props;
    const length = count.toString().length;

    return (
      <FlexColumnCenter
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '5.56rem',
        }}
      >
        <img src={descImg} />
        <DescItem style={{ marginTop: '0.16rem', textAlign: 'left' }} data-text="已领取">已领取</DescItem>
        <CountWrapper>
          <CountItem>{this.getPerCount(0)}</CountItem>
          <CountItem>{this.getPerCount(1)}</CountItem>
          <CountItem>{this.getPerCount(2)}</CountItem>
          <CountItem>{this.getPerCount(3)}</CountItem>
          <CountItem>{this.getPerCount(4)}</CountItem>
          <span>{length > 5 ? '万元' : '元'}</span>
        </CountWrapper>
        <DescItem style={{ marginTop: '0.2rem', textAlign: 'right'}} data-text="更多奖金等你来拿">更多奖金等你来拿</DescItem>
      </FlexColumnCenter>
    );
  }
}

HongbaoDesc.propTypes = {

};

export default HongbaoDesc;
