/**
*
* Avatar
*
* the avatar for user to show
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';
import oss from 'utils/oss';
import defaultAvatar from 'assets/images/default-logo.png';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Vip = styled.div`
  position: absolute;
  right: -0.04rem;
  bottom: -0.04rem;
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.32rem;
  color: ${pallete.white};
  background-color: ${pallete.text.yellow};
  border: 0.02rem ${pallete.white} solid;
`;

class Avatar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    id: '',
    avatar: defaultAvatar,
    isVip: false,
    size: '1.04rem',
    linkUser: false,
    style: {},
  }

  render() {
    const { id, avatar, isVip, size, linkUser, linkParmas, style } = this.props;

    return (
      <Wrapper>
        <img
          role="presentation"
          style={{
            width: size,
            height: size,
            borderRadius: '0.08rem',
            ...style,
          }}
          src={oss.getImgSuitablePath(avatar)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (linkParmas) {
              browserHistory.push(linkParmas);
            } else {
              linkUser && browserHistory.push({
                pathname: 'userInfo',
                query: { id },
              });
            }
          }}
        />
        {isVip && <Vip>V</Vip>}
      </Wrapper>
    );
  }
}

Avatar.propTypes = {
  /**
   * the id of user, to link to user info page
   */
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  /**
   * the link url for avatar to show
   */
  avatar: PropTypes.string,
  /**
   * if the user is vip, show the vip tag
   */
  isVip: PropTypes.bool,
  /**
   * override the avatar size to show
   */
  size: PropTypes.string,
  /**
   * if set true, click to link to user info page
   */
  linkUser: PropTypes.bool,
  /**
   * sometimes, should link it to another page
   */
  linkParmas: PropTypes.oneOfType(
    PropTypes.object,
    PropTypes.bool,
  ),
};

export default Avatar;
