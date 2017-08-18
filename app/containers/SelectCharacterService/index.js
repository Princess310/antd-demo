/*
 *
 * SelectCharacterService
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { NavBar, Icon, Accordion, List, Radio } from 'antd-mobile';

import { loadPublishParams, fetchCharacterService } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams, makeSelectBusinessCharacterService } from 'containers/BusinessPage/selectors';

const RadioItem = Radio.RadioItem;
export class SelectCharacterService extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams } = this.props;

    this.state = {
      selected: publishParams.character ? publishParams.character : {},
    };
  }

  componentWillMount() {
    const { serviceList, getService } = this.props;

    if (!serviceList) {
      getService();
    }
  }

  handleSelect = (item) => {
    this.props.setService({
      character: item,
    });
    browserHistory.goBack();
  }

  render() {
    const { selected } = this.state;
    const { serviceList } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          选择特色服务
        </NavBar>
        <List>
          {serviceList && serviceList.map((i, index) => (
            <RadioItem key={i.id} checked={selected.id ? selected.id === i.id : index === 0} onChange={() => this.handleSelect(i)}>
              {i.name}
            </RadioItem>
          ))}
        </List>
      </div>
    );
  }
}

SelectCharacterService.propTypes = {
  getService: PropTypes.func,
  setService: PropTypes.func,
  publishParams: PropTypes.object,
  serviceList: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  serviceList: makeSelectBusinessCharacterService(),
  publishParams: makeSelectPublishParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    getService: () => dispatch(fetchCharacterService()),
    setService: (params) => dispatch(loadPublishParams(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCharacterService);
