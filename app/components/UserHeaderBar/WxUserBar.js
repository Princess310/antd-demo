/**
*
* WxUserBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Avatar from 'components/Avatar';
import FlexRow from 'components/FlexRow';
import FlexSB from 'components/FlexSB';
import FlexColumn from 'components/FlexColumn';

const Wrapper = styled(FlexRow)`
  display: flex;
  padding: 0.24rem;
  background-color: ${pallete.white};
`;

const ItemWrapper = styled.div`
  marginRight: 0.12rem;
  font-size: 0.24rem;
  color: ${pallete.text.words};
`;

class WxUserBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const { username, avatarSize, style, rightContent, ...other } = this.props;

    return (
      <Wrapper style={style} {...other}>
        <Avatar
          size={avatarSize ? avatarSize : '0.72rem'}
          username={username}
        />
        <FlexSB style={{ width: '100%' }}>
          <FlexColumn style={{ padding: '0.04rem 0.24rem' }}>
            <FlexRow>
              <section style={{ fontSize: '0.28rem' }}>{username}</section>
            </FlexRow>
            <FlexRow>
              <ItemWrapper>微信报名</ItemWrapper>
            </FlexRow>
          </FlexColumn>
          {rightContent && rightContent}
        </FlexSB>
      </Wrapper>
    );
  }
}

WxUserBar.propTypes = {
  /**
   * override the style
   */
  style: PropTypes.object,
  /**
   * the user info
   */
  username: PropTypes.string,
  rightContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default WxUserBar;
