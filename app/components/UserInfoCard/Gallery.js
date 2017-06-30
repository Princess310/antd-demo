/**
*
* UserHeaderBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import oss from 'utils/oss';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIdefault from 'photoswipe/dist/photoswipe-ui-default';

import FlexColumn from 'components/FlexColumn';
import FlexCenter from 'components/FlexCenter';
import Swiper from 'swiper';
import swiperLeft from 'assets/images/swiper-left.png';
import swiperRight from 'assets/images/swiper-right.png';

const swiperStyle={
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

  handleView = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    const { pictures } = this.props;
    const eTarget = e.target || e.srcElement;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const length = document.body.clientWidth;

    const items = pictures.map((p) => ({
      src: p,
      w: length,
      h: length,
      doGetSlideDimensions: true,
    }));

    const options = {
      index: i,
      shareEl: false,
      bgOpacity: 0.5,
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUIdefault, items, options);

    function getSlideDimensions(slide) {

      if (!slide.doGetSlideDimensions)
          return;    // make sure we don't keep requesting the image if it doesn't exist etc.

      let img = new Image();

      img.onerror = () => {
        slide.doGetSlideDimensions = false;
      };

      img.onload = () => {
        slide.doGetSlideDimensions = false;

        slide.w = img.naturalWidth;
        slide.h = img.naturalHeight;

        gallery.invalidateCurrItems();
        gallery.updateSize(true);
      }

      img.src = slide.src;
    }

    gallery.listen("gettingData", function(index, slide){
      if (slide.doGetSlideDimensions) {
        setTimeout(
          // use setTimeout so that it runs in the event loop
          function(){ getSlideDimensions(slide); }
          ,300
        );
      }
    });

    gallery.listen("imageLoadComplete", function(index, slide){
      if (slide.doGetSlideDimensions) {
        getSlideDimensions(slide);
      }
    });

    gallery.init();
  }

  render() {
    const { title, pictures, style } = this.props;

    const rootStyle = {
      paddingBottom: '0.24rem',
      backgroundColor: pallete.white,
    };

    return (
      <div style={Object.assign(rootStyle, style)}>
        <FlexCenter style={{ fontSize: '0.28rem', padding: '0.24rem' }}>{title}</FlexCenter>
        <div className="company-pictures" style={{ position: 'relative', overflowX: 'hidden' }}>
          <div className="swiper-wrapper">
            {pictures.map((p, i) => (
              <div className="swiper-slide" style={{ paddingRight: '0.08rem', width: '2.4rem', height: '2.4rem' }} key={i}>
                <div className="company-photo" style={{ width: '2.4rem', height: '2.4rem' }}>
                  <div
                    key={i}
                    onClick={(e) => this.handleView(e, i)}
                    style={{
                      backgroundImage: `url(${oss.getImgSuitablePath(p)})`,
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
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
