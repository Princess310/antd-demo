/**
*
* ChatTool
*
* simple send message tool.
*
* onSendMessage props is required, and it should be a promised func
*/

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import pallete from 'styles/colors';
import { Button, TextareaItem } from 'antd-mobile';

const MaskWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  z-index: 102;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.24rem;
  background-color: ${pallete.white};
  z-index: 999;
`;

export default function chatTool(onSendMessage) {
  let message = '';
  let div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function sendMessage() {
    const res = onSendMessage(message);
    if (res && res.then) {
      res.then(() => {
        close();
      });
    } else {
      close();
    }
  }

  ReactDOM.render(
    <div>
      <MaskWrapper onClick={() => {
        close();
      }} />
      <Wrapper>
        <TextareaItem
          autoHeight
          labelNumber={1}
          placeholder="请输入文字"
          autoFocus={true}
          onChange={(value) => {
            message = value;
          }}
          onKeyUp={(e) => {
            if (e.which === 13) {
              sendMessage();
            }
          }}
          style={{
            width: '5.6rem',
          }}
        />
        <Button type="primary" inline size="small" onClick={() => {
          sendMessage();
        }}>发送</Button>
      </Wrapper>
    </div>, div,
  );
}
