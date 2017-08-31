/*
 *
 * SelectPrice
 *
 * path --> selectPrice
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { NavBar, Icon, Accordion, List, Radio } from 'antd-mobile';

import { loadPublishParams, fetchBusinessPrice } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams, makeSelectBusinessPrice } from 'containers/BusinessPage/selectors';

const RadioItem = Radio.RadioItem;
export class SelectPrice extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams } = this.props;

    this.state = {
      selected: publishParams.price ? publishParams.price : {},
    };
  }

  componentWillMount() {
    const { priceList, getPrice } = this.props;

    if (!priceList) {
      getPrice();
    }
  }

  handleSelect = (item) => {
    this.props.setPrice({
      price: item,
    });
    browserHistory.goBack();
  }

  render() {
    const { selected } = this.state;
    const { priceList } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          选择单价区间
        </NavBar>
        <List>
          {priceList && priceList.map((i, index) => (
            <RadioItem key={i.id} checked={selected.id ? selected.id === i.id : index === 0} onChange={() => this.handleSelect(i)}>
              {i.value === '' ? i.unit : i.value}
            </RadioItem>
          ))}
        </List>
      </div>
    );
  }
}

SelectPrice.propTypes = {
  /**
   * action: get te price info from backend
   */
  getPrice: PropTypes.func,
  /**
   * action: set the price for reducer
   */
  setPrice: PropTypes.func,
  /**
   * reducer: the publish params
   */
  publishParams: PropTypes.object,
  /**
   * reducer: the price list
   */
  priceList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  priceList: makeSelectBusinessPrice(),
  publishParams: makeSelectPublishParams(),
});


function mapDispatchToProps(dispatch) {
  return {
    getPrice: () => dispatch(fetchBusinessPrice()),
    setPrice: (params) => dispatch(loadPublishParams(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPrice);
