/*
 *
 * ComplaintUser
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import { NavBar, List, Radio, WhiteSpace, Icon, Toast } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';
import FlexSB from 'components/FlexSB';
import FlexRow from 'components/FlexRow';

import { makeSelectUserComplaint } from 'containers/UserCenter/selectors';
import { makeSelectInitialState } from 'containers/App/selectors';
import { fetchComplaintTypes, saveUserComplaint } from 'containers/UserCenter/actions';

const RadioItem = Radio.RadioItem;
export class ComplaintUser extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    selected: '',
  }

  componentWillMount() {
    const { complaintList, fetchList } = this.props;

    if (!complaintList) {
      fetchList();
    }
  }

  onChange = (id) => {
    this.setState({
      selected: id,
    });
  }

  handleSave = () => {
    const { selected } = this.state;
    const { location: { state }, saveInfo } = this.props;

    if (selected === '') {
      Toast.info('请选择投诉类型', 2);
      return;
    }

    saveInfo(state.id, selected, state.module);
  }

  render() {
    const { selected } = this.state;
    const { complaintList, initialInfo } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>提交</MenuBtn>,
          ]}
        >
          投诉
        </NavBar>
        {complaintList && <List
          renderHeader={() => (
            <FlexSB>
              <div>选择投诉原因</div>
              {initialInfo && <a href={`tel:${initialInfo.phone.data}`} style={{ color: pallete.theme }}>
                <FlexRow>
                  <Icon type={require('icons/ali/投诉.svg')} size="sm" color={pallete.theme} />
                  <span style={{ marginLeft: '0.08rem' }}>客服电话</span>
                </FlexRow>
              </a>}
            </FlexSB>
          )}
        >
          {complaintList.map(i => (
            <RadioItem key={i.id} checked={selected === i.id} onChange={() => this.onChange(i.id)}>
              {i.name}
            </RadioItem>
          ))}
        </List>}
      </div>
    );
  }
}

ComplaintUser.propTypes = {
  complaintList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  fetchList: PropTypes.func,
  initialInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  complaintList: makeSelectUserComplaint(),
  initialInfo: makeSelectInitialState(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchList: () => dispatch(fetchComplaintTypes()),
    saveInfo : (id, type, m) => dispatch(saveUserComplaint(id, type, m)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintUser);
