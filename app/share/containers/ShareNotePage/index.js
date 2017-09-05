/*
 *
 * ShareNotePage
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import AppContent from 'components/AppContent';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexColumnCenter from 'components/FlexColumnCenter';
import { Button } from 'antd-mobile';
import QRCode from 'qrcode.react';

import pallete from 'styles/colors';
import request from 'utils/shareRequest';
import oss from 'utils/oss';

import shareConfig from 'utils/shareConfig';

import { linkOpenInstall } from 'utils/utils';

const PicWrapper = styled.div`
  margin-bottom: 0.12rem;
  display: flex;
  flex-wrap: wrap;
`;

const QrcodeWrapper = styled.div`
  display: flex,
  justify-content: center;
  margin-top: 0.16rem;
`;

const buttonStyle = {
  position: 'fixed',
  zIndex: 99,
  right: 0,
  bottom: 0,
  left: 0,
  height: '1.1rem',
  lineHeight: '1.1rem',
  color: pallete.white,
  backgroundColor: pallete.theme,
  borderRadius: 0,
};

export class ShareNotePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      moment: null,
    };
  }

  componentWillMount() {
    const { id, uid } = this.props;

    request.doGet('moments/details', {
      moments_id: id,
      uid,
      'from_share': 1
    }).then((res) => {
      const { data } = res;
      const { share_user } = data;

      this.setState({
        moment: data,
      });

      shareConfig.share('note', data, share_user);
    });
  }

  handleView = (e, i) => {
    e.preventDefault();
    e.stopPropagation()
    const { moment: { pictures } } = this.state;

    wx.previewImage({
      current: pictures[i],
      urls: pictures,
    });
  }

  handleDownload = () => {
    // window.location.href = getDownloadUrl();
    linkOpenInstall();
  }

  render() {
    const { moment } = this.state;

    let picturesView = null;
    if (moment) {
      const { pictures } = moment;
      const picLength = pictures.length === 1 ? '7.2rem' : ((pictures.length === 4 || pictures.length === 2) ? '3.4rem' : '2.2rem')
      picturesView = pictures.map((pic, i) => (
        <div
          key={i}
          onClick={(e) => this.handleView(e, i)}
          style={{
            backgroundImage: `url(${oss.getImgSuitablePath(pic)})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            width: (pictures.length === 1 ? '100%' : picLength),
            height: picLength,
            marginTop: '0.12rem',
            marginRight: '0.12rem'
          }}
        />
      )); 
    }

    return (
      <div>
        <AppContent style={{
          top: 0,
          backgroundColor: pallete.white,
          paddingBottom: '1.32rem',
        }}>
          {moment && (
            <div>
              <FlexRowCenter style={{ height: '1.6rem', paddingLeft: '0.32rem', borderBottom: `0.04rem ${pallete.theme} solid` }}>
                <img role="presentation" src={oss.getImgSuitablePath(moment.group_notice_info.head)} style={{ width: '1.1rem', height: '1.1rem' }} />
                <div style={{ marginLeft: '0.24rem' }}>{moment.group_notice_info.name}</div>
              </FlexRowCenter>
              <div style={{ padding: '0.16rem' }}>
                <div dangerouslySetInnerHTML={{__html: moment.content}} />
                <PicWrapper>{picturesView}</PicWrapper>
              </div>
              <div
                style={{
                  height: '0.64rem',
                  lineHeight: '0.64rem',
                  paddingLeft: '0.24rem',
                  backgroundColor: '#cee2f1',
                }}
              >二维码</div>
              <FlexColumnCenter style={{ paddingTop: '0.4rem' }}>
                <div style={{ fontSize: '0.28rem' }}>群二维码</div>
                <QrcodeWrapper>
                  <div style={{ position: 'relative' }}>
                    <QRCode size={310} value={`${request.getWebRoot()}index.html#groupEdit!id=${moment.group_notice_info.id}`} />
                    <img
                      role="presentation"
                      src={moment.group_notice_info.head}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '1.2rem',
                        height: '1.2rem',
                        marginTop: '-0.6rem',
                        marginLeft: '-0.6rem',
                      }}
                    />
                  </div>
                </QrcodeWrapper>
              </FlexColumnCenter>
            </div>
          )}
        </AppContent>
        <Button style={buttonStyle} onClick={this.handleDownload}>立即加入</Button>
      </div>
    );
  }
}

ShareNotePage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareNotePage;
