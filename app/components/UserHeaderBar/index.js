/**
*
* UserHeaderBar
*
* the common user header bar
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Avatar from 'components/Avatar';
import FlexRow from 'components/FlexRow';
import FlexSB from 'components/FlexSB';
import FlexColumn from 'components/FlexColumn';
import LineTag from 'components/LineTag';

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

const tagStyle = {
  marginLeft: '0.12rem',
};

class UserHeaderBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    linkUser: true,
    style: {},
  }

  render() {
    const { user, avatarSize, style, rightContent, linkUser, ...other } = this.props;

    return (
      <Wrapper style={style} {...other}>
        <Avatar
          size={avatarSize ? avatarSize : '0.72rem'}
          id={user.id}
          avatar={user.avatar}
          isVip={Number(user.verify_status) === 2}
          linkUser={linkUser}
        />
        <FlexSB style={{ width: '100%' }}>
          <FlexColumn style={{ padding: '0.04rem 0.24rem' }}>
            <FlexRow>
              <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
              {user.tag_identity_name !== '' && <LineTag style={{ ...tagStyle }}>{user.tag_identity_name}</LineTag>}
              {(user.main_service_name && user.main_service_name !== '') && <LineTag style={{ ...tagStyle }}>{user.main_service_name}</LineTag>}
            </FlexRow>
            <FlexRow>
              {user.company && <ItemWrapper>{user.company}</ItemWrapper>}
              {user.position && <ItemWrapper style={{ borderLeft: `1px ${pallete.border.normal} solid` }}>{user.position}</ItemWrapper>}
            </FlexRow>
          </FlexColumn>
          {rightContent && rightContent}
        </FlexSB>
      </Wrapper>
    );
  }
}

UserHeaderBar.propTypes = {
  /**
   * override the style
   */
  style: PropTypes.object,
  /**
   * the user info
   */
  user: PropTypes.object.isRequired,
  /**
   * override the avatar size
   */
  avatarSize: PropTypes.string,
  /**
   * do check if link to the user page
   */
  linkUser: PropTypes.bool,
  /**
   * right content node
   */
  rightContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default UserHeaderBar;
