import React from 'react';
import styled from 'styled-components';
import FlexRowContentCenter from 'components/FlexRowContentCenter';

const MessageItem = styled.span`
  margin-right: 0.15rem
`;

function LotteryMessage(props) {
  const { style } = props;
  const rootStyle = {
    fontWeight: 'bold',
    fontSize: '0.21rem',
  };

  return (
    <div style={{ ...rootStyle, ...style }}>
      <FlexRowContentCenter style={{ fontSize: '0.24rem' }}>
        如何获取更多抽奖次数？
      </FlexRowContentCenter>
      <FlexRowContentCenter style={{ marginTop: '0.2rem' }}>
        <div style={{ width: '6.05rem' }}>
          <MessageItem>1.每日领取登录红包</MessageItem>
          <MessageItem>2.邀请好友下载</MessageItem>
          <MessageItem>3.评论</MessageItem>
          <MessageItem>4.点赞</MessageItem>
          <MessageItem>5.转介绍</MessageItem>
          <MessageItem>6.发布讨论</MessageItem>
          <MessageItem>7.分享动态</MessageItem>
          <MessageItem>8.发布供应</MessageItem>
          <MessageItem>9.发布需求</MessageItem>
        </div>
      </FlexRowContentCenter>
    </div>
  );
}

LotteryMessage.propTypes = {

};

export default LotteryMessage;
