/*
 *
 * ShareInvestmentPage
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';
import AppContent from 'components/AppContent';
import DownloadBar from 'share/components/DownloadBar';

import pallete from 'styles/colors';
import request from 'utils/shareRequest';
import shareConfig from 'utils/shareConfig';

export class ShareInvestmentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      info: null,
    };
  }

  componentWillMount() {
    const { id, uid } = this.props;

    request.doGet('moments/details', {
      moments_id: id,
      uid,
      'from_share': 1
    }).then((res) => {
      console.log('res', res);
      const { data } = res;
      
    });
  }

  render() {
    const { group } = this.state;

    return (
      <AppContent style={{
        top: 0,
        paddingBottom: '2rem',
        backgroundColor: pallete.white,
      }}>
        ShareInvestmentPage

        <DownloadBar name="立即加群交流" />
      </AppContent>
    );
  }
}

ShareInvestmentPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareInvestmentPage;
