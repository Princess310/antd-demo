/**
*
* HongBaoList
*
*/

import React from 'react';
import styled from 'styled-components';
import img from 'assets/images/share-hongbao.png';

import { resetAnimationFrame } from 'utils/utils';
import request from 'utils/shareRequest';

const Container = styled.div`
  height: 2.4rem;
  overflow-y: hidden;
`;

const ItemWrapper = styled.div`
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  height: 0.64rem;
  padding: 0.1rem 0.15rem;
  border-radius: 0.05rem;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Avatar = styled.img`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
`;

let scrollY = 0;
class HongBaoItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { avatar, nickname, count } = this.props;
    return (
      <div>
        <div style={{ display: 'inline-block' }}>
          <ItemWrapper>
            <Avatar src={avatar} />
            <div style={{ marginLeft: '0.15rem', fontSize: '0.2rem', fontWeight: 'bold' }}>{`${nickname} 领取了${count}元现金红包`}</div>
            <img src={img} style={{ marginLeft: '0.2rem', width: '0.18rem', height: '0.2rem' }} />
          </ItemWrapper>
        </div>
      </div>
    );
  }
}

class HongBaoList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    resetAnimationFrame();
    this.doAnimation();
  }

  doAnimation = () => {
    if (this.container.offsetHeight + scrollY === 0) {
      scrollY = 0;
    }
    this.container.style.transform = `translateY(${scrollY}px)`;

    scrollY -= 1;
    window.requestAnimationFrame(this.doAnimation);
  }

  render() {
    const { list } = this.props;
    
    return (
      <Container>
        <div ref={r => this.container = r} style={{ willChange: 'transform' }}>
          {list.map((item) => (
            <HongBaoItem
              key={item.id}
              avatar={item.avatar}
              nickname={item.nickname}
              count={item.newcomers_fee}
            />
          ))}
        </div>
      </Container>
    );
  }
}

HongBaoList.propTypes = {

};

export default HongBaoList;
