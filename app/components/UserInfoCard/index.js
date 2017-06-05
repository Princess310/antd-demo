/**
*
* UserHeaderBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import Avatar from 'components/Avatar';
import FlexColumn from 'components/FlexColumn';
import FlexRow from 'components/FlexRow';
import FlexCenter from 'components/FlexCenter';
import ExpProgress from 'components/ExpProgress';
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
            <div>{user.nickname}</div>
            <FlexRow>
              {user.company && <ItemWrapper>{user.company}</ItemWrapper>}
              {user.position && <ItemWrapper style={{ borderLeft: `0.01rem ${pallete.border.normal} solid`, paddingLeft: '0.12rem' }}>{user.position}</ItemWrapper>}
            </FlexRow>
            <FlexRow>
                <SubItem>{user.tag_identity_name}</SubItem>
                <SubItem>活跃度：<span style={{color: pallete.theme}}>{user.influence}</span></SubItem>
                <FlexRow>
                  <SubItem>诚信等级</SubItem>
                  <ExpProgress progress={user.integrity_progress} />
                  <SubItem style={{color: pallete.text.yellow, marginLeft: '0.04rem'}}>V{user.integrity_level}</SubItem>
                </FlexRow>
            </FlexRow>
          </div>
        </FlexRow>
        <FlexRow style={{ marginTop: '0.12rem' }}>
          <ItemWrapper>手机号：<span style={{ marginLeft: '0.12rem' }}>{user.mobile}</span></ItemWrapper>
        </FlexRow>
         <FlexRow>
          <ItemWrapper>地区：<span style={{ marginLeft: '0.42rem' }}>{user.address}</span></ItemWrapper>
          <ItemWrapper>
            <FlexRow>
              <Icon
                type={require('icons/ali/定位.svg')}
                size="xs"
                color={pallete.text.words}
              />
              <span>{parseDistance(user.distance, user.city_name)}</span>
            </FlexRow>
          </ItemWrapper>
        </FlexRow>
      </div>
    );
  }
}

UserInfoCard.propTypes = {
  user: PropTypes.object,
  style: PropTypes.object,
};

export default UserInfoCard;
