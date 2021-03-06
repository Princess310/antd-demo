/**
*
* IntroduceModal
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Mask from 'components/Mask';

const ContentWrapper = styled.div`
  padding: 0.32rem 0.6rem;
`;

function introduceModal(...args) {
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
      <div style={{ backgroundColor: pallete.white, borderRadius: '0.08rem' }}>
        <ContentWrapper>
          <header style={{ fontSize: '0.3rem', textAlign: 'center' }}>转介绍</header>
          <section style={{ marginTop: '0.32rem', fontSize: '0.22rem', color: '#848b9f' }}>推荐商家给他人，也会让您认识更多生意伙伴哦~</section>
        </ContentWrapper>
      </div>
    </Mask>, div,
  );

  return {
    close,
  };
}

export default introduceModal;
