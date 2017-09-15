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
import ExpProgress from 'components/ExpProgress';
import { Button } from 'antd-mobile';

import { linkOpenInstall } from 'utils/utils';

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

const buttonStyle = {
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
    const isHongbao = true;
    const name = isHongbao ? '下载登录领现金红包' : '免费下载，已有10000+人下载';
    return (
      <Wrapper>
        <FlexCenter>
          <Button style={buttonStyle} onClick={this.handleDownload}>{name}</Button>
        </FlexCenter>
      </Wrapper>
    );
  }
}

DownloadBar.propTypes = {
};

export default DownloadBar;
