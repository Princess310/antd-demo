/*
 *
 * UserCenterCollects
 *
 * path --> userCenterCollects
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import { NavBar, Icon, ActionSheet, Result, WhiteSpace } from 'antd-mobile';
import AppContent from 'components/AppContent';
import UserMomentHeader from 'components/UserMomentHeader';
import DateInfo from 'components/DateInfo';
import FlexRow from 'components/FlexRow';
import pallete from 'styles/colors';

import { fetchCollects, delCollect } from 'containers/UserCenter/actions';
import { makeSelectUserCollects } from 'containers/UserCenter/selectors';
import noResultPage from 'assets/images/no-data-collect.png';

const WrapperStyle = {
  paddingLeft: '1.2rem',
  paddingRight: '0.24rem',
  backgroundColor: pallete.white,
};

const CollectContentStyle = {
  backgroundColor: pallete.background.collect,
  padding: '0.12rem',
  color: pallete.text.words,
  fontSize: '0.24rem',
};

export class UserCenterCollects extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
    };
  }

  componentWillMount() {
    const { getCollects } = this.props;

    getCollects(1);
  }

  onRefresh = () => {
    const { getCollects } = this.props;

    getCollects(this.state.startPage);
  }

  onEndReached = () => {
    const { page } = this.state;
    const { collectInfo, getCollects } = this.props;

    if (collectInfo.loading || !collectInfo.hasNext) {
      return;
    }

    getCollects(collectInfo.page + 1);
  }

  showActionSheet = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const { deleteCollect } = this.props;
    const BUTTONS = ['删除', '取消'];

    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      message: '删除该收藏',
      maskClosable: true,
      'data-id': id,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        deleteCollect(id);
      }
    });
  }

  render() {
    const { collectInfo } = this.props;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          我的收藏
        </NavBar>
        <AppContent>
          {
            (collectInfo.list && collectInfo.list.length > 0) ?
            (
              <ScrollContainer scrollKey="user_center_collects">
                <TouchLoader
                  initializing={0}
                  refreshing={collectInfo.refresh}
                  onRefresh={() => this.onRefresh(0)}
                  hasMore={collectInfo.hasNext}
                  loading={collectInfo.loading}
                  onLoadMore={this.onEndReached}
                  autoLoadMore={true}
                  className="tloader app-content"
                  style={{ top: '0' }}
                >
                  {collectInfo.list.map((moment) => (
                    <div
                      style={{ borderBottom: `0.01rem ${pallete.border.normal} solid` }}
                      onClick={() => {
                        browserHistory.push({
                          pathname: 'momentDetail',
                          query: {
                            id: moment.moments_id,
                          },
                          state: {
                            type: (moment.category === '3' || moment.reward_as === '2') || (moment.category === '0' || moment.reward_as === '1') ? 'business' : 'communication',
                          },
                        });
                      }}
                      key={moment.id}
                    >
                      <UserMomentHeader
                        user={moment.user}
                        linkUser={moment.user.source_type === 1 ? false : true}
                        rightContent={
                          <div style={{ width: '0.48rem', height: '0.48rem', textAlign: 'right' }} onClick={(e) => this.showActionSheet(e, moment.id)}>
                            <Icon
                              type={require('icons/ali/下拉.svg')}
                              size="xs"
                              color={pallete.text.words}
                            />
                          </div>
                        }
                      />
                      <div style={WrapperStyle}>
                        <FlexRow style={CollectContentStyle}>
                          {moment.url !== '' && <img role="presentation" style={{ maxWidth: '1.8rem', maxHeight: '1.8rem', marginRight: '0.12rem' }} src={moment.url} />}
                          <div>{moment.content}</div>
                        </FlexRow>
                      </div>
                      <DateInfo
                        time={moment.created_at}
                        style={{
                          textAlign: 'right',
                          backgroundColor: pallete.white,
                          padding: '0.24rem',
                        }}
                      />
                    </div>
                  ))}
                </TouchLoader>
              </ScrollContainer>
            ) : (
              <div>
                <WhiteSpace size="xs" />
                <Result
                  img={<img role="presentation" src={noResultPage} style={{ height: '100%', width: 'auto' }} />}
                  message="暂无收藏"
                />
              </div>
            )
          }
        </AppContent>
      </div>
    );
  }
}

UserCenterCollects.propTypes = {
  /**
   * action: get the collect status
   */
  getCollects: PropTypes.func,
  /**
   * reducer: the collect info
   */
  collectInfo: PropTypes.object,
  /**
   * action: delete the collect from list
   */
  deleteCollect: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  collectInfo: makeSelectUserCollects(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCollects: (page) => dispatch(fetchCollects(page)),
    deleteCollect: (id) => dispatch(delCollect(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenterCollects);
