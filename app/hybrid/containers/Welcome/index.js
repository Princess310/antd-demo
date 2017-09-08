/*
 *
 * Welcome
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import WelcomeBackground from 'hybrid/components/WelcomeBackground';
import WelcomeUser from 'hybrid/components/WelcomeUser';
import WelcomeCount from 'hybrid/components/WelcomeCount';
import WelcomeMessage from 'hybrid/components/WelcomeMessage';

import { linkOpenInstall } from 'utils/utils';


export class Welcome extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <WelcomeBackground>
        <WelcomeUser />
        <WelcomeCount style={{ marginTop: '0.4rem' }} />
        <WelcomeMessage style={{ marginTop: '0.5rem' }} />
      </WelcomeBackground>
    );
  }
}

Welcome.propTypes = {

};

export default Welcome;
