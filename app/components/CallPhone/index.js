/**
*
* CallPhone
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd-mobile';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.54rem;
  font-size: 0.22rem;
  color: #BCBCBC;
  text-align: center;
`;

function CallPhone(props) {
  return (
    <Wrapper>
      <a href={`tel:${props.phone}`} style={{ color: '#BCBCBC' }}>
        <Icon type={require('icons/ali/打电话.svg')} size="xs" color="#BCBCBC" />
        <span style={{ marginLeft: '0.08rem' }}>联系客服</span>
      </a>
    </Wrapper>
  );
}

CallPhone.propTypes = {
  phone: PropTypes.string.isRequired,
};

export default CallPhone;
