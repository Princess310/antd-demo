/*
* Overwrite the component from antd Modal.operation
*
*/
/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */
import ReactDOM from 'react-dom';
import { Modal } from 'antd-mobile';

export default function a(...args) {
  const actions = args[0] || [{ text: '确定' }];
  const resProps = args[1];

  const prefixCls = 'am-modal';
  let div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const footer = actions.map((button) => {
    const orginPress = button.onPress || function() {};
    button.onPress = () => {
      const res = orginPress();
      if (res && res.then) {
        res.then(() => {
          close();
        });
      } else {
        close();
      }
    };
    return button;
  });

  ReactDOM.render(
    <Modal
      visible
      operation
      transparent
      prefixCls={prefixCls}
      transitionName="am-zoom"
      closable={false}
      maskClosable
      onClose={close}
      footer={footer}
      {...resProps}
      maskTransitionName="am-fade"
      className="am-modal-operation"
    /> , div,
  );

  return {
    close,
  };
}