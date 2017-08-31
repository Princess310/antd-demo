/*
 *
 * BusinessPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';
import request from 'utils/request';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import MomentCard from 'components/MomentCard';
import FlexColumnCenter from 'components/FlexColumnCenter';
import FlexRow from 'components/FlexRow';
import UpdateMessage from 'components/UpdateMessage';
import { NavBar, Icon, ActionSheet, Modal, Tabs, Badge } from 'antd-mobile';

import { makeSelectBusiness, makeSelectBusinessUpdateMessage } from './selectors';
import { makeSelectCurrentUser, makeSelectUnreadDot } from 'containers/HomePage/selectors';
import { makeSelectUserCenterIndustry } from 'containers/UserCenter/selectors';

import FilterPanel from './FilterPanel';
import { fetchBusiness, loadUpdateMessage } from './actions';
import { fetchIndustry } from 'containers/UserCenter/actions';
import { loadSelectTab } from 'containers/HomePage/actions';
import './styles.scss';

const alert = Modal.alert;
const TabPane = Tabs.TabPane;
export class BusinessPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.initData = [];
    this.state = {
      startPage: 1,
      role: 0,
    };
  }

  // basicly, fetch the list info in react componentWillMount func first.
  componentWillMount() {
    const { role, startPage } = this.state;
    const { getBusiness, business, industryList, getIndustry } = this.props;

    if (!business[role]) {
      getBusiness(role, startPage);
    }

    if (!industryList) {
      getIndustry();
    }
  }

  // handle the change event for tab, to fetch current tab list info
  handleTabChange = (key) => {
    const { startPage } = this.state;
    const { business, getBusiness } = this.props;
    if (!business[key]) {
      getBusiness(key, startPage);
    }

    this.setState({
      role: key,
    });
  }

  // handle the pull to refresh page event
  onRefresh = () => {
    const { getBusiness } = this.props;
    const { role, startPage } = this.state;

    getBusiness(role, startPage);
  }

  // handle the pagination by scrolling to bottom
  onEndReached = () => {
    const { role } = this.state;
    const { business, getBusiness } = this.props;

    getBusiness(role, Number(business[role].page) + 1);
  }

  // when update message bar animated, we should handle the props for it.
  handleMessage = () => {
    const { setUpdateMessage } = this.props;

    // remove the update message after 2s
    setTimeout(() => {
      setUpdateMessage('business', false, 0);
    }, 2E3);
  }

  // check the publish condition, then go to the publish page
  handlePublish = () => {
    const { setSelectTab } = this.props;
    const { type } = this.state;

    request.doGet('moments/check-release').then((res) => {
      const { my_point, release_point, free, show_mobile } = res;
      if (Number(free) ===  0) {
        // the point only enough for demand publish
        if (my_point >= 5 && my_point < 10) {
          browserHistory.push({
            pathname: 'businessPublish',
            state: {
              show_mobile,
            },
          });

          return;
        }

        if (my_point < release_point) {
          alert('发布失败', <div>
              <div style={{ color: pallete.theme }}>{`剩余${my_point}积分`}</div>
              <div>{`您的账户已不足${release_point}分，无法继续发布${type === 2 ? '采购需求信息' : '供应信息'}，可到“讨论”栏目评论（+5分）、点赞（+1分）、分享（+10分）挣取积分。`}</div>
            </div>, [
            { text: '我知道了', onPress: () => console.log('cancel') },
            { text: '立即前去', onPress: () => {
              setSelectTab('communicate');
            }, style: { fontWeight: 'bold' } },
          ]);

          return;
        }
      }

      browserHistory.push({
        pathname: 'businessPublishSupplier',
        state: {
          show_mobile,
        },
      });
    });
  }

  render() {
    const { role } = this.state;
    const { business, currentUser, industryList, unreadDot, updateInfo } = this.props;

    const resultIndustryList = [{ id: 0, name: '全部角色' }, ...industryList];

    return (
      <div>
        <NavBar
          iconName={false}
          mode="light"
          leftContent={(
            <FlexColumnCenter onClick={() => {
              browserHistory.push('/businessSearch');
            }}>
              <Icon key={1} type={require('icons/ali/搜索-business.svg')} color={pallete.text.help} />
              <span style={{ fontSize: '0.2rem', color: pallete.text.help }}>查询</span>
            </FlexColumnCenter>
          )}
          rightContent={[
            <FlexColumnCenter key={1} onClick={this.handlePublish}>
              <Icon key={1} type={require('icons/ali/发布.svg')} color={pallete.theme} />
              <span style={{ fontSize: '0.2rem', color: pallete.theme }}>发布</span>
            </FlexColumnCenter>
          ]}
        >
          生意
        </NavBar>
          {
            industryList && (
              <Tabs pageSize={4} onChange={this.handleTabChange} animated={false}>
                {resultIndustryList.map((industry) => (
                  <TabPane tab={<Badge dot={industry.id === 0 && unreadDot ? (unreadDot.business_red_dot > 0 ? true : false) : false}>{industry.name}</Badge>} key={industry.id}>
                    <ScrollContainer scrollKey={`business_index_${industry.id}`}>
                      <TouchLoader
                        initializing={0}
                        refreshing={business[role] && business[role].refresh}
                        onRefresh={this.onRefresh}
                        hasMore={business[role] && business[role].hasNext}
                        loading={business[role] && business[role].loading}
                        onLoadMore={this.onEndReached}
                        autoLoadMore={true}
                        className="tloader app-content"
                        style={{ top: '1.8rem', bottom: '1rem' }}
                      >
                      {business[industry.id] ? business[industry.id].list.map((moment) => (
                        <MomentCard
                          key={moment.id}
                          moment={moment}
                          currentUser={currentUser}
                          from="list"
                          type="business"
                          style={{ marginTop: '0.12rem' }}
                        />
                      )) : null}
                      </TouchLoader>
                    </ScrollContainer>
                  </TabPane>
                ))}
              </Tabs>
            )
          }
          {(updateInfo.business && updateInfo.business.show) &&
            <UpdateMessage
              message={`更新了${updateInfo.business.count}条生意`}
              style={{
                position: 'absolute',
                top: '1.8rem',
                left: 0,
              }}
              callback={this.handleMessage}
            />
          }
      </div>
    );
  }
}

BusinessPage.propTypes = {
  /**
   * action: fetch the business info
   */
  getBusiness: PropTypes.func,
  /**
   * reducer: business props
   */
  business: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  /**
   * reducer: current user
   */
  currentUser: PropTypes.object,
  /**
   * action: fetch the industry info
   */
  getIndustry: PropTypes.func,
  /**
   * reducer: industry list info
   */
  industryList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  /**
   * action: change the tab to show
   */
  setSelectTab: PropTypes.func,
  /**
   * reducer: undread dot
   */
  unreadDot: PropTypes.object,
  /**
   * reducer: update message info
   */
  updateInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  /**
   * action: change the message ber to show or hide
   */
  setUpdateMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  currentUser: makeSelectCurrentUser(),
  industryList: makeSelectUserCenterIndustry(),
  unreadDot: makeSelectUnreadDot(),
  updateInfo: makeSelectBusinessUpdateMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBusiness: (type, page, searchParams) => dispatch(fetchBusiness(type, page, searchParams)),
    getIndustry: () => dispatch(fetchIndustry()),
    setSelectTab: (selectTab) => dispatch(loadSelectTab(selectTab)),
    setUpdateMessage: (type, show, count) => dispatch(loadUpdateMessage(type, show, count)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);
