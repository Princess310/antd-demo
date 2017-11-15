/*
 *
 * BusinessRecommend
 *
 * path --> businessRecommend
 * 
 * The recommand list page after publish status to show
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import FlexCenter from 'components/FlexCenter';
import MomentCard from 'components/MomentCard';

import { NavBar, Icon, List, WhiteSpace } from 'antd-mobile';

import { makeSelectBusinessRecommend } from 'containers/BusinessPage/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { fetchBuinessRecommend }from 'containers/BusinessPage/actions';

const Item = List.Item;
export class BusinessRecommend extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
    };
  }

  // handle pull to refresh
  onRefresh = () => {
    const { startPage } = this.state;
    const { location: { query }, getList } = this.props;

    getList(query.id, startPage);
  }

  // pagination
  onEndReached = () => {
    const { location: { query }, getList, recommendList } = this.props;

    getList(query.id, recommendList.page + 1);
  }

  render() {
    const { location: { query }, recommendList, currentUser } = this.props;

    const listView = recommendList.list ? recommendList.list.map((moment) => (
      <MomentCard
        key={moment.id}
        moment={moment}
        currentUser={currentUser}
        from="recommend"
        type="business"
        style={{ marginTop: '0.12rem' }}
        recommendId={query.id}
      />
    )) : null;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          发布成功
        </NavBar>
        <ScrollContainer scrollKey="business_recommend">
          <TouchLoader
            initializing={0}
            refreshing={recommendList.refresh}
            onRefresh={this.onRefresh}
            hasMore={recommendList.hasNext}
            loading={recommendList.loading}
            onLoadMore={this.onEndReached}
            autoLoadMore={true}
            className="tloader app-content"
            style={{ top: '0.9rem', bottom: 0 }}
          >
            <WhiteSpace />
            <List>
              <Item>
                <FlexCenter style={{ color: pallete.theme }}>以下是为您推荐的内容</FlexCenter>
              </Item>
            </List>
            <WhiteSpace />
            {listView}
          </TouchLoader>
        </ScrollContainer>
      </div>
    );
  }
}

BusinessRecommend.propTypes = {
  /**
   * reducer: recommend list info
   */
  recommendList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * action: get the recommend list
   */
  getList: PropTypes.func,
  /**
   * reducer: current user info
   */
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  recommendList: makeSelectBusinessRecommend(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getList: (id, page) => dispatch(fetchBuinessRecommend(id, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessRecommend);
