/**
*
* MomentHeader
*
* Moment card header, which is spit to code easily
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Avatar from 'components/Avatar';
import FlexRow from 'components/FlexRow';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexSB from 'components/FlexSB';
import FlexColumn from 'components/FlexColumn';
import LineTagBar from 'components/LineTagBar';
import DateInfo from 'components/DateInfo';


const Wrapper = styled(FlexRow)`
  position: relative;
  display: flex;
  background-color: ${pallete.white};
`;
const ItemWrapper = styled.div`
  margin-right: 0.24rem;
  font-size: 0.26rem;
  color: ${pallete.text.help};
`;

const SubInfoWrapper = styled.div`
  margin-top: 0.04rem;
  font-size: 0.24rem;
  color: ${pallete.text.words};
`;

const tagStyle = {
  marginLeft: '0.3rem',
};

class UserCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    linkUser: true,
    style: {},
  }

  render() {
    const {
      user,
      linkUrl,
      source_type,
      source_type_name,
      created_at,
      avatarSize,
      type,
      style,
      rightContent,
      trade_status,
      businessType,
    } = this.props;


    return (
      <Wrapper style={style}>
        <Avatar
          size={avatarSize ? avatarSize : '0.96rem'}
          id={user.id}
          avatar={user.avatar}
          isVip={Number(user.verify_status) === 2}
          style={{ border: '0.02rem #f1ad92 solid' }}
        />
        <FlexSB style={{ width: '100%', alignSelf: 'flex-start' }}>
          <FlexColumn style={{ padding: '0.04rem 0.12rem', width: '100%' }}>
            <FlexSB>
              <FlexRow>
                <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
                {user.tag_identity_name !== '' && <LineTagBar style={tagStyle}>{user.tag_identity_name}</LineTagBar>}
                {(user.main_service_name && user.main_service_name !== '') && <LineTagBar style={tagStyle}>{user.main_service_name}</LineTagBar>}
              </FlexRow>
              {rightContent}
            </FlexSB>
            <FlexRow>
              {user.company && <ItemWrapper>{user.company}</ItemWrapper>}
              {user.position && <ItemWrapper>{user.position}</ItemWrapper>}
            </FlexRow>
            {created_at && <DateInfo
              time={created_at}
              style={{
                color: pallete.text.help,
                marginTop: '0.04rem',
              }}
            />}
          </FlexColumn>
        </FlexSB>
      </Wrapper>
    );
  }
}

UserCard.propTypes = {
  /**
   * override the style
   */
  style: PropTypes.object,
  /**
   * the user info from card
   */
  user: PropTypes.object.isRequired,
  /**
   * override the avatar size
   */
  avatarSize: PropTypes.string,
  /**
   * where to call the comp && control the view to show
   */
  from: PropTypes.string,
  /**
   * type to control view: business or communication
   */
  type: PropTypes.string,
  /**
   * business type of card: status, demand or supplier
   */
  businessType: PropTypes.string,
  /**
   * boolean: means to weather link avatar to user info page
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

export default UserCard;
