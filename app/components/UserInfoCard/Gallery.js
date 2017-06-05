/**
*
* UserHeaderBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import oss from 'utils/oss';

import FlexColumn from 'components/FlexColumn';
import FlexCenter from 'components/FlexCenter';
import ExpProgress from 'components/ExpProgress';
import { Icon } from 'antd-mobile';
import Swiper from 'swiper';
import swiperLeft from 'assets/images/swiper-left.png';
import swiperRight from 'assets/images/swiper-right.png';

const swiperStyle={
  height: '100%',
  top: 0,
  width: '0.88rem',
  height: '100%',
  marginTop: 0,
  backgroundSize: '100% 100%',
};
class Gallery extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const mySwiper = new Swiper('.company-pictures', {
        slidesPerView : 'auto',
        paginationClickable :true,
        keyboardControl : true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
    });
  }

  render() {
    const { title, pictures, style } = this.props;

    const rootStyle = {
      backgroundColor: pallete.white,
    };

    return (
      <div style={Object.assign(rootStyle, style)}>
        <FlexCenter style={{ fontSize: '0.28rem', padding: '0.24rem' }}>{title}</FlexCenter>
        <div className="company-pictures" style={{ position: 'relative', paddingBottom: '0.24rem' }}>
          <div className="swiper-wrapper">
            {pictures.map((p, i) => (
              <div className="swiper-slide" style={{ width: '2.4rem', height: '2.4rem' }} key={i}>
                <div className="company-photo" style={{ width: '2.4rem', height: '2.4rem' }}>
                    <img role="presentation" src={oss.getImgSuitablePath(p)} style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-button-prev" style={{...swiperStyle, backgroundImage: `url(${swiperLeft})`}}></div>
          <div className="swiper-button-next" style={{...swiperStyle, backgroundImage: `url(${swiperRight})`}}></div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  title: PropTypes.string,
  pictures: PropTypes.array,
};

export default Gallery;
