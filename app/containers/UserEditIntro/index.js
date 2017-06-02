/*
 *
 * UserEditIntro
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

export class UserEditIntro extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { currentUser } = props;
    this.state = {
      intro: currentUser.intro,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;

    this.setState({
      intro: currentUser.intro,
    });
  }

  handleChange = (value) => {
    this.setState({
      intro: value,
    });
  }

  handleSave = () => {
    const { saveUserInfo } = this.props;
    const { intro } = this.state;

    saveUserInfo({
      intro,
    });
  }

  render() {
    const { intro } = this.state;

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
          业务介绍
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="完善您的业务介绍，让大家更容易了解您~"
            value={intro}
            onChange={this.handleChange}
            rows={4}
            count={1000}
          />
        </List>
      </div>
    );
  }
}

UserEditIntro.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserEditIntro);
