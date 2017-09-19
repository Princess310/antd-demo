/**
*
* DownloadQrcode
*
*/

import React, { PropTypes } from 'react';
import pallete from 'styles/colors';

import FlexColumnCenter from 'components/FlexColumnCenter';

import { linkOpenInstall, getHongbaoInfo } from 'utils/utils';

import hongbaoImg from 'assets/images/share-hongbao.png';
import qrcode from 'assets/images/share_app.jpg';

class DownloadQrcode extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const hongbaoInfo = getHongbaoInfo();
    const contentView = hongbaoInfo.isHongbao ? (
      <FlexColumnCenter style={{ height: '2.35rem', paddingTop: '0.4rem', backgroundColor: '#fff' }}>
        <img role="presetation" src={hongbaoImg} style={{ width: '0.8rem', height: '0.96rem' }} />
        <section
          style={{ marginTop: '0.24rem', color: pallete.theme, fontSize: '0.3rem' }}
          onClick={() => {
            linkOpenInstall();
          }}
        >下载登录领取现金红包</section>
      </FlexColumnCenter>
    ) : (
      <img role="presetation" src={qrcode} style={{ width: '100%', height: 'auto' }} />
    );
    return (
      <div>
        {contentView}
      </div>
    );
  }
}

DownloadQrcode.propTypes = {
};

export default DownloadQrcode;
