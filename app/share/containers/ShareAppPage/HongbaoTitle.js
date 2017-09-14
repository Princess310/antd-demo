import React from 'react';
import FlexCenter from 'components/FlexCenter';
import img from 'assets/images/share-hongbao.png';

function HongbaoTitle(props) {
  return (
    <FlexCenter style={{ height: '1.4rem' }}>
      <img src={img} style={{ width: '0.55rem', height: '0.65rem' }} />
      <section style={{ marginLeft: '0.2rem',width: '5.16rem', fontSize: '0.3rem', fontWeight: 'bold' }}>
        张靖豪下载健康商信APP获得5元现金 红包，邀请健康行业的朋友也来下载
      </section>
    </FlexCenter>
  );
}

HongbaoTitle.propTypes = {

};

export default HongbaoTitle;
