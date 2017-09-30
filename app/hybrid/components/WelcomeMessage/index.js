import React from 'react';
// import styled from 'styled-components';

import brower from 'utils/brower';

import FlexRowContentCenter from 'components/FlexRowContentCenter';
import { Icon, Button } from 'antd-mobile';

function WelcomeMessage(props) {
  const { style, count } = props;
  const isIos = brower.checkIfIOS();

  return (
    <div style={style}>
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <section style={{ fontSize: '0.24rem' }}>活动规则</section>
        <section style={{ fontSize: '0.27rem', marginTop: '0.15rem' }}>{`分享邀请到微信朋友圈立即获得${count}元现金红包`}</section>
      </div>
      <FlexRowContentCenter style={{ marginTop: '0.3rem' }}>
        <Icon type={require('icons/ali/喇叭.svg')} color="#ff5c5d" />
        <section style={{ fontSize: '0.24rem' }}>好消息：</section>
        <section style={{ fontSize: '0.24rem', width: '4.2rem' }}>若有好友通过您的分享加入健康商信，您还可以领取到更多红包~</section>
      </FlexRowContentCenter>
      <FlexRowContentCenter>
        <Button
          style={{
            marginTop: '0.5rem',
            width: '6.75rem',
            borderRadius: '0.42rem',
            color: '#ff5c5d',
            fontWeight: 'bold',
          }}
          onClick={() => {
            if (brower.checkIfIOS()) {
              WebViewJavascriptBridge && WebViewJavascriptBridge.showShare();
            } else {
              android && android.showPopupWindow();
            }
          }}
        >
        立即分享到朋友圈
        </Button>
      </FlexRowContentCenter>
      {isIos && <section style={{ marginTop: '0.32rem', textAlign: 'center' }}>所有产品抽奖活动与苹果公司（Apple Inc）无关</section>}
    </div>
  );
}

WelcomeMessage.propTypes = {

};

export default WelcomeMessage;
