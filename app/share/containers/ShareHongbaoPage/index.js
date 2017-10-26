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
    };
  }

  componentWillMount() {
    const { id, uid } = this.props;
  }

  handleDownloadInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Toast.info('请下载健康商信APP', 2);
  }

  render() {
    const { info } = this.state;

    const mochaData = {
      user: {
        avatar: "http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/avatar/26065/150674029619670__3526__.png",
        company: "阿里健",
        position: "Web前端",
        created_at: "1506740351",
        main_service_id: "7",
        main_service_name: "食品",
        mobile: "18227552785",
        nickname: "王浩",
        tag_identity_name: "生产厂家",
        uid: "26065",
        verify_status: "0",
      },
      moment: {
        "id":"548",
        "created_at":"1508400188",
        "content":"test test",
        "pictures":["http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/moments/1/150840014611810__418566__.png", "http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/chat/5959a707d0f33243340/1508223020774031__193376__.jpg", "http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/chat/5959a707d0f33243340/1508223020515491__170977__.jpg"],
        "share_count":"0",
        "like_count":"0",
        "hits":"343",
        "comment_count":"0",
        "uid":"26065",
        "avatar":"http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/avatar/26065/150674029619670__3526__.png",
        "username":"",
        "nickname":"王浩",
        "company":"阿里健",
        "position":"web",
        "tag_identity_name":"生产厂家",
        "tag_identity_id":"16",
        "mobile":"18227552785",
        "verify_status":"0",
        "status":"1",
        "share_group_id":
        "0","category":"6",
        "privilege_users":"",
        "privilege_type":"1",
        "reward_as":"1",
        "fid":"0",
        "main_service_name":"食品",
        "deleted":"0",
        "demand_counts":"2",
        "units":"",
        "trade_status":"0",
        "client_moments_id":"",
        "characteristic_service":"",
        "referral_count":"0",
        "dialogue_count":"0",
        "section":"不限",
        "source_type":2,
        "item_name":"保健品",
      },
      hongbao: {
        count: 8,
        total: 2.00,
        time: '2分钟',
        list: [
          {
            avatar: "http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/avatar/26065/150674029619670__3526__.png",
            created_at: "1506740351",
            nickname: "王浩",
            uid: "26065",
            count: 0.2,
          },
          {
            avatar: "http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/avatar/26065/150674029619670__3526__.png",
            created_at: "1506740351",
            nickname: "王浩",
            uid: "26065",
            count: 0.2,
          }
        ],
      },
    };

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
          <div style={{ position: 'relative', paddingLeft: '0.24rem', paddingRight: '0.24rem' }}>
            <UserCard
              user={{
                id: mochaData.user.uid,
                avatar: mochaData.user.avatar,
                verify_status: mochaData.user.verify_status,
                nickname: mochaData.user.nickname,
                tag_identity_name: mochaData.user.tag_identity_name,
                main_service_name: mochaData.user.main_service_name,
                company: mochaData.user.company,
                position: mochaData.user.position,
              }}
              style={{
                marginTop: '0.16rem',
                marginBottom: '0.16rem',
              }}
            />
            <Button style={buttonStyle} onClick={this.handleDownloadInfo}>对话</Button>
          </div>
          <MomentCard moment={mochaData.moment} />
          <HongbaoList hongbao={mochaData.hongbao} />
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
