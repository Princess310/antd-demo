/*
 *
 * Lottery
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Loader from 'components/Loader';
import FlexCenter from 'components/FlexCenter';
import LotteryBackground from 'hybrid/components/LotteryBackground';
import LotteryCount from 'hybrid/components/LotteryCount';
import LotteryMessage from 'hybrid/components/LotteryMessage';
import LotteryWheel from './LotteryWheel';
import LotteryGrid from './LotteryGrid';

import { linkOpenInstall } from 'utils/utils';
import request from 'utils/request';


export class Lottery extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      prizeList: [],
    };
  }

  componentWillMount() {
    const self = this;

    request.doGet('user/prize-draw-items').then((res) => {
      const { list } = res;
      self.setState({
        prizeList: list,
      });
    });
  }

  render() {
    const { prizeList } = this.state;
    let contentView = null;
    if (prizeList.length === 0) {
      contentView = (
        <div style={{ height: '4rem' }}>
          <FlexCenter>
            <Loader />
          </FlexCenter>
        </div>
      );
    } else if (prizeList.length > 0 && prizeList.length <= 6) {
      contentView = <LotteryWheel prizeList={prizeList} />;
    } else {
      contentView = <LotteryGrid prizeList={prizeList} />;
    }
    console.log('this.state', this.state);

    return (
      <LotteryBackground>
        <LotteryCount style={{ marginTop: '0.12rem' }} />
        {contentView}
        <LotteryMessage />
      </LotteryBackground>
    );
  }
}

Lottery.propTypes = {

};

export default Lottery;
