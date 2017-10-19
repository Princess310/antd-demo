/**
*
* Gallery
*
* the gallery comp for stock
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Swiper from 'swiper';

const rootStyle = {
  position: 'relative',
  height: '6rem',
  overflowX: 'hidden',
  margin: '0 auto',
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center center',
};

const CountItem = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1rem;
  height: 0.34rem;
  padding-left: 0.24rem;
  color: ${pallete.white};
  font-size: 0.22rem;
  letter-spacing: 0.06rem;
  border-top-left-radius: 0.17rem;
  border-bottom-left-radius: 0.17rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

class Gallery extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    const self = this;

    const mySwiper = new Swiper('.stock-pictures', {
        slidesPerView : 'auto',
        paginationClickable :true,
        keyboardControl : true,
        lazyLoading : true,
        onSlideChangeEnd: (swiper) => {
          self.setState({
            activeIndex: swiper.activeIndex,
          });
        },
    });
  }

  render() {
    const { pictures } = this.props;
    const { activeIndex } = this.state;

    return (
      <div>
        <div className="stock-pictures" style={rootStyle}>
          <div className="swiper-wrapper">
            {pictures.map((p, i) => (
              <div className="swiper-slide" style={{ width: '100%', height: '100%' }} key={i}>
                 <img role="presentation" src={p} style={imgStyle} />
              </div>
            ))}
          </div>

          <CountItem>
            {`${activeIndex + 1}/${pictures.length}`}
          </CountItem>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
};

export default Gallery;
