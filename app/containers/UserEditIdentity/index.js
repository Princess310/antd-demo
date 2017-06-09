/*
 *
 * UserEditIdentity
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectUserCenterIndustry, makeSelectUserCenterService } from 'containers/UserCenter/selectors';

import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, List, Radio, WhiteSpace, Icon } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

import { saveUser, fetchIndustry, fetchService } from 'containers/UserCenter/actions';

const RadioItem = Radio.RadioItem;
export class UserEditIdentity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { currentUser, getIndustry, industryList, serviceList } = props;
    let serviceId = '';
    if (serviceList && serviceList.length > 0) {
      serviceId = serviceList[0].id;
    }

    this.state = {
      action: 'industry', // 2 panel to select: industry, service
      industry_son_id: currentUser.industry_son_id,
      tag_identity_id: currentUser.tag_identity_id,
      main_service_id: serviceId,
    };

    // fetch industry list here
    if (!industryList) {
      getIndustry();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, serviceList } = nextProps;

    if (serviceList && serviceList.length > 0) {
      const serviceId = serviceList[0].id;

      this.setState({
        main_service_id: serviceId,
      });
    } else {
      this.setState({
        industry_son_id: currentUser.industry_son_id,
        tag_identity_id: currentUser.tag_identity_id,
      });
    }
  }

  handleChangeIndustry = (id) => {
    const { getService } = this.props;

    // refresh service list
    getService(id);

    this.setState({
      tag_identity_id: id,
      action: 'service',
    });
  }

  handleChangeService = (id) => {
    this.setState({
      main_service_id: id,
    });
  }

  handleSave = () => {
    const { saveUserInfo } = this.props;
    const { industry_son_id, tag_identity_id, main_service_id } = this.state;

    saveUserInfo({
      industry_son_id,
      tag_identity_id,
      main_service_id,
    });
  }

  render() {
    const { industryList, serviceList } = this.props;
    const { action, tag_identity_id, main_service_id } = this.state;

    const listView = industryList ? industryList.map((industry) => (
      <RadioItem
        key={industry.id}
        checked={Number(tag_identity_id) === Number(industry.id)}
        onChange={() => this.handleChangeIndustry(industry.id)}
      >
        {industry.name}
      </RadioItem>
    )) : null;

    const serviceListView = serviceList ? serviceList.map((service) => (
      <RadioItem
        key={service.id}
        checked={Number(main_service_id) === Number(service.id)}
        onChange={() => this.handleChangeService(service.id)}
      >
        {service.name}
      </RadioItem>
    )) : null;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => {
            if (action === 'industry') {
              browserHistory.goBack();
            } else {
              this.setState({
                action: 'industry',
              });
            }
          }}
          rightContent={[
            action === 'service' && <MenuBtn key="0" onClick={this.handleSave}>保存</MenuBtn>,
          ]}
        >
          行业角色
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          {action === 'industry' ? listView : serviceListView}
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
  serviceList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  saveUserInfo: PropTypes.func,
  getIndustry: PropTypes.func,
  getService: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  industryList: makeSelectUserCenterIndustry(),
  serviceList: makeSelectUserCenterService(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveUserInfo: (params) => dispatch(saveUser(params)),
    getIndustry: () => dispatch(fetchIndustry()),
    getService: (id) => dispatch(fetchService(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditIdentity);
