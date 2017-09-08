/*
 *
 * Lottery
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import LotteryBackground from 'hybrid/components/LotteryBackground';
import LotteryCount from 'hybrid/components/LotteryCount';
import LotteryMessage from 'hybrid/components/LotteryMessage';
import LotteryWheel from './LotteryWheel';

import { linkOpenInstall } from 'utils/utils';


export class Lottery extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <LotteryBackground>
        <LotteryCount style={{ marginTop: '0.12rem' }} />
        <LotteryWheel />
        <LotteryMessage />
      </LotteryBackground>
    );
  }
}

Lottery.propTypes = {

};

export default Lottery;
