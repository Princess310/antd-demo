/**
*
* TypeHeader
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import FlexRow from 'components/FlexRow';
import pallete from 'styles/colors';

import { Icon } from 'antd-mobile';
import momentSuccess from 'assets/images/trade-status.png';

const Wrapper = styled.div`
  position: relative;
  padding: 0.15rem;
  height: 0.75rem;
  font-size: 0.24rem;
  border-bottom: 0.01rem ${pallete.border.normal} solid;
`;

const StatusItem = styled.img`
  position: absolute;
  top: 0.15rem;
  right: 0;
  padding-left: 0.3rem;
  height: 0.45rem;
  width: auto;
  line-height: 0.45rem;
  text-align: center;
  color: ${pallete.white};
`;

const itemStyle = {
  marginLeft: '0.15rem',
};

function TypeHeader(props) {
  return (
    <Wrapper>
      <FlexRow>
        {props.type === 'demand' ?
          <Icon type={require('icons/ali/需求-header.svg')} color="#fe6270" /> :
          <Icon type={require('icons/ali/供应-header.svg')} color="#ff8d36" />
        }
        <div style={itemStyle}>{props.type === 'demand' ? '需求内容' : '供应内容'}</div>
        {Number(props.trade_status) > 0 &&
        <StatusItem src={momentSuccess} />}
      </FlexRow>
    </Wrapper>
  );
}

TypeHeader.propTypes = {
  type: PropTypes.string,
  trade_status: PropTypes.string,
};

export default TypeHeader;
