/*
 *
 * SelectNumber
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { NavBar, Icon, Accordion, List, Radio } from 'antd-mobile';

import { loadPublishParams, fetchBusinessNumber } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams, makeSelectBusinessNumber } from 'containers/BusinessPage/selectors';

const RadioItem = Radio.RadioItem;
export class SelectNumber extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams } = this.props;

    this.state = {
      selected: publishParams.number ? publishParams.number : {},
    };
  }

  componentWillMount() {
    const { numberList, getNumber } = this.props;

    if (!numberList) {
      getNumber();
    }
  }

  handleSelect = (item) => {
    this.props.setNumber({
      number: item,
    });
    browserHistory.goBack();
  }

  render() {
    const { selected } = this.state;
    const { numberList } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          选择需求数量
        </NavBar>
        <List>
          {numberList && numberList.map((i, index) => (
            <RadioItem key={i.id} checked={selected.id ? selected.id === i.id : index === 0} onChange={() => this.handleSelect(i)}>
              {i.value === '' ? i.unit : i.value}
            </RadioItem>
          ))}
        </List>
      </div>
    );
  }
}

SelectNumber.propTypes = {
  getNumber: PropTypes.func,
  setNumber: PropTypes.func,
  publishParams: PropTypes.object,
  numberList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  numberList: makeSelectBusinessNumber(),
  publishParams: makeSelectPublishParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNumber: () => dispatch(fetchBusinessNumber()),
    setNumber: (params) => dispatch(loadPublishParams(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectNumber);
