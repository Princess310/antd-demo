/*
 *
 * SelectUnits
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { NavBar, Icon, Accordion, List, Radio } from 'antd-mobile';

import { loadPublishParams, fetchBusinessUnits } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams, makeSelectBusinessUnits } from 'containers/BusinessPage/selectors';

const RadioItem = Radio.RadioItem;
export class SelectUnits extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams } = this.props;

    this.state = {
      selected: publishParams.units ? publishParams.units : {},
    };
  }

  componentWillMount() {
    const { unitsList, getUnits } = this.props;

    if (!unitsList) {
      getUnits();
    }
  }

  handleSelect = (item) => {
    this.props.setUnits({
      units: item,
    });
    browserHistory.goBack();
  }

  render() {
    const { selected } = this.state;
    const { unitsList, location: { state } } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          {state.type === 'supplier' ? '选择单价区间单位' : '选择需求数量'}
        </NavBar>
        <List>
          {unitsList && unitsList.map((i, index) => (
            <RadioItem key={i.id} checked={selected.id ? selected.id === i.id : index === 0} onChange={() => this.handleSelect(i)}>
              {i.name}
            </RadioItem>
          ))}
        </List>
      </div>
    );
  }
}

SelectUnits.propTypes = {
  getUnits: PropTypes.func,
  setUnits: PropTypes.func,
  publishParams: PropTypes.object,
  unitsList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  unitsList: makeSelectBusinessUnits(),
  publishParams: makeSelectPublishParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUnits: () => dispatch(fetchBusinessUnits()),
    setUnits: (params) => dispatch(loadPublishParams(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectUnits);
