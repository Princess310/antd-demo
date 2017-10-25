/*
 *
 * ShareNotePage
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import AppContent from 'components/AppContent';
import StockCard from 'components/StockCard';
import DownloadBar from 'share/components/DownloadBar';

import pallete from 'styles/colors';
import request from 'utils/shareRequest';
import oss from 'utils/oss';

import shareConfig from 'utils/shareConfig';

export class ShareStockPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      stock: null,
    };
  }

  componentWillMount() {
    const { id, uid } = this.props;
    request.doGet('goods/share-info', {
      id,
      uid,
      'from_share': 1
    }).then((res) => {
      const { data } = res;
      const { share_user } = data;

      this.setState({
        stock: data,
      });

      shareConfig.share('stock', data, share_user);
    });
  }

  render() {
    const { stock } = this.state;

    return (
      <div>
        <Helmet
          title="清库存"
          meta={[
            { name: 'description', content: '健康商信' },
            { name: 'keywords', content: '健康, 商业, 健康商信, 清库存' },
          ]}
        />
        <AppContent style={{ top: 0, paddingBottom: '2rem' }} >
          {stock && <StockCard stock={stock} />}
        </AppContent>
        <DownloadBar />
      </div>
    );
  }
}

ShareStockPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareStockPage;
