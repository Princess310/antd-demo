/*
 *
 * ShareHongbaoPage
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import Helmet from 'react-helmet';
import request from 'utils/shareRequest';
import shareConfig from 'utils/shareConfig';

import { Button, Toast } from 'antd-mobile';

import AppContent from 'components/AppContent';
import DownloadBar from 'share/components/DownloadBar';

import Title from './Title';
import UserCard from './UserCard';
import MomentCard from './MomentCard';
import HongbaoList from './HongbaoList';

const buttonStyle = {
  position: 'absolute',
  top: '0.32rem',
  right: '0.24rem',
  height: '0.4rem',
  padding: '0 0.24rem',
  lineHeight: '0.4rem',
  fontSize: '0.24rem',
  color: '#f1ad92',
  border: '1px solid #ddd',
  borderRadius: '0.1rem',
  backgroundColor: '#d5392a',
}

export class ShareHongbaoPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      info: null,
      moment: null,
      list: [],
    };
  }

  componentWillMount() {
    const { id, uid } = this.props;

    request.doGet('web-packet/get-history', {
      red_packet_id: id,
      uid,
      'from_share': 1
    }).then((res) => {
      const { data, list, share_user, moments_newest } = res;

      this.setState({
        info: data,
        list,
        moment: moments_newest,
      });

      shareConfig.share('packet', { ...data, pictures: moments_newest.pictures }, share_user);
    });
  }

  handleDownloadInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Toast.info('请下载健康商信APP', 2);
  }

  handLink = () => {
    const { moment: { id } } = this.state;
    const { uid } = this.props;

    if (id) {
      window.location.href = `public_share.html?type=momment&id=${id}&uid=${uid}`;
    }
  }

  render() {
    const { info, list, moment } = this.state;

    return (
      <div>
        <Helmet
          title="看生意动态 领现金红包"
          meta={[
            { name: 'description', content: '健康商信' },
            { name: 'keywords', content: '健康, 商业, 健康商信, 现金红包' },
          ]}
        />
        <AppContent style={{ top: 0, paddingBottom: '2rem', backgroundColor: pallete.white }} >
          <Title />
          {info && (
            <div>
              <div onClick={this.handLink}>
                <div style={{ position: 'relative', paddingLeft: '0.24rem', paddingRight: '0.24rem' }}>
                  <UserCard
                    user={{
                      id: info.uid,
                      avatar: info.avatar,
                      verify_status: info.verify_status,
                      nickname: info.nickname,
                      tag_identity_name: info.tag_identity_name,
                      main_service_name: info.main_service_name,
                      company: info.company,
                      position: info.position,
                    }}
                    style={{
                      marginTop: '0.16rem',
                      marginBottom: '0.16rem',
                    }}
                  />
                  <Button style={buttonStyle} onClick={this.handleDownloadInfo}>对话</Button>
                </div>
                {(moment && moment.id) && <MomentCard moment={moment} />}
              </div>
              <HongbaoList hongbao={info} list={list} />
            </div>
          )}
        </AppContent>
        <DownloadBar name="我也试试" buttonStyle={{ backgroundColor: '#d5392a', color: '#f1ad92' }} />
      </div>
    );
  }
}

ShareHongbaoPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareHongbaoPage;
