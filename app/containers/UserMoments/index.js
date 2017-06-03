/*
 *
 * UserMoments
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { NavBar, SegmentedControl, Tabs, ListView, RefreshControl } from 'antd-mobile';

import { fetchUserMoments } from 'containers/UserCenter/actions';

export class UserMoments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const dataSourceSupplier = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    const dataSourceDemand = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.initData = [];
    this.state = {
      type: 1, // type-> 1: 我的供应, 2:我的需求
      startPage: 1,
      supplier: {
        page: 1,
        dataSourceSupplier: dataSourceSupplier.cloneWithRows(this.initData),
      },
      demand: {
        page: 1,
        dataSourceDemand: dataSourceDemand.cloneWithRows(this.initData),
      },
      demandLoaded: false,
    };
  }

  componentWillMount() {
    const { getMoments } = this.props;

    getMoments(this.state.type, 1);
  }

  onChangeTitle = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
  }
  render() {
    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
        >
          <SegmentedControl
            values={['需求', '供应']}
            style={{ height: '0.3rem', width: '3rem' }}
            onChange={this.onChangeTitle}
          />
        </NavBar>
      </div>
    );
  }
}

UserMoments.propTypes = {
  getMoments: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    getMoments: (type, page) => dispatch(fetchUserMoments(type, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMoments);
