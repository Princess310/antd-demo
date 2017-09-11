/*
 *
 * LotteryGrid
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import ImagePreloader from 'utils/ImagePreloader';

import hongbaoImg from 'assets/images/hybrid-grid-1.png';
import scoreImg from 'assets/images/hybrid-grid-2.png';
import countImg from 'assets/images/hybrid-grid-3.png';
import thanksImg from 'assets/images/hybrid-grid-4.png';
import borderImg from 'assets/images/hybrid-border.png';

import FlexRowContentCenter from 'components/FlexRowContentCenter';
import styles from './styles.scss';

const Contaienr = styled.div`
  width: 6.94rem;
  height: 5.18rem;
  border-radius: 0.2rem;
  background-color: #ff5c5d;
  border: 0.2rem solid #ff5c5d;
  border-image: url(${borderImg}) 20 20 round;
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  box-sizing: border-box;
  width: 50%;
  height: 33.33%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fe6869;
  font-size: 0.48rem;
  border: 0.16rem #fcef86 solid;
  background-color: #ffdc44;
`;

const ImgWraper = styled.img`
  margin-top: 0.1rem;
  height: 0.3rem;
  width: auto;
`;

// -------------- config params --------------//
let  lottery = {
        index: -1,            //当前转动到哪个位置，起点位置
        count: 0,             //总共有多少个位置
        timer: 0,             //setTimeout的ID，用clearTimeout清除
        speed: 20,            //初始转动速度
        times: 0,             //转动次数
        cycle: 50,            //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1,            //中奖位置
        isRunning: false,
    };

let   awards = [];            // 抽奖奖项
const appendPrize = {
    id: -1,
    name: '谢谢参与',
    type: '4',
};

const indexMap10 = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 9,
  5: -1,
  6: -1,
  7: 4,
  8: 8,
  9: 7,
  10: 6,
  11: 5,
};

const indexMap12 = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 11,
  5: -1,
  6: -1,
  7: 4,
  8: 10,
  9: -1,
  10: -1,
  11: 5,
  12: 9,
  13: 8,
  14: 7,
  15: 6,
};
// -------------- /config params --------------//

export class LotteryGrid extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { prizeList } = this.props;
    // reset awards config
    awards = [];
    // the grid count maybe 10 or 12, the count is stable
    this.maxPrizeCount = (prizeList.length > 6 && prizeList.length < 10) ? 10 : 12;
    this.indexMap = this.maxPrizeCount === 10 ? indexMap10 : indexMap12;
    let needAddCount = this.maxPrizeCount - prizeList.length;

    const checkEmptyParam = () => {
      const checkNeddAddEmpty = (this.maxPrizeCount === 10 && awards.length === 5) ||
                        (this.maxPrizeCount === 12 && awards.length === 5) ||
                        (this.maxPrizeCount === 12 && awards.length === 9);
      if (checkNeddAddEmpty) {
        [{
          type: 'empty',
        }, {
          type: 'empty',
        }].forEach((item) => {
          awards.push(item);
        });
      }
    }

    for (let i = 0; i < prizeList.length; i += 1) {
      awards.push(prizeList[i]);
      checkEmptyParam();

      if (needAddCount > 0) {
        awards.push(appendPrize);
        checkEmptyParam();

        needAddCount -= 1;
      }

      // add empty param
      if (this.maxPrizeCount === 10 && awards.length === 5) {
        awards.push({
          type: 'empty',
        });
      }
    }

    console.log('awards', awards);
  }

  componentDidMount() {
    lottery.count = 10;

    this.selectPrize();
  }

  removePrize = () => {
    const dom = this.container.querySelector(`.lottery-unit-${lottery.index}`);
    dom && dom.classList.remove('active');
  }

  selectPrize = () => {
    const dom = this.container.querySelector(`.lottery-unit-${lottery.index}`);
    dom && dom.classList.add('active');
  }

  rollLottery = () => {
    let { count } = lottery;
    this.removePrize();
    lottery.index += 1;
    if (lottery.index > count - 1) {
      lottery.index = 0;
    }

    this.selectPrize();
  }

  roll = () => {
    lottery.times += 1;
    this.rollLottery();

    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
      clearTimeout(lottery.timer);
      lottery.times = 0;
      lottery.isRunning = false;
    } else {
      if (lottery.times < lottery.cycle) {
        lottery.speed -= 10;
      } else if (lottery.times === lottery.cycle) {
        let index = Math.random() * (lottery.count) | 0; //静态演示，随机产生一个奖品序号，实际需请求接口产生
        lottery.prize = index;
      } else {
        if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
          lottery.speed += 110;
        } else {
          lottery.speed += 20;
        }
      }

      if (lottery.speed < 40) {
        lottery.speed = 40;
      }

      lottery.timer = setTimeout(this.roll, lottery.speed);
    }
  }

  handleAction = () => {
    if (lottery.isRunning) {
      return false;
    }
    
    lottery.isRunning = true;
    lottery.speed = 100;
    this.roll();
  }

  render() {
    const indexMap = this.maxPrizeCount === 10 ? indexMap10 : indexMap12;
    const renderArr = [];
    for (let i = 0; i < awards.length; i += 4) {
      renderArr.push(awards.slice(i, i + 4));
    }

    const contentView = renderArr.map((arr, i) => (
      <tr key={i}>
        {arr.map((award, j) => {
          const type = award.type;
          let img = thanksImg;
          if (type === '1') {
            img = scoreImg;
          } else if (type === '2') {
            img = hongbaoImg;
          } else if (type === '3') {
            img = countImg;
          }
          return type === 'empty' ? (
            <td key={j}></td>
          ) :
          (
            <td className={`lottery-unit lottery-unit-${indexMap[i * 4 + j]}`} key={j}>
            <section>{award.name}</section>
            <ImgWraper src={img} />
          </td>
          )
        })}
      </tr>
    ));

    return (
      <FlexRowContentCenter style={{ position: 'relative', top: '-0.9rem' }}>
        <Contaienr id="lottery" className="lottery-grid">
          <table ref={r => this.container = r} >
            <tbody>
              {contentView}
            </tbody>
          </table>
          <BtnWrapper>
            <Button onClick={this.handleAction}>
              <span>点击抽奖</span>
            </Button>
          </BtnWrapper>
        </Contaienr>
      </FlexRowContentCenter>
    );
  }
}

LotteryGrid.propTypes = {

};

export default LotteryGrid;
