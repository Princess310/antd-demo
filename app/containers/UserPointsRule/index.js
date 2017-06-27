/*
 *
 * UserPointsRule
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pallete from 'styles/colors';

import { browserHistory } from 'react-router';
import { NavBar, Icon } from 'antd-mobile';
import AppContent from 'components/AppContent';

export class UserPointsRule extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          积分规则
        </NavBar>
        <AppContent style={{ padding: '0.32rem', color: '#4D5059', fontSize: '0.28rem', backgroundColor: pallete.white }}>
          <section>1.每日登录会得到积分奖励</section>
          <section>2.在动态频道有效评论、点赞、分享会得到积分奖励</section>
          <section>3.在生意频道发布需求或供应会消耗相应积分</section>
          <section> 4.发布的违法、诈骗、违规的信息会对动态进行删除，并且双倍扣除积分，情节严重者，可能会面临封号处理，请谨慎对待</section>
          <section>注意：本规则一切解释权与修改权归《成都阿里健网络科技有限公司》所有</section>
        </AppContent>
      </div>
    );
  }
}

UserPointsRule.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(UserPointsRule);
