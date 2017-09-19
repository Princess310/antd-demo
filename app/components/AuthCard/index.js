/**
*
* AuthCard
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import FlexColumn from 'components/FlexColumn';
import FlexCenter from 'components/FlexCenter';

const Wrapper = styled.div`
  padding: 0.4rem;
  height: 4.24rem;
`;

const FileItem = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0;
  font-size: 0;
`;

class AuthCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { url, backUrl, style, onChange, influence, exp, editable, msg, children } = this.props;
    const rootStyle = {
      position: 'relative',
      width: '3.18rem',
      height: '4.8rem',
      border: `0.01rem ${pallete.black} solid`,
    };

    const contentView = url === '' ? (
      <Wrapper>
        <img role="presentation" src={backUrl} style={{ width: '100%', height: '100%' }} />
      </Wrapper>
    ) : (
        <img role="presentation" src={url} style={{ width: '100%', height: '4.24rem' }} />
    )

    return (
      <FlexColumn style={Object.assign(rootStyle, style)}>
        {contentView}
        <FlexCenter style={{ height: '0.56rem', color: pallete.white, backgroundColor: (editable ? pallete.theme : '#999999'), fontSize: '0.28rem' }}>
          {editable ? `${msg}认证` : `${msg}已认证`}
        </FlexCenter>
        {editable &&
        <FileItem type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={(e) => {
          if (!url || url === '') {
            onChange(e);
          }
        }} />}
        {children}
      </FlexColumn>
    );
  }
}

AuthCard.propTypes = {
  /**
   * the image for default background img
   */
  backUrl: PropTypes.string,
  /**
   * diff with url, it means the value has setted
   */
  url: PropTypes.string,
  /**
   * style object to override
   */
  style: PropTypes.object,
  /**
   * when the card is editable, has the change func
   */
  onChange: PropTypes.func,
  /**
   * influence for auth card
   */
  influence: PropTypes.number,
  /**
   * experience for auth card
   */
  exp: PropTypes.number,
  /**
   * card is editable ?
   */
  editable: PropTypes.bool,
  /**
   * children for card to show
   */
  children: PropTypes.node,
};

export default AuthCard;
