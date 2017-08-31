/**
*
* ExpProgress
*
* the exp progress to show
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

const Wrapper = styled.div`
  position: relative;
  width: 0.8rem;
  height: 0.24rem;
  marginLeft: 0.04rem;
  backgroundColor: ${pallete.background.progress};
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

class ExpProgress extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { progress } = this.props;
    const width = progress * 100;

    return (
      <Wrapper>
        <Progress style={{ width: `${width}%` }} />
      </Wrapper>
    );
  }
}

ExpProgress.propTypes = {
  /**
   * number: progess from backend
   */
  progress: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

export default ExpProgress;
