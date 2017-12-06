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
`;

const tagStyle = {
  marginLeft: '0.12rem',
};

const otherStyle = {
  marginRight: '0.28rem',
  borderColor: pallete.theme,
  backgroundColor: pallete.theme,
  color: pallete.white,
}

class UserInfoCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const { user, tags, style } = this.props;
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
            username={user.nickname}
          />
          <div style={{ marginLeft: '0.24rem' }}>
            <FlexSB>
              <FlexRow>
                <section style={{ fontSize: '0.28rem' }}>{user.nickname}</section>
                {(user.tag_identity_name && user.tag_identity_name !== '') && <LineTag style={tagStyle}>{user.tag_identity_name}</LineTag>}
                {(user.main_service_name && user.main_service_name !== '') && <LineTag style={tagStyle}>{user.main_service_name}</LineTag>}
              </FlexRow>
            </FlexSB>
            <FlexRow>
              {user.company && <ItemWrapper>{user.company}</ItemWrapper>}
              {user.position && <ItemWrapper style={{ borderLeft: `0.01rem ${pallete.border.normal} solid`, paddingLeft: '0.12rem' }}>{user.position}</ItemWrapper>}
            </FlexRow>
            {user.is_my_friend > 0 ? (
              <a href={`tel:user.mobile`} style={{ color: pallete.theme, textDecoration: 'underline' }}>
                <FlexRow>
                  <SubItem style={{ margin: 0 }}>手机号：</SubItem>
                  <SubItem style={{ margin: 0 }}>
                    {user.mobile}
                  </SubItem>
                </FlexRow>
              </a>
            ) : (
              <FlexRow style={{ color: pallete.text.help }}>
                <SubItem>手机号：</SubItem>
                <SubItem style={{ marginLeft: '0.12rem' }}>
                  手机互换可见
                </SubItem>
              </FlexRow>
            )}
          </div>
        </FlexRow>
        {tags && (
          <div style={{ marginTop: '0.16rem' }}>
            {tags.map((tag, i) => (
                <LineTag style={otherStyle} key={i}>
                  {tag}
                </LineTag>
              ))}
          </div>
        )}
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
