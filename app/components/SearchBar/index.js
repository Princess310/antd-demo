/**
*
* SearchBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import { Icon } from 'antd-mobile';

const Wrapper = styled.div`
  position: relative;
  font-size: 0.28rem;
  color: ${pallete.text.help};
  padding: 0.2rem 0.24rem;
  height: 0.96rem;
  background-color: ${pallete.white};
  border-bottom: 0.01rem ${pallete.border.normal} solid;
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.04rem 0.12rem;
  border: 0.01rem ${pallete.border.normal} solid;
  border-radius: 0.04rem;
`;

function SearchBar(props) {
  const { title, ...other } = props;
  return (
    <Wrapper {...other}>
      <Container>
        <Icon type={require('icons/ali/搜索.svg')} color={pallete.text.help} />
        <div style={{ marginLeft: '0.08rem' }}>{props.title}</div>
      </Container>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  /**
   * The title to show in the seach bar center
   */
  title: PropTypes.string,
};

export default SearchBar;
