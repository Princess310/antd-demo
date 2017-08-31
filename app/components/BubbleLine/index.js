/**
*
* BubbleLine
*
* small bubble in one line to show
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import FlexCenter from 'components/FlexCenter';
import pallete from 'styles/colors';

const BubbleLineWrapper = styled.div`
  padding: 0.04rem 0.15rem;
  color: ${pallete.white};
  font-size: 0.24rem;
  background-color: ${pallete.button.grey.background};
  border-radius: 0.04rem;
`;

function BubbleLine(props) {
  return (
    <div style={props.style}>
      <FlexCenter>
        <BubbleLineWrapper>{props.name}</BubbleLineWrapper>
      </FlexCenter>
    </div>
  );
}

BubbleLine.propTypes = {
  /**
   * override the style
   */
  style: PropTypes.object,
  /**
   * the name to show in the bubble line
   */
  name: PropTypes.string,
};

export default BubbleLine;
