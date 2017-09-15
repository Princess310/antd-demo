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
import request from 'utils/hybridRequest';


export class Lottery extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      prizeList: [],
      count: 0,
    };
  }

  componentWillMount() {
    const self = this;

    // get prize list
    request.doGet('user/prize-draw-items').then((res) => {
      const { list } = res;
      self.setState({
        prizeList: list,
      });
    });

    this.handleCount();
  }

  handleCount = () => {
    const self = this;
    // get lottery count
    request.doGet('user/prize-draw-number').then((res) => {
      const { data } = res;
      self.setState({
        count: data.number,
      });
    });
  }

  render() {
    const { count, prizeList } = this.state;
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
      contentView = <LotteryWheel onStartLottery={this.handleCount} prizeList={prizeList} count={count} />;
    } else {
      contentView = <LotteryGrid onStartLottery={this.handleCount} prizeList={prizeList} count={count} />;
    }

    return (
      <LotteryBackground>
        <LotteryCount count={count} style={{ marginTop: '0.12rem' }} />
        {contentView}
        <LotteryMessage />
      </LotteryBackground>
    );
  }
}

Lottery.propTypes = {

};

export default Lottery;
