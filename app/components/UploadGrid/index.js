/**
*
* ChatLoadMore
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import FlexCenter from 'components/FlexCenter';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.2rem;
  height: 2.4rem;
  border: 1px dashed #abacad;

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 1.653333rem;
    content: ' ';
    border-left: 1px #abacad dashed;
    transform: translate(-50%,-50%)
  }

  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.653333rem;
    height: 1px;
    content: ' ';
    border-top: 1px #abacad dashed;
    transform: translate(-50%,-50%);
  }
`;

class UploadGrid extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { url, style, onClick, children } = this.props;
    const rootStyle = {
      height: 'auto',
      backgroundColor: pallete.white,
      paddingBottom: '0.24rem'
    };

    return (
      <FlexCenter style={Object.assign(rootStyle, style)} onClick={onClick}>
        <Wrapper>
          {url !== '' && <img role="presentation" src={url} style={{ width: '100%', height: '100%' }} />}
          {React.Children.toArray(children)}
        </Wrapper>
      </FlexCenter>
    );
  }
}

UploadGrid.propTypes = {
  url: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default UploadGrid;
