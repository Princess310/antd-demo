/*
 *
 * PreviewPage
 *
 * path --> preview
 * 
 * this page is used to show slide things before login
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import Swiper from 'swiper';
import FlexColumn from 'components/FlexColumn';
import FlexSB from 'components/FlexSB';
import FlexCenter from 'components/FlexCenter';
import { Button } from 'antd-mobile';
import app1 from 'assets/images/app-1.png';
import app2 from 'assets/images/app-2.png';
import app3 from 'assets/images/app-3.png';
import app4 from 'assets/images/app-4.png';

const pictures = [
  app1,
  app2,
  app3,
  app4,
];
export class PreviewPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const rootStyle = {
      position: 'relative',
      height: '100%',
      overflowX: 'hidden',
      margin: '0 auto',
    };
    return (
      <div>
        <Helmet
          title="引导页"
          meta={[
            { name: 'description', content: '健康商信引导页' },
            { name: 'keywords', content: '健康,商业，健康商信，引导页' },
          ]}
        />
        <div className="company-pictures" style={rootStyle}>
          <div className="swiper-wrapper">
            {pictures.map((p, i) => (
              <div className="swiper-slide" style={{ width: '100%', height: '100%' }} key={i}>
                 <img role="presentation" src={p} style={{ width: '100%', height: '100%' }} />
              </div>
            ))}
          </div>
          <FlexColumn style={{
            position: 'absolute',
            left: '0.86rem',
            right: '0.86rem',
            bottom: 0,
            zIndex: 10,
          }}>
            <Button type="primary" style={{ fontSize: '0.34rem' }} onClick={() => {
              browserHistory.push('/loginPhone');
            }}>手机验证登录</Button>
            <FlexSB style={{ marginTop: '0.24rem', marginBottom: '0.9rem' }}>
              <Button
                type="ghost"
                style={{ width: '100%', fontSize: '0.28rem' }}
                onClick={() => {
                  browserHistory.push('/login');
                }}
              >账号密码登录</Button>
              {/* <Button type="ghost" style={{ width: '50%', fontSize: '0.28rem' }}>微信登录</Button> */}
            </FlexSB>
            <FlexCenter
              style={{ marginBottom: '0.5rem', color: pallete.theme, fontSize: '0.28rem'}}
              onClick={() => {
                browserHistory.push('/register');
              }}
            >手机免费注册</FlexCenter>
          </FlexColumn>
        </div>
      </div>
    );
  }
}

PreviewPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(PreviewPage);
