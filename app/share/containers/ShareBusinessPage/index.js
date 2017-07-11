/*
 *
 * ShareBusinessPage
 *
 */

import React, { PropTypes } from 'react';
import { NavBar, Tabs, WhiteSpace, Icon, Toast } from 'antd-mobile';
import styled from 'styled-components';
import pallete from 'styles/colors';

import AppContent from 'components/AppContent';
import MomentCard from 'components/MomentCard';
import UserHeaderBar from 'components/UserHeaderBar';
import FlexSB from 'components/FlexSB';
import FlexCenter from 'components/FlexCenter';
import ShareMomentCard from 'components/MomentCard/ShareMomentCard';

import DownloadBar from 'share/components/DownloadBar';
import DownloadQrcode from 'share/components/DownloadQrcode';

import request from 'utils/shareRequest';

const CommentWrapper= styled.div`
  fontSize: 0.26rem;
  padding: 0 0.12rem 0.12rem 1.2rem;
  background-color: ${pallete.white};
`;

const ActionWrapper = styled(FlexSB)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.96rem;
  border-top: 0.01rem ${pallete.border.deep} solid;
  background-color: ${pallete.white};
  z-index: 20;
`

const TabPane = Tabs.TabPane;
export class ShareBusinessPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    contentClassName: '',
    title: '动态详情',
    type: 'business',
    moment: null,
  }

  handleDownloadInfo = () => {
    Toast.info('请注册或登录', 2);
  }

  componentWillMount() {
    const { id } = this.props;
    request.doGet('moments/details', {
      moments_id: id,
      'from_share': 1
    }).then((res) => {
      const { data } = res;
      const { category, reward_as, source_type } = data;

      let contentClassName = '';
      let title = (category === '3' || reward_as === '2') ? '需求详情' : ((category === '0' || reward_as === '1') ? '供应详情' : '动态详情');
      const type = (category === '3' || reward_as === '2' || category === '0' || reward_as === '1') ? 'business' : 'communication';

      // if it is CMS
      if (source_type === 1) {
        title = data.title;
        contentClassName = 'app-cms-content';
      }

      this.setState({
        title,
        type,
        moment: data,
        contentClassName,
      });
    });
  }
  render() {
    const { title, moment, type, contentClassName } = this.state;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
        >
          {title}
        </NavBar>
        <AppContent style={{ paddingBottom: '1.28rem' }}>
            {
              moment ? (
                <div>
                  <div className={contentClassName}>
                    <ShareMomentCard
                      moment={moment}
                      from="detail"
                      type={type}
                    />
                  </div>
                  <WhiteSpace size="md" />
                  <Tabs
                    defaultActiveKey="1"
                    animated={false}
                    className="moment-detail-tabs"
                  >
                    <TabPane tab={`评论 ${moment.comment_count}`} key="1">
                      <div>
                        {moment.comments.map((u)  => (
                          <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                            <UserHeaderBar
                              user={{...u, id: u.created_by}}
                              linkUser={false}
                            />
                            <CommentWrapper>
                              <div>
                                {u.to_name !== '' && <span>回复<span style={{ color: pallete.theme }}>{u.to_name}</span>：</span>}
                                {u.content}
                              </div>
                              <div style={{ textAlign: 'right' }} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.handleDownloadInfo();
                              }}>
                                <Icon type={require('icons/ali/点赞.svg')} size="sm" color={u.is_like > 0 ? pallete.theme : pallete.text.help} />
                              </div>
                            </CommentWrapper>
                          </div>
                        ))}
                      </div>
                    </TabPane>
                    <TabPane tab={`赞 ${moment.like_count}`} key="2">
                      <div>
                        {moment.likes.map((u)  => (
                          <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                            <UserHeaderBar
                              user={{...u, id: u.created_by}}
                              linkUser={false}
                            />
                          </div>
                        ))}
                      </div>
                    </TabPane>
                    <TabPane tab={`分享 ${moment.share_count}`} key="3">
                      <div>
                        {moment.shares.map((u)  => (
                          <div key={u.id} style={{ borderBottom: `0.01rem ${pallete.border.deep} solid` }}>
                            <UserHeaderBar
                              user={{...u, id: u.created_by}}
                              linkUser={false}
                            />
                          </div>
                        ))}
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              ) : null
            }
            <DownloadQrcode />
        </AppContent>
        <DownloadBar />
      </div>
    );
  }
}

ShareBusinessPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareBusinessPage;
