/*
 *
 * AddFriendPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import request from 'utils/request';
import pallete from 'styles/colors';

import { browserHistory } from 'react-router';
import { NavBar, Icon, List, TextareaItem, Toast } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

export class AddFriendPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    content: '',
  }

  handleContent = (content) => {
    this.setState({
      content,
    });
  }

  handleSend = () => {
    const { content } = this.state;
    const { location: { state } } = this.props;

    request.doPost('follow/add-friend', {
      fid: state.id,
      flag: state.flag,
      content,
      moments_id: state.moments_id ? state.moments_id : '',
    }).then((res) => {
      Toast.info(res.message);

      browserHistory.goBack();
    });
  }

  render() {
    const { content } = this.state;
    const { location: { state } } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSend}>发送</MenuBtn>,
          ]}
        >
          {state.name}
        </NavBar>
        <List renderHeader={() => '请在此输入您加好友验证信息'}>
          <TextareaItem
            autoHeight
            labelNumber={5}
            rows={3}
            value={content}
            onChange={this.handleContent}
            placeholder="验证内容"
          />
        </List>
      </div>
    );
  }
}

AddFriendPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AddFriendPage);
