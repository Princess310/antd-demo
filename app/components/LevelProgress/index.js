/**
*
* ChatLoadMore
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 2.28rem;
  height: 0.22rem;
  backgroundColor: ${pallete.white};
  borderRadius: 0.04rem;
`;

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  borderRadius: 0.04rem;
  backgroundColor: ${pallete.text.yellow};
`;

const ItemWrapper = styled.span`
  display: inline-block;
  margin-left: 0.08rem;
  color: ${pallete.white};
  font-size: 0.28rem;
`;

class LevelProgress extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { progress } = this.props;
    const width = progress * 100;

    return (
      <div>
        <Wrapper>
          <Progress style={{ width: `${width}%` }} />
        </Wrapper>
        <ItemWrapper>{`${width}%`}</ItemWrapper>
      </div>
    );
  }
}

LevelProgress.propTypes = {
  progress: PropTypes.string,
};

export default LevelProgress;
