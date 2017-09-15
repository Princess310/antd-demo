/**
*
* DownloadBtn
*
*/

import React, { PropTypes } from 'react';
import pallete from 'styles/colors';
import styled from 'styled-components';

import FlexCenter from 'components/FlexCenter';
import ExpProgress from 'components/ExpProgress';
import { Button } from 'antd-mobile';

import { linkOpenInstall } from 'utils/utils';

const Wrapper = styled.div`
  margin: 0.72rem 0;
  height: 1rem;
`;

const buttonStyle = {
  width: '6.4rem',
  height: '1rem',
  lineHeight: '1rem',
  color: pallete.white,
  backgroundColor: pallete.theme,
};

class DownloadBtn extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleDownload = () => {
    // window.location.href = getDownloadUrl();
    linkOpenInstall();
  }
  render() {
    const { label } = this.props;
    const isHongbao = true;
    const name = isHongbao ? '下载登录领现金红包' : (label ? label : '点击下载');
    return (
      <Wrapper>
        <FlexCenter>
          <Button style={buttonStyle} onClick={this.handleDownload}>{name}</Button>
        </FlexCenter>
      </Wrapper>
    );
  }
}

DownloadBtn.propTypes = {
  label: PropTypes.string,
};

export default DownloadBtn;
