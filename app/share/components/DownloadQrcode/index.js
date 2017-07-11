/**
*
* UserHeaderBar
*
*/

import React, { PropTypes } from 'react';

import qrcode from 'assets/images/share_app.jpg';

class DownloadQrcode extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <img role="presetation" src={qrcode} style={{ width: '100%', height: 'auto' }} />
      </div>
    );
  }
}

DownloadQrcode.propTypes = {
};

export default DownloadQrcode;
