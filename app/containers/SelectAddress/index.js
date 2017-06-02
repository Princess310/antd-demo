/*
 *
 * SelectAddress
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';
import { makeSelectUserCenterCity } from 'containers/UserCenter/selectors';

import { NavBar, ListView, List, Button } from 'antd-mobile';
import { fetchCity, saveUser } from 'containers/UserCenter/actions';

const Item = List.Item;
export class SelectAddress extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    // init data
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      headerPressCount: 0,
    };

    const { getCityInfo, cityInfo } = this.props;

    if (!cityInfo) {
      getCityInfo();
    }
  }

  handleSave = (cityName) => {
    const { saveUserInfo } = this.props;

    saveUserInfo({
      company_locate: cityName,
    });
  }

  render() {
    const { cityInfo: { normal_city }, currentUser } = this.props;
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    if (normal_city) {
      normal_city.forEach((item, index) => {
        const { list } = item;

        if (item && item.id) {
          sectionIDs.push(`section_${index}`);
          dataBlob[`section_${index}`] = item.name;
          rowIDs[index] = [];

          list.forEach((city) => {
            rowIDs[index].push(city.id);
            dataBlob[city.id] = city.name;
          });
        }
      });
    }

    return (
      <div>
        <NavBar
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
        >
          选择工作地区
        </NavBar>
        <ListView.IndexedList
          dataSource={this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)}
          renderHeader={() => (
            <div>
              <div>当前选择城市</div>
              {currentUser.company_locate !== '' &&
                <Button
                  className="btn"
                  size="small"
                  style={{ marginTop: '0.18rem' }}
                  inline
                  onClick={() => this.handleSave(currentUser.company_locate)}
                >
                  {currentUser.company_locate}
                </Button>
              }
            </div>
          )}
          renderSectionHeader={(sectionData) => (<div className="ih">{sectionData}</div>)}
          renderRow={(rowData) => (<Item onClick={() => this.handleSave(rowData)}>{rowData}</Item>)}
          className="fortest"
          style={{
            height: document.documentElement.clientHeight,
            overflow: 'auto',
          }}
          quickSearchBarStyle={{
            position: 'absolute',
            top: '1rem',
          }}
          delayTime={10}
          delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>rendering...</div>}
        />
      </div>
    );
  }
}

SelectAddress.propTypes = {
  getCityInfo: PropTypes.func,
  cityInfo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  currentUser: PropTypes.object,
  saveUserInfo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  cityInfo: makeSelectUserCenterCity(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCityInfo: () => dispatch(fetchCity()),
    saveUserInfo: (params) => dispatch(saveUser(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectAddress);
