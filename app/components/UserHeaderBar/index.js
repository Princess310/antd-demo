/**
*
* UserHeaderBar
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
`
const ItemWrapper = styled.div`
  marginLeft: 0.12rem;
  paddingLeft: 0.12rem;
  font-size: 0.24rem;
  color: ${pallete.text.words};
  borderLeft: 1px ${pallete.border.normal} solid;
`

class UserHeaderBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const { user, avatarSize, style, rightContent } = this.props;

    return (
      <Wrapper style={style}>
        <Avatar
          size={avatarSize ? avatarSize : '0.72rem'}
          id={user.id}
          avatar={user.avatar}
          isVip={user.verify_status == 2}
          linkUser={true}
        />
        <FlexSB style={{ width: '100%' }}>
          <FlexColumn style={{ padding: '0.04rem 0.24rem' }}>
            <FlexRow>
              <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
              {user.company && <ItemWrapper>{user.company}</ItemWrapper>}
              {user.position && <ItemWrapper>{user.position}</ItemWrapper>}
            </FlexRow>
            <section style={{
              marginTop: '0.04rem',
              color: pallete.text.words,
              fontSize: '0.24rem',
            }}>{user.tag_identity_name}</section>
          </FlexColumn>
          {rightContent && rightContent}
        </FlexSB>
      </Wrapper>
    );
  }
}

UserHeaderBar.propTypes = {
  style: PropTypes.object,
  user: PropTypes.object.isRequired,
  avatarSize: PropTypes.string,
  rightContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default UserHeaderBar;
