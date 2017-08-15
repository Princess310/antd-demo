/**
*
* WeixinGuide
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Mask from 'components/Mask';
import shareImg from 'assets/images/share-exhibition-ng.png';

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
    <Mask onClick={close}>
      <div style={{
        backgroundImage: `url(${bgImg ? bgImg : shareImg})`,
        backgroundPosition: 'center center',
        backgroundSize: '100% 100%',
        width: '100%',
        height: '100%',
      }} />
    </Mask>, div,
  );

  return {
    close,
  };
}

export default showWeixinGuide;
