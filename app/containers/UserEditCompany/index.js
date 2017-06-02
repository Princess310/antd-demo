/*
 *
 * UserEditCompany
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';

import { browserHistory } from 'react-router';
import { NavBar, List, TextareaItem, WhiteSpace } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

import { saveUser } from 'containers/UserCenter/actions';

export class UserEditCompany extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { currentUser } = props;
    this.state = {
      address: currentUser.address,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;

    this.setState({
      address: currentUser.address,
    });
  }

  handleChange = (value) => {
    this.setState({
      address: value,
    });
  }

  handleSave = () => {
    const { saveUserInfo } = this.props;
    const { address } = this.state;

    saveUserInfo({
      address,
    });
  }

  render() {
    const { address } = this.state;

    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>保存</MenuBtn>,
          ]}
        >
          公司地址
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="请填写公司地址"
            value={address}
            onChange={this.handleChange}
            rows={4}
            count={30}
          />
        </List>
      </div>
    );
  }
}

UserEditCompany.propTypes = {
  currentUser: PropTypes.object,
  saveUserInfo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveUserInfo: (params) => dispatch(saveUser(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditCompany);
