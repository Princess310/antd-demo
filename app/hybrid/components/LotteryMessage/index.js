import React from 'react';
import styled from 'styled-components';
import FlexRowContentCenter from 'components/FlexRowContentCenter';

const MessageItem = styled.span`
  margin-right: 0.15rem;
  counter-increment: msg-counter;

  &:before {
    margin-right: 0.04rem;
    display: inline-block;
    content: counter(msg-counter);
    width: 0.28rem;
    height: 0.28rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.28rem;
    border-radius: 50%;
    background-color: #ff5c5d;
  }
`;

function LotteryMessage(props) {
  const { style } = props;
  const rootStyle = {
    fontWeight: 'bold',
    fontSize: '0.21rem',
    counterReset: 'msg-counter',
  };

  return (
    <div style={{ ...rootStyle, ...style }}>
      <FlexRowContentCenter style={{ fontSize: '0.24rem' }}>
        如何获取更多抽奖次数？
      </FlexRowContentCenter>
      <FlexRowContentCenter style={{ marginTop: '0.2rem' }}>
        <div style={{ width: '6.8rem', lineHeight: '0.4rem' }}>
          <MessageItem>每日领取登录红包</MessageItem>
          <MessageItem>邀请好友下载</MessageItem>
          <MessageItem>评论</MessageItem>
          <MessageItem>点赞</MessageItem>
          <MessageItem>转介绍</MessageItem>
          <MessageItem>发布社交</MessageItem>
          <MessageItem>分享动态</MessageItem>
          <MessageItem>发布供应</MessageItem>
          <MessageItem>发布需求</MessageItem>
        </div>
      </FlexRowContentCenter>
    </div>
  );
}

LotteryMessage.propTypes = {

};

export default LotteryMessage;
