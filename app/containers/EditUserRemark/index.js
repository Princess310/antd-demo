/*
 *
 * EditUserRemark
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, List, WhiteSpace, Icon, InputItem } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

import request from 'utils/request';

export class EditUserRemark extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { location: { state } } = this.props;

    this.state = {
      id: state.id,
      value: state.remark,
    }
  }

  onChange = (value) => {
    this.setState({
      value,
    });
  }

  handleSave = () => {
    const { id, value } = this.state;

    request.doPut('follow/set-remark', {
      remark: value,
      fid: id,
    }).then(() => {
      browserHistory.goBack();
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>保存</MenuBtn>,
          ]}
        >
          修改备注名
        </NavBar>
        <WhiteSpace />
        <List>
          <InputItem
            value={value}
            onChange={this.onChange}
            placeholder="备注名"
          />
        </List>
      </div>
    );
  }
}

EditUserRemark.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(EditUserRemark);
