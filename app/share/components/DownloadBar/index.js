/**
*
* DownloadBar
*
*/

import React, { PropTypes } from 'react';
import pallete from 'styles/colors';
import styled from 'styled-components';

import FlexSB from 'components/FlexSB';
import FlexCenter from 'components/FlexCenter';
import FlexColumnCenter from 'components/FlexColumnCenter';
import ExpProgress from 'components/ExpProgress';
import HongbaoUserInfo from 'share/components/HongbaoUserInfo';
import { Button } from 'antd-mobile';

import { linkOpenInstall, getHongbaoInfo } from 'utils/utils';

const Wrapper = styled.div`
  position: fixed;
  z-index: 99;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1.28rem;
  background-color: ${pallete.white};
  box-shadow: 0 0 10px rgba(51,51,112,.38);
`;

const btnStyle = {
  width: '5.7rem',
  color: pallete.white,
  backgroundColor: pallete.theme,
  borderRadius: 0,
};

class DownloadBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleDownload = () => {
    // window.location.href = getDownloadUrl();
    linkOpenInstall();
  }
  render() {
    const { name, buttonStyle, style } = this.props;
    const hongbaoInfo = getHongbaoInfo();
    const resultName = name ? name : (hongbaoInfo.isHongbao ? '下载登录领现金红包' : '免费下载，已有10000+人下载');
    return (
      <Wrapper style={hongbaoInfo.isHongbao ? { height: '2rem', ...style } : {...style}}>
        <FlexCenter>
          <FlexColumnCenter>
            <Button style={{...btnStyle, ...buttonStyle}} onClick={this.handleDownload}>{resultName}</Button>
            {hongbaoInfo.isHongbao ? <HongbaoUserInfo /> : null}
          </FlexColumnCenter>
        </FlexCenter>
      </Wrapper>
    );
  }
}

DownloadBar.propTypes = {
};

export default DownloadBar;
