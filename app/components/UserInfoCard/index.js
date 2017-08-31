/**
*
* UserInfoCard
*
* the card comp for user info page
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Avatar from 'components/Avatar';
import FlexColumn from 'components/FlexColumn';
import FlexRow from 'components/FlexRow';
import FlexSB from 'components/FlexSB';
import FlexCenter from 'components/FlexCenter';
import ExpProgress from 'components/ExpProgress';
import LineTag from 'components/LineTag';
import { Icon } from 'antd-mobile';
import { parseDistance } from 'utils/utils';

const ItemWrapper = styled.div`
  margin-top: 0.04rem;
  margin-right: 0.12rem;
  font-size: 0.28rem;
  color: ${pallete.text.words};
`;

const SubItem = styled.div`
  margin-top: 0.04rem;
  margin-right: 0.12rem;
  font-size: 0.24rem;
  color: ${pallete.text.help};
`;

const tagStyle = {
  marginLeft: '0.12rem',
};

class UserInfoCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const { user, style } = this.props;
    const rootStyle = {
      padding: '0.24rem',
      fontSize: '0.32rem',
      backgroundColor: pallete.white,
    };

    return (
      <div style={Object.assign(rootStyle, style)}>
        <FlexRow>
          <Avatar
            id={user.id}
            avatar={user.avatar}
          />
          <div style={{ marginLeft: '0.24rem' }}>
            <FlexSB>
              <FlexRow>
                <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
                {user.tag_identity_name !== '' && <LineTag style={tagStyle}>{user.tag_identity_name}</LineTag>}
                {(user.main_service_name && user.main_service_name !== '') && <LineTag style={tagStyle}>{user.main_service_name}</LineTag>}
              </FlexRow>
            </FlexSB>
            <FlexRow>
              {user.company && <ItemWrapper>{user.company}</ItemWrapper>}
              {user.position && <ItemWrapper style={{ borderLeft: `0.01rem ${pallete.border.normal} solid`, paddingLeft: '0.12rem' }}>{user.tag_identity_name}</ItemWrapper>}
            </FlexRow>
            <FlexRow>
                <SubItem>手机号：</SubItem>
                <SubItem style={{ marginLeft: '0.12rem' }}>
                  {user.is_my_friend > 0 ? user.mobile : '手机互换可见'}
                </SubItem>
            </FlexRow>
          </div>
        </FlexRow>
      </div>
    );
  }
}

UserInfoCard.propTypes = {
  /**
   * the user info
   */
  user: PropTypes.object,
  /**
   * override the style
   */
  style: PropTypes.object,
};

export default UserInfoCard;
