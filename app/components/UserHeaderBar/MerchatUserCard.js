/**
*
* UserHeaderBar
*
* the common user header bar
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIdefault from 'photoswipe/dist/photoswipe-ui-default';

import FlexRow from 'components/FlexRow';
import FlexSB from 'components/FlexSB';
import FlexColumn from 'components/FlexColumn';

const Wrapper = styled(FlexRow)`
  display: flex;
  padding: 0.24rem;
`;

const Avatar = styled.div`
  width: 0.72rem;
  height: 0.72rem;
  line-height: 0.72rem;
  font-size: 0.28rem;
  text-align: center;
  color: ${pallete.white};
  background-color: rgb(204, 204, 204);
  border-radius: 0.08rem;
`

const ItemWrapper = styled.div`
  marginRight: 0.12rem;
  font-size: 0.24rem;
  color: ${pallete.text.words};
`;

const PicWrapper = styled.div`
  margin-bottom: 0.12rem;
  display: flex;
  flex-wrap: wrap;
`;

const linkStyle = {
  fontSize: '0.2rem',
  color: pallete.theme,
  textDecoration: 'underline',
};

const contentStyle = {
  padding: '0.28rem 1.2rem',
  fontSize: '0.28rem',
};

class MerchatUserCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    linkUser: false,
    style: {
      backgroundColor: pallete.white,
    },
  }

  handleView = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    const { user } = this.props;
    const eTarget = e.target || e.srcElement;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const length = document.body.clientWidth;

    const items = user.pictures.map((p) => ({
      src: p,
      w: length,
      h: length,
      doGetSlideDimensions: true,
    }));

    const options = {
      index: i,
      shareEl: false,
      bgOpacity: 0.5,
      // getThumbBoundsFn: () => {
      //   const thumbnail = eTarget;
      //   const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      //   const rect = thumbnail.getBoundingClientRect();

      //   return {
      //     x: rect.left,
      //     y: rect.top + pageYScroll,
      //     w: rect.width,
      //   };
      // },
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
    const { user, avatarSize, linkUser, style, ...other } = this.props;
    const { name, company, position, mobile, product, pictures } = user;

    // check pic length to show
    const picturesView = pictures ? pictures.map((pic, i) => (
      <div
        key={i}
        onClick={(e) => this.handleView(e, i)}
        style={{
          backgroundImage: `url(${pic})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundColor: '#eee',
          width: '1.56rem',
          height: '1.56rem',
          marginTop: '0.06rem',
          marginRight: '0.06rem'
        }}
      />
    )) : null;

    return (
      <div style={style} {...other}>
        <Wrapper style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
          <Avatar>{name.substr(name.length - 2, 2)}</Avatar>
          <FlexSB style={{ width: 'calc(100% - 1.2rem)' }}>
            <FlexColumn style={{ padding: '0.04rem 0.24rem' }}>
              <FlexRow>
                <section style={{ fontSize: '0.28rem' }}>{name}</section>
              </FlexRow>
              <FlexRow>
                {company && <ItemWrapper>{company}</ItemWrapper>}
                {position && <ItemWrapper style={{ borderLeft: `1px ${pallete.border.normal} solid` }}>{position}</ItemWrapper>}
              </FlexRow>
              {mobile !== '' && <a href={`tel:${mobile}`} style={linkStyle}>{mobile}</a>}
            </FlexColumn>
          </FlexSB>
        </Wrapper>
        {product && (
          <section style={contentStyle}>
            <div>{product}</div>
            <PicWrapper>{picturesView}</PicWrapper>
          </section>
        )}
      </div>
    );
  }
}

MerchatUserCard.propTypes = {
  /**
   * override the style
   */
  style: PropTypes.object,
  /**
   * the user info
   */
  user: PropTypes.object.isRequired,
  /**
   * override the avatar size
   */
  avatarSize: PropTypes.string,
  /**
   * do check if link to the user page
   */
  linkUser: PropTypes.bool,
};

export default MerchatUserCard;
