/**
*
* WeixinGuide
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import shareImg from 'assets/images/share-exhibition-ng.png';

const ModelWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  z-index: 1000;
`;

function showWeixinGuide(...args) {
  const bgImg = args[0];
  const onClose = args[1];
  let div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    onClose && onClose();
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  ReactDOM.render(
    <ModelWrapper onClick={close}>
      <div style={{
        backgroundImage: `url(${bgImg ? bgImg : shareImg})`,
        backgroundPosition: 'center center',
        backgroundSize: '100% 100%',
        width: '100%',
        height: '100%',
      }} />
    </ModelWrapper>, div,
  );

  return {
    close,
  };
}

export default showWeixinGuide;
