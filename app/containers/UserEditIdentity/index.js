/*
 *
 * UserEditIdentity
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectUserCenterIndustry } from 'containers/UserCenter/selectors';

import { browserHistory } from 'react-router';
import { NavBar, List, Radio, TextareaItem, WhiteSpace } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

import { saveUser, fetchIndustry } from 'containers/UserCenter/actions';
import messages from './messages';

const RadioItem = Radio.RadioItem;
export class UserEditIdentity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { currentUser, getIndustry } = props;console.log('currentUser', currentUser);
    this.state = {
      industry_son_id: currentUser.industry_son_id,
      tag_identity_id: currentUser.tag_identity_id,
    }

    // fetch industry list here
    getIndustry();
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps;

    this.setState({
      industry_son_id: currentUser.industry_son_id,
      tag_identity_id: currentUser.tag_identity_id,
    })
  }

  handleChange = (id) => {
    this.setState({
      tag_identity_id: id,
    });
  }

  handleSave = () => {
    const { saveUserInfo } = this.props;
    const { industry_son_id, tag_identity_id } = this.state;
    
    saveUserInfo({
      industry_son_id,
      tag_identity_id,
    });
  }

  render() {
    const { industryList } = this.props;
    const { tag_identity_id } = this.state;

    const listView = industryList ? industryList.map((industry) => {
      return (
        <RadioItem
          key={industry.id}
          checked={Number(tag_identity_id) === Number(industry.id)}
          onChange={() => this.handleChange(industry.id)}
        >
          {industry.name}
        </RadioItem>
      );
    }) : null;
    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>保存</MenuBtn>
          ]}
        >
          行业角色
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          {listView}
        </List>
      </div>
    );
  }
}

UserEditIdentity.propTypes = {
  currentUser: PropTypes.object,
  industryList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  saveUserInfo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  industryList: makeSelectUserCenterIndustry(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveUserInfo: (params) => dispatch(saveUser(params)),
    getIndustry: () => dispatch(fetchIndustry()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditIdentity);
