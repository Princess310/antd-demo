/*
 *
 * SelectReward
 *
 * path --> selectReward
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { NavBar, Icon, Accordion, List, Radio } from 'antd-mobile';

import { loadPublishParams, fetchReward } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams, makeSelectBusinessRewards } from 'containers/BusinessPage/selectors';

const RadioItem = Radio.RadioItem;
export class SelectReward extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams } = this.props;

    this.state = {
      selected: publishParams.reward_item ? publishParams.reward_item : {},
    };
  }

  componentWillMount() {
    const { rewardList, getReward } = this.props;

    if (!rewardList) {
      getReward();
    }
  }

  handleSelect = (item) => {
    this.props.setReward({
      reward_item: item,
    });
    browserHistory.goBack();
  }

  render() {
    const { selected } = this.state;
    const { rewardList } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          选择产品类别
        </NavBar>
        <List>
          {rewardList && rewardList.map((i) => (
            <RadioItem key={i.id} checked={selected.id === i.id} onChange={() => this.handleSelect(i)}>
              {i.name}
            </RadioItem>
          ))}
        </List>
      </div>
    );
  }
}

SelectReward.propTypes = {
  /**
   * action: get the reward info from backend
   */
  getReward: PropTypes.func,
  /**
   * action: set the reward for reducer
   */
  setReward: PropTypes.func,
  /**
   * reducer: the publish params
   */
  publishParams: PropTypes.object,
  /**
   * reducer: the reward list
   */
  rewardList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  rewardList: makeSelectBusinessRewards(),
  publishParams: makeSelectPublishParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReward: () => dispatch(fetchReward()),
    setReward: (params) => dispatch(loadPublishParams(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectReward);
