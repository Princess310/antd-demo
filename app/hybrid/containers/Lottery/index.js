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
import brower from 'utils/brower';
import request from 'utils/hybridRequest';


export class Lottery extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      prizeList: [],
      display_list: [],
      count: 0,
    };
  }

  componentWillMount() {
    const self = this;

    // get prize list
    request.doGet('user/prize-draw-items').then((res) => {
      const { display_list, list } = res;
      self.setState({
        prizeList: list,
        display_list,
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
    const { count, prizeList, display_list } = this.state;
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

    // check brower
    const isIos = brower.checkIfIOS();

    return (
      <LotteryBackground>
        <LotteryCount count={count} style={{ marginTop: '0.12rem' }} />
        {contentView}
        <LotteryMessage list={display_list} />
        {isIos && <section style={{ marginTop: '0.32rem', textAlign: 'center' }}>所有产品抽奖活动与苹果公司（Apple Inc）无关</section>}
      </LotteryBackground>
    );
  }
}

Lottery.propTypes = {

};

export default Lottery;
