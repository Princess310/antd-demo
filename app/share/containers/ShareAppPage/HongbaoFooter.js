import React from 'react';
import FlexCenter from 'components/FlexCenter';
import FlexColumnCenter from 'components/FlexColumnCenter';
import HongbaoUserInfo from 'share/components/HongbaoUserInfo';

import { Button } from 'antd-mobile';

import { linkOpenInstall } from 'utils/utils';

function HongbaoFooter(props) {
  const { buttonStyle } = props;

  return (
    <FlexCenter
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: '2rem',
        borderTop: '0.01rem solid #e6e9ec',
        backgroundColor: '#fff',
        zIndex: 999,
      }}
    >
      <FlexColumnCenter>
        <Button
          style={{
            width: '5.9rem',
            backgroundColor: '#ff5d5a',
            color: '#ffffff',
            ...buttonStyle,
          }}
          onClick={() => {
            linkOpenInstall();
          }}
        >下载登录领现金红包</Button>
        <HongbaoUserInfo />
      </FlexColumnCenter>
    </FlexCenter>
  );
}

HongbaoFooter.propTypes = {

};

export default HongbaoFooter;
