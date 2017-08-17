/**
*
* UpdateMessage
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

const Wrapper = styled.div`
  height: 0.68rem;
  width: 100%;
  line-height: 0.68rem;
  text-align: center;
  color: ${pallete.white};
  font-size: 0.26rem;
  background-color: ${pallete.theme};
  opacity: 0.9;
`;

function UpdateMessage(props) {
  const prefix = [
    'onAnimationEnd',
    'onWebKitAnimationEnd',
    'onMozAnimationEnd',
    'onMsAnimationEnd',
  ];
  const animProps = {};

  prefix.forEach((p) => {
    animProps[p] = () => {
      props.callback && props.callback();
    };
  });

  return (
    <Wrapper className="animated fadeInDown" style={props.style} {...animProps}>
      {props.message}
    </Wrapper>
  );
}

UpdateMessage.propTypes = {
  message: PropTypes.string,
  onShowEnd: PropTypes.func,
};

export default UpdateMessage;
