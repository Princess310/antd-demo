/*
 *
 * FeedBackResult
 *
 * path --> feedBackResult
 * 
 * show the success page after send feed back info: see FeedBackPage container
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';
import { NavBar, Result, Icon, WhiteSpace } from 'antd-mobile';

export class FeedBackResult extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          意见反馈
        </NavBar>
        <WhiteSpace />
        <Result
          img={<Icon type="check-circle" className="icon" size="lg" style={{ fill: '#1F90E6' }} />}
          message="提交成功，感谢您的反馈！"
        />
      </div>
    );
  }
}

FeedBackResult.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(FeedBackResult);
