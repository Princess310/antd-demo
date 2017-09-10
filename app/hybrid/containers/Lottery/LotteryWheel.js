/*
 *
 * LotteryWheel
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { easeOut, easeIn } from 'utils/utils';
import ImagePreloader from 'utils/ImagePreloader';

import hongbaoImg from 'assets/images/hybrid-hongbao.png';
import countImg from 'assets/images/hybrid-count.png';
import phoneImg from 'assets/images/hybrid-phone.png';
import emojiImg from 'assets/images/hybrid-emoji.png';
import pointerImg from 'assets/images/hybrid-pointer.png';

import FlexRowContentCenter from 'components/FlexRowContentCenter';

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
  width: 1.6rem;
  height: 1.6rem;
  background-image: url(${pointerImg});
  background-size: contain;
`;

// -------------- config params --------------//
let   RADIUAS = 270,           // 转盘的半径
      OUTSIDE_RADIUAS = 240,   // 抽奖区域半径
      INSIDE_RADIUAS = 0,      // 用于非零7环绕原则的内圆半径
      TEXT_RADIUAS = 180,      // 转盘内文字的半径
      DOT_RADIUAS = 255,        // 小点半径

      awards = [               // 转盘内的奖品个数以及内容
          {
            index: 0,
            name: '一元红包',
            img: hongbaoImg,
          }, {
            index: 1,
            name: '1次好友机会',
            img: countImg,
          }, {
            index: 2,
            name: '5积分',
            img: phoneImg,
          }, {
            index: 3,
            name: '谢谢惠顾',
            img: emojiImg,
          }
      ],

      startRadian = 0,                             // 绘制奖项的起始角，改变该值实现旋转效果
      awardRadian = (Math.PI * 2) / awards.length, // 每一个奖项所占的弧度

      duration = 4000,     // 旋转事件
      velocity = 10,       // 旋转速率
      spinningTime = 0,    // 旋转当前时间
      dotCount = 18,
      dotRadian = (Math.PI * 2) / dotCount,
      color = {
        red: '#fe6869',
        lightRed: '#ff9190',
        deepRed: '#ff5c5d',
        yellow: '#fbf087',
        white: '#ffffff',
      };

  let spinTotalTime,       // 旋转时间总长
      spinningChange,      // 旋转变化值的峰值
      CENTER_X,
      CENTER_Y,
      FETCH_STATUS = 'static',
      result = {
        name: '谢谢惠顾',
        img: './images/emoji.png'
      };

  // 旋转判断辅助参数
  let lastChangeStart = 0;
  let checkFlag = false;
  let changeFetchedRadian = 0;
  let resultRadian = 0;
// -------------- /config params --------------//

export class LotteryWheel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const container = this.container;
    const canvas = this.canvas;
    this.context = canvas.getContext('2d');
    this.images = [];

    // set style for canvas
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    const radius = canvas.width / 2;

    // reset config params
    RADIUAS = radius;
    OUTSIDE_RADIUAS = radius - 30;
    TEXT_RADIUAS = radius - 90;
    DOT_RADIUAS = radius - 15;
    CENTER_X = canvas.width / 2;
    CENTER_Y = canvas.height / 2;

    // 预加载image先
    const images = [];
    for (let i = 0; i < awards.length; i ++) {
      images.push(awards[i].img);
      const img = new Image();
      img.onload = () => {
        this.images.push(img);
      }
      img.src = awards[i].img;
    }
    const ip = new ImagePreloader();
    const self = this;

    ip.queue(images);
    ip.preload().then(() => {
      self.drawRouletteWheel();
    });
  }

  drawRouletteWheel = () => {
    const canvas = this.canvas;
    const context = this.context;

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // draw the background circle first
    context.save();
    context.beginPath();
    context.fillStyle = color.deepRed;
    context.arc(canvas.width / 2, canvas.height / 2, RADIUAS, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    // draw the dot
    for (let i = 0; i < dotCount; i ++) {
      let radian = startRadian + i * dotRadian;
      context.save();
      context.translate(
          CENTER_X + Math.cos(radian + dotRadian / 2) * DOT_RADIUAS,
          CENTER_Y + Math.sin(radian + dotRadian / 2) * DOT_RADIUAS
      );

      if (i % 2 === 0) context.fillStyle = color.white;
      else             context.fillStyle = color.yellow;
      context.beginPath();
      context.arc(0, 0, 5, 0, Math.PI * 2, false);
      context.fill();
      context.restore();
    }

    for (let i = 0; i < awards.length; i ++) {
      let _startRadian = startRadian + awardRadian * i,  // 每一个奖项所占的起始弧度
          _endRadian =   _startRadian + awardRadian;     // 每一个奖项的终止弧度

      // 绘制圆盘
      context.save();
      if (i % 2 === 0) context.fillStyle = color.lightRed
      else             context.fillStyle = color.red;
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, OUTSIDE_RADIUAS, _startRadian, _endRadian, false);
      context.lineTo(canvas.width / 2, canvas.height / 2);
      //context.arc(canvas.width / 2, canvas.height / 2, INSIDE_RADIUAS, _endRadian, _startRadian, true);
      context.fill();
      context.restore();
      // -----

      // ----- ③ 绘制文字
      context.save();
      context.font = 'bold 24px Helvetica, Arial';
      context.fillStyle = '#fff';
      context.translate(
          CENTER_X + Math.cos(_startRadian + awardRadian / 2) * TEXT_RADIUAS,
          CENTER_Y + Math.sin(_startRadian + awardRadian / 2) * TEXT_RADIUAS
      );
      context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
      context.fillText(awards[i].name, -context.measureText(awards[i].name).width / 2, 0);
      context.drawImage(this.images[i], -64, 0);
      context.restore();
      // -----
    }
  }

  getValue = () => {
    let startAngle = startRadian * 180 / Math.PI,       // 弧度转换为角度
      awardAngle = awardRadian * 180 / Math.PI,

      pointerAngle = 90,                              // 指针所指向区域的度数，该值控制选取哪个角度的值
      overAngle = (startAngle + pointerAngle) % 360,  // 无论转盘旋转了多少圈，产生了多大的任意角，我们只需要求到当前位置起始角在360°范围内的角度值
      restAngle = 360 - overAngle,                    // 360°减去已旋转的角度值，就是剩下的角度值

      index = Math.floor(restAngle / awardAngle);     // 剩下的角度值 除以 每一个奖品的角度值，就能得到这是第几个奖品

    return awards[index];
  }

  rotateWheel = () => {
    spinningTime += 20;
    let _spinningChange = easeIn(spinningTime, 0, spinningChange, spinTotalTime) * (Math.PI / 180);

    if (FETCH_STATUS === 'fetching' && spinningTime >=  spinTotalTime) {
      _spinningChange = spinningChange * (Math.PI / 180);
    } else if (FETCH_STATUS === 'fetched') {
      // 当 当前时间 大于 总时间，停止旋转，并返回当前值
      if (spinningTime >= spinTotalTime) {
        console.log('value', this.getValue());
        spinningTime = 20;
        checkFlag = false;
        FETCH_STATUS = 'static';
        return;
      }

      if (!checkFlag) {
        const value = this.getValue();
        const rangeRadian = 5 * 2 * Math.PI + (value.index - result.index) * awardRadian;
        resultRadian = rangeRadian;
      }

      changeFetchedRadian = easeOut(spinningTime, 0, resultRadian, spinTotalTime);
      checkFlag = true;
    }

    if (!checkFlag) {
      startRadian += _spinningChange
      lastChangeStart = startRadian;
    } else {
      startRadian = lastChangeStart + changeFetchedRadian;
    }

    this.drawRouletteWheel();
    window.requestAnimationFrame(this.rotateWheel);
  }

  getBackendData = () => {
    FETCH_STATUS = 'fetching';
    setTimeout(() => {
      const radamIndex = parseInt(Math.random() * 10 % 4);
      result = awards[radamIndex];
      FETCH_STATUS = 'fetched';
      spinningTime = 0;
      console.log('模拟后台获取结果得:' + result.name);
    }, 1000);
  }

  handleAction = () => {
    spinningTime = 0;                                // 初始化当前时间
    spinTotalTime = Math.random() * 3 + duration;    // 随机定义一个时间总量
    spinningChange = velocity;  // 随机顶一个旋转速率
    this.rotateWheel();
    // 模拟后台获取数据
    this.getBackendData();
  }

  render() {
    return (
      <FlexRowContentCenter style={{ position: 'relative', top: '-0.9rem' }}>
        <div ref={r => this.container = r} style={{ width: '5.6rem', height: '5.6rem' }}>
          <canvas ref={r => this.canvas = r}></canvas>
        </div>
        <BtnWrapper>
          <Button onClick={this.handleAction}></Button>
        </BtnWrapper>
      </FlexRowContentCenter>
    );
  }
}

LotteryWheel.propTypes = {

};

export default LotteryWheel;