import React from 'react';
// import styled from 'styled-components';
import FlexRowContentCenter from 'components/FlexRowContentCenter';
import img from 'assets/images/hybrid-welcome-user.png';

function WelcomeUser() {
  return (
    <FlexRowContentCenter>
      <img src={img} role="presetation" style={{ width: '6.12rem', height: '2.23rem' }} />
    </FlexRowContentCenter>
  );
}

WelcomeUser.propTypes = {

};

export default WelcomeUser;

