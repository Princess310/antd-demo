import React from 'react';
import FlexCenter from 'components/FlexCenter';

import { Button } from 'antd-mobile';

function HongbaoFooter(props) {
  return (
    <FlexCenter
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: '1.74rem',
        backgroundColor: '#fff',
      }}
    >
      <Button style={{ width: '5.9rem',backgroundColor: '#ff5d5a', color: '#ffffff' }}>下载登录领现金红包</Button>
    </FlexCenter>
  );
}

HongbaoFooter.propTypes = {

};

export default HongbaoFooter;
