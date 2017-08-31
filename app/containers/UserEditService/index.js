/*
 *
 * UserEditService
 *
 * path --> userEditService
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectUserCenterService } from 'containers/UserCenter/selectors';

import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, List, Radio, WhiteSpace, Icon } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

import { saveUser, fetchService } from 'containers/UserCenter/actions';

const RadioItem = Radio.RadioItem;
export class UserEditService extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { currentUser } = props;
    this.state = {
      tag_identity_id: currentUser.tag_identity_id,
      main_service_id: currentUser.main_service_id,
    };
  }

  componentDidMount() {
    const { currentUser, getService } = this.props;

    // fetch service list here
    if (currentUser && currentUser.tag_identity_id) {
      getService(currentUser.tag_identity_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, getService, serviceList } = nextProps;

    this.setState({
      tag_identity_id: currentUser.tag_identity_id,
      main_service_id: currentUser.main_service_id,
    });

    // fetch service list here, when there is no serviceList
    if (currentUser && currentUser.tag_identity_id && !serviceList) {
      getService(currentUser.tag_identity_id);
    }
  }

  handleChange = (id) => {
    this.setState({
      main_service_id: id,
    });
  }

  handleSave = () => {
    const { saveUserInfo } = this.props;
    const { tag_identity_id, main_service_id } = this.state;

    saveUserInfo({
      tag_identity_id,
      main_service_id,
    });
  }

  render() {
    const { serviceList } = this.props;
    const { main_service_id } = this.state;

    const listView = serviceList ? serviceList.map((service) => (
      <RadioItem
        key={service.id}
        checked={Number(main_service_id) === Number(service.id)}
        onChange={() => this.handleChange(service.id)}
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
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>保存</MenuBtn>,
          ]}
        >
          主营类别
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          {listView}
        </List>
      </div>
    );
  }
}

UserEditService.propTypes = {
  /**
   * reducer: the current user info
   */
  currentUser: PropTypes.object,
  /**
   * reducer: the service list
   */
  serviceList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  /**
   * action: save the user info
   */
  saveUserInfo: PropTypes.func,
  /**
   * action: get the service list
   */
  getService: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  serviceList: makeSelectUserCenterService(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveUserInfo: (params) => dispatch(saveUser(params)),
    getService: (id) => dispatch(fetchService(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditService);
