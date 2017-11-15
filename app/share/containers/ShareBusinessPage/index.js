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
import TouchLoader from 'components/TouchLoader';

import DownloadBar from 'share/components/DownloadBar';
import DownloadQrcode from 'share/components/DownloadQrcode';

import request from 'utils/shareRequest';

import shareConfig from 'utils/shareConfig';

const CommentWrapper= styled.div`
  fontSize: 0.26rem;
  padding: 0 0.12rem 0.12rem 1.2rem;
  background-color: ${pallete.white};
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${pallete.text.help};
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

const SectionTitle = styled.div`
  height: 0.8rem;
  font-size: 0.3rem;
  line-height: 0.8rem;
  text-align: center;
  background-color: ${pallete.white};
  border-top: 0.01rem ${pallete.border.deep} solid;
  border-bottom: 0.01rem ${pallete.border.deep} solid;
`;

const TabPane = Tabs.TabPane;
export class ShareBusinessPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    title: '动态详情',
    type: 'business',
    moment: null,
    businessType: 'status',
    otherList: {
      page: 1,
      loading: false,
      list: false,
      hasNext: false,
    },
  }

  handleDownloadInfo = () => {
    Toast.info('请下载健康商信APP', 2);
  }

  componentWillMount() {
    const { id, uid } = this.props;
    request.doGet('moments/details', {
      moments_id: id,
      uid,
      'from_share': 1
    }).then((res) => {
      const { data } = res;
      const { category, reward_as, source_type, share_user, privilege_type } = data;
      let title = (category === '3' || reward_as === '2') ? '需求动态详情' : ((category === '0' || reward_as === '1') ? '供应动态详情' : '社交详情');
      let type = (category === '3' || reward_as === '2' || category === '0' || reward_as === '1') ? 'business' : 'communication';
      let businessType = (category === '3' || reward_as === '2') ? 'demand' : ((category === '0' || reward_as === '1') ? 'supplier' : 'status');

      // group status
      if (category === '0' && privilege_type === '4') {
        title = "群动态详情";
        type = "communication";
        businessType = "status";
      }
      // if it is CMS
      if (source_type === 1) {
        title = data.title;
      }

      this.setState({
        title,
        type,
        moment: data,
        businessType,
      });

      shareConfig.share('momment', data, share_user);

      if (type !== 'communication') {
        this.getOtherStatus(data.id, 1);
      }
    });
  }

  getOtherStatus = (id, page) => {
    const self = this;
    const { otherList } = this.state;

    request.doGet('moments/analogy', {
      moments_id: id,
      page,
    }).then((res) => {
      const { list, page } = res;
      let hasNext = true;

      if (page) {
        if (page.current_page >= page.page_count) {
          hasNext = false;
        }
      } else {
        hasNext = false;
      }

      self.setState({
        otherList: {
          page: (page ? page.current_page : 1),
          loading: false,
          list: otherList.list ? [...otherList.list, ...list] : list,
          hasNext,
        },
      });
    });
  }

  onEndReached = () => {
    const { moment, otherList } = this.state;

    this.getOtherStatus(moment.id, otherList.page + 1);
  }

  render() {
    const { title, moment, type, businessType, otherList } = this.state;
    const loading = otherList.loading;
    const hasNext = otherList.hasNext;
    const yearList = [];

    const listView = (otherList.list && otherList.list.length > 0) ? otherList.list.map((moment) => {
      const date = new Date(moment.created_at * 1000);
      const year = date.getFullYear();
      if (yearList.findIndex((y) => y === year) === -1) {
        yearList.push(year);

        return (
          <div key={moment.id}>
            <section
              style={{
                paddingLeft: '0.28rem',
                color: pallete.theme,
                fontSize: '0.36rem',
                height: '0.64rem',
                lineHeight: '0.64rem',
                backgroundColor: pallete.white,
              }}
            >{year}年</section>
            <ShareMomentCard
              moment={moment}
              from="list"
              type="business"
              style={{ marginBottom: '0.15rem' }}
            />
          </div>
        );
      }

      return <ShareMomentCard
        key={moment.id}
        moment={moment}
        from="list"
        type="business"
        style={{ marginBottom: '0.15rem' }}
      />
    }) : null;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
        >
          {title.length > 18 ? `${title.substring(0, 15)}...` : title}
        </NavBar>
        <TouchLoader
          initializing={0}
          hasMore={hasNext}
          loading={loading}
          onLoadMore={this.onEndReached}
          autoLoadMore={true}
          className="tloader app-content"
          style={{ paddingBottom: '2rem' }}
        >
          {
            moment ? (
              <div>
                <div>
                  <ShareMomentCard
                    moment={moment}
                    from="detail"
                    type={type}
                  />
                </div>
                <WhiteSpace size="md" />
                {type === 'communication' &&
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
                              <LikeWrapper onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.handleDownloadInfo();
                              }}>
                                <Icon type={require('icons/ali/点赞.svg')} size="sm" color={pallete.text.help} />
                                {u.like_count}
                              </LikeWrapper>
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
                }

                {businessType === 'demand' && (
                  <div>
                    <SectionTitle>其他类似需求</SectionTitle>
                    <WhiteSpace size="md" />
                    {listView}
                  </div>
                )}
                {businessType === 'supplier' && (
                  <div>
                    <SectionTitle>其他类似供应</SectionTitle>
                    <WhiteSpace size="md" />
                    {listView}
                  </div>
                )}
              </div>
            ) : null
          }
          <WhiteSpace size="md" />
          <DownloadQrcode />
        </TouchLoader>
        <DownloadBar />
      </div>
    );
  }
}

ShareBusinessPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareBusinessPage;
