/**
*
* ActionSheet
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Mask from 'components/Mask';

const TitleWrapper = styled.div`
  box-sizing: border-box;
  padding: 0;
  text-align: center;
  font-size: 0.3rem;
  height: 0.84rem;
  line-height: 0.84rem;
  border-radius: 0.1rem;
  color: ${pallete.white};
  background-color: ${pallete.theme};
`;

const ContentWrapper = styled.div`
  position: absolute;
  padding: 0.24rem;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Button = styled.div`
  marginTop: 0.06rem;
  box-sizing: border-box;
  padding: 0;
  text-align: center;
  font-size: 0.3rem;
  height: 0.84rem;
  line-height: 0.84rem;
  border-radius: 0.1rem;
  color: #7c8399;
  background-color: ${pallete.white};

  a {
    color: #7c8399;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

function actionSheet(props, cb) {
  const { options, title } = props;
  let div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const btns = options.map((o, i) => (
    <Button key={i} onClick={(e) => {
      e.stopPropagation();
      cb && cb(i);
    }}>{o}</Button>
  ));

  ReactDOM.render(
    <Mask onClick={close}>
      <ContentWrapper className="fadeInUp animated">
        <TitleWrapper>{title}</TitleWrapper>
        {btns}
        <Button style={{ marginTop: '0.24rem' }}>取消</Button>
      </ContentWrapper>
    </Mask>, div,
  );

  return {
    close,
  };
}

export default actionSheet;
