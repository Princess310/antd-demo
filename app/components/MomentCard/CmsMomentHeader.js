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

class CmsMomentHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      trade_status,
      hits,
    } = this.props;

    return (
      <Wrapper style={style}>
        <Avatar
          size={avatarSize ? avatarSize : '0.96rem'}
          id={user.id}
          avatar={user.avatar}
          isVip={Number(user.verify_status) === 2}
          linkUser={true}
          linkParmas={{ pathname: 'service' }}
        />
        <FlexSB style={{ width: '100%', alignSelf: 'flex-start' }}>
          <FlexColumn style={{ padding: '0.04rem 0.12rem', width: '100%' }}>
            <FlexSB>
              <FlexRow>
                <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
              </FlexRow>
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
          {Number(hits) > 0 &&
            <div
              style={{
                fontSize: '0.26rem',
                color: pallete.text.help,
                width: '2rem',
                alignSelf: 'flex-end',
                textAlign: 'right',
            }}>{hits}访客</div>}
        </FlexSB>
      </Wrapper>
    );
  }
}

CmsMomentHeader.propTypes = {
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

export default CmsMomentHeader;
