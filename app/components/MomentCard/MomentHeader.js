/**
*
* MomentHeader
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Avatar from 'components/Avatar';
import FlexRow from 'components/FlexRow';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexSB from 'components/FlexSB';
import FlexColumn from 'components/FlexColumn';
import LevelTag from 'components/LevelTag';
import LineTag from 'components/LineTag';
import DateInfo from 'components/DateInfo';

const Wrapper = styled(FlexRow)`
  position: relative;
  display: flex;
  background-color: ${pallete.white};
`;
const ItemWrapper = styled.div`
  margin-right: 0.12rem;
  font-size: 0.26rem;
  color: ${pallete.text.help};
`;

const SubInfoWrapper = styled.div`
  margin-top: 0.04rem;
  font-size: 0.24rem;
  color: ${pallete.text.words};
`;

const tagStyle = {
  marginLeft: '0.04rem',
};

class MomentHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
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
    } = this.props;

    return (
      <Wrapper style={style}>
        <Avatar
          size={avatarSize ? avatarSize : '0.96rem'}
          id={user.id}
          avatar={user.avatar}
          isVip={Number(user.verify_status) === 2}
          linkUser={true}
          linkUrl={ Number(source_type) === 1 ? {
            pathname: 'service'
          } : false }
        />
        <FlexSB style={{ width: '100%', alignSelf: 'flex-start' }}>
          {
            Number(source_type) === 1 ?
            (
              <FlexColumn style={{ padding: '0.04rem 0.12rem', width: '100%' }}>
                <FlexSB>
                  <FlexRow>
                    <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
                    {user.tag_identity_name !== '' && <LevelTag style={tagStyle}>{user.tag_identity_name}</LevelTag>}
                  </FlexRow>
                  {rightContent}
                </FlexSB>
                <FlexRow>
                  {user.main_service_name && <ItemWrapper>{user.main_service_name}</ItemWrapper>}
                </FlexRow>
                {created_at && <DateInfo
                  time={created_at}
                  style={{
                    color: pallete.text.help,
                    marginTop: '0.04rem',
                  }}
                />}
              </FlexColumn>
            ) :
            (
              <FlexColumn style={{ padding: '0.04rem 0.12rem', width: '100%' }}>
                <FlexSB>
                  <FlexRow>
                    <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
                    {user.tag_identity_name !== '' && <LineTag style={tagStyle}>{user.tag_identity_name}</LineTag>}
                    {(user.main_service_name && user.main_service_name !== '') && <LineTag style={tagStyle}>{user.main_service_name}</LineTag>}
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
            )
          }
          {(source_type_name && type === 'communication') && <LineTag style={{
            position: 'absolute',
            top: '0.96rem',
            right:'0.15rem',
          }}>{source_type_name}</LineTag>}
        </FlexSB>
      </Wrapper>
    );
  }
}

MomentHeader.propTypes = {
  style: PropTypes.object,
  user: PropTypes.object.isRequired,
  avatarSize: PropTypes.string,
  from: PropTypes.string,
  type: PropTypes.string,
  rightContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default MomentHeader;
