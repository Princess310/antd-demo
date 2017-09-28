/**
*
* LotteryResult
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Mask from 'components/Mask';
import { Button } from 'antd-mobile';

import img from 'assets/images/hybrid-result.png';
import delImg from 'assets/images/hybrid-del.png';

const ContentWrapper = styled.div`
  position: relative;
  padding: 0.72rem 0.32rem 0.32rem;
  width: 6rem;
  text-align: center;
  border: 0.04rem #ff6365 solid;
  border-radius: 0.08rem;
  background-color: rgba(255, 255, 255, 0.9);
`;

const imgStyle = {
  position: 'absolute',
  top: '-2.8rem',
  left: '50%',
  marginLeft: '-1.65rem',
  width: '3.3rem',
  height: '3.25rem',
};

const delStyle = {
  position: 'absolute',
  top: '-0.25rem',
  right: '-0.25rem',
  width: '0.5rem',
  height: '0.5rem',
};

function showLotteryResult(...args) {
  const title = args[0];
  const message = args[1];
  const hideImge = args[2];
  let div = document.createElement('div');
  div.style = "position: absolute; top: 0; left: 0; right: 0; bottom: 0";
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  ReactDOM.render(
    <Mask>
      <ContentWrapper className="zoomIn animated">
        {!hideImge && <img src={img} style={imgStyle} />}
        {!hideImge && <img src={delImg} style={delStyle} onClick={() => { close() }} />}
        {title && <header style={{ fontSize: '0.48rem', color: '#ff6365' }}>{title}</header>}
        {message && <section style={{ marginTop: '0.32rem', fontSize: '0.3rem', color: '#6c7170' }}>{message}</section>}
        <Button
          style={{
            marginTop: '0.32rem',
            color: '#ffffff',
            backgroundColor: '#ff6062',
          }}
          onClick={() => {
            close();
          }}
        >我知道了</Button>
      </ContentWrapper>
    </Mask>, div,
  );

  return {
    close,
  };
}

export default showLotteryResult;
