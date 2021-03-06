/**
*
* UserMomentHeader
*
* For the special user header bar style for moment page
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Avatar from 'components/Avatar';
import FlexRow from 'components/FlexRow';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexSB from 'components/FlexSB';
import FlexColumn from 'components/FlexColumn';
import ExpTag from 'components/ExpTag';
import LineTag from 'components/LineTag';

const Wrapper = styled(FlexRow)`
  display: flex;
  padding: 0.24rem;
  background-color: ${pallete.white};
`;
const ItemWrapper = styled.div`
  margin-Left: 0.12rem;
  font-size: 0.24rem;
  color: ${pallete.text.words};
`;

const SubInfoWrapper = styled.div`
  margin-top: 0.04rem;
  font-size: 0.24rem;
  color: ${pallete.text.words};
`;

class UserMomentHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
    type: 1,
    linkUser: true,
  }

  render() {
    const { user, avatarSize, style, rightContent, linkUser } = this.props;

    return (
      <Wrapper style={style}>
        <Avatar
          size={avatarSize ? avatarSize : '0.72rem'}
          id={user.id}
          avatar={user.avatar}
          isVip={Number(user.verify_status) === 2}
          linkUser={linkUser}
        />
        <FlexSB style={{ width: '100%' }}>
          {
            String(user.source_type) === '1' ?
            (
              <FlexColumn style={{ padding: '0.04rem 0.24rem' }}>
                <FlexRowCenter>
                  <section style={{ fontSize: '0.28rem', marginRight: '0.16rem' }}>{user.nickname}</section>
                  <LineTag>{user.tag_identity_name}</LineTag>
                </FlexRowCenter>
                <SubInfoWrapper>{user.position}</SubInfoWrapper>
              </FlexColumn>
            ) :
            (
              <FlexColumn style={{ padding: '0.04rem 0.24rem' }}>
                <FlexRowCenter>
                  <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
                  {user.company && <ItemWrapper>{user.company}</ItemWrapper>}
                </FlexRowCenter>
                <SubInfoWrapper>{user.tag_identity_name}</SubInfoWrapper>
              </FlexColumn>
            )
          }
          {rightContent && rightContent}
        </FlexSB>
      </Wrapper>
    );
  }
}

UserMomentHeader.propTypes = {
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
   * check if do link for the user
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

export default UserMomentHeader;
