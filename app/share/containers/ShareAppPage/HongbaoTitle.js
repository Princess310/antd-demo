import React from 'react';
import FlexCenter from 'components/FlexCenter';
import img from 'assets/images/share-hongbao.png';

function HongbaoTitle(props) {
  return (
    <FlexCenter style={{ height: '1.4rem' }}>
      <img src={img} style={{ width: '0.55rem', height: '0.65rem' }} />
      <section style={{ marginLeft: '0.2rem',width: '5.15rem', fontSize: '0.3rem', fontWeight: 'bold' }}>
        {`${props.name}下载健康商信APP获得5元现金红包，邀请健康行业的朋友也来下载`}
      </section>
    </FlexCenter>
  );
}

HongbaoTitle.propTypes = {

};

export default HongbaoTitle;
