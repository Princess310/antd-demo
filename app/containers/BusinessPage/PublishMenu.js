/**
*
* UserHeaderBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import FlexColumn from 'components/FlexColumn';
import FlexCenter from 'components/FlexCenter';
import { Icon, Button } from 'antd-mobile';

const MaskWrapper = styled(FlexCenter)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 102;
  background-color: rgba(0, 0, 0, 0.4);
`;

class PublishMenu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    onClose: () => {},
  }

  render() {
    return (
      <MaskWrapper>
        <FlexColumn>
          <div style={{ width: '4.4rem', textAlign: 'left' }}>
            <div onClick={() => this.props.onClose()}>
              <Icon
                type={require('icons/ali/关闭.svg')}
                size="lg"
                color={pallete.white}
              />
            </div>
          </div>
          <Button
            className="btn"
            style={{ marginTop: '0.44rem', fontSize: '0.26rem' }}
            onClick={() => {
              browserHistory.push('businessPublish');
            }}
          >发布采购需求</Button>
          <Button
            className="btn"
            style={{ marginTop: '0.52rem', fontSize: '0.26rem', color: '#A0A5B5' }}
            onClick={() => {
              browserHistory.push('/businessPublishSupplier');
            }}
          >发布供应信息</Button>
        </FlexColumn>
      </MaskWrapper>
    );
  }
}

PublishMenu.propTypes = {
  onClose: PropTypes.func,
};

export default PublishMenu;
