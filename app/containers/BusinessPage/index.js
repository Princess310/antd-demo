/*
 *
 * BusinessPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import AppContent from 'components/AppContent';
import MomentCard from 'components/MomentCard';
import FlexColumnCenter from 'components/FlexColumnCenter';
import FlexRow from 'components/FlexRow';
import { NavBar, SegmentedControl, Icon, ListView, RefreshControl } from 'antd-mobile';

import { makeSelectUserBusinessDemand, makeSelectUserBusinessSupplier, makeSelectBusinessFilter } from './selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';

import FilterPanel from './FilterPanel';
import PublishMenu from './PublishMenu';
import { fetchBusiness, fetchBusinessPrice, fetchBusinessNumber, fetchReward } from './actions';

export class BusinessPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      type: 2, // type-> 1: 我的供应, 2:我的需求
      startPage: 1,
      supplier: {
        page: 1,
        dataSourceSupplier: dataSourceSupplier.cloneWithRows(this.initData),
      },
      demand: {
        page: 1,
        dataSourceDemand: dataSourceDemand.cloneWithRows(this.initData),
      },
      supplierLoaded: false,
      priceFilter: {
        id: 0,
        value: '',
      },
      numberFilter: {
        id: 0,
        value: '',
      },
      rewardDemandFilter: {
        id: 0,
        value: '',
      },
      rewardSupplierFilter: {
        id: 0,
        value: '',
      },
      showPublishMenu: false,
    };
  }

  componentWillMount() {
    const { getBusiness, businessDemand } = this.props;

    if (!businessDemand.list) {
      getBusiness(this.state.type, 1, {}, true);
    }
  }

  getList() {
    const { getBusiness } = this.props;
    const { type, demand, supplier, startPage, priceFilter, numberFilter, rewardDemandFilter, rewardSupplierFilter } = this.state; 
    let searchParams = {};
    let page = startPage;

    if (type === 1) {
      searchParams = {
        reward_item: rewardSupplierFilter.id,
        section: priceFilter.value,
      };

      page = supplier.page;
    } else {
      searchParams = {
        reward_item: rewardDemandFilter.id,
        section: numberFilter.value,
      };

      page = demand.page;
    }

    // do the filter for business
    getBusiness(type, page, searchParams);
  }

  onRefresh = () => {
    const { type, startPage, demand, supplier } = this.state;
    
    if (type === 1) {
      this.setState({
        supplier: {
          ...supplier,
          page: startPage,
        },
      });
    } else {
      this.setState({
        demand: {
          ...demand,
          page: startPage,
        },
      });
    }

    this.getList();
  }

  onEndReached = () => {
    const { type, demand, supplier } = this.state;
    const { businessDemand, businessSupplier, getBusiness } = this.props;

    if (type === 1) {
      if (businessSupplier.loading || !businessSupplier.hasNext) {
        return;
      }

      this.setState({
        supplier: {
          ...supplier,
          page: supplier.page + 1,
        },
      });
    } else {
      if (businessDemand.loading || !businessDemand.hasNext) {
        return;
      }

      this.setState({
        demand: {
          ...demand,
          page: demand.page + 1,
        },
      });
    }

    this.getList();
  }

  onChangeTitle = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    const { getBusiness } = this.props;
    const { supplierLoaded } = this.state;

    if (Number(index) === 1 && !supplierLoaded) {
      getBusiness(1);
      this.setState({
        supplierLoaded: true,
        type: 1,
      });
    } else if(Number(index) === 1) {
      this.setState({
        type: 1,
      });
    } else {
      this.setState({
        type: 2,
      });
    }
  }

  handleFilter = (filter, item) => {
    const { getBusiness } = this.props;
    const { type, demand, supplier, startPage } = this.state; 

    if (type === 1) {
      this.setState({
        supplier: {
          ...supplier,
          page: startPage,
        },
        [filter]: {
          id: item.id,
          value: item.value,
        },
      });
    } else {
      this.setState({
        demand: {
          ...demand,
          page: startPage,
        },
        [filter]: {
          id: item.id,
          value: item.value,
        },
      });
    }

    // do the filter for business
    this.getList();
  }
  

  render() {
    const { type, priceFilter, numberFilter, rewardDemandFilter, rewardSupplierFilter, showPublishMenu } = this.state;
    const { businessDemand, businessSupplier, currentUser, filters } = this.props;
    const { price, number, reward } = filters;
    const row = (moment) => (
      <MomentCard
        moment={moment}
        currentUser={currentUser}
        from="list"
        type="business"
        style={{ marginTop: '0.12rem' }}
      />
    );

    return (
      <div>
        <NavBar
          iconName={false}
          mode="light"
          leftContent={(
            <FlexColumnCenter onClick={() => {
              browserHistory.push('/businessSearch');
            }}>
              <Icon key={1} type={require('icons/ali/搜索.svg')} color={pallete.text.help} />
              <span style={{ fontSize: '0.2rem', color: pallete.text.help }}>搜商机</span>
            </FlexColumnCenter>
          )}
          rightContent={[
            <div key={1} onClick={() => {
              this.setState({
                showPublishMenu: true,
              });
            }}>
              <Icon type={require('icons/ali/编辑.svg')} color={pallete.theme} />
            </div>,
          ]}
        >
          <SegmentedControl
            selectedIndex={type === 2 ? 0 : 1}
            values={['需求', '供应']}
            style={{ height: '0.3rem', width: '3rem' }}
            onChange={this.onChangeTitle}
          />
        </NavBar>
        {type === 2 ?
          (
            <FlexRow>
              <FilterPanel
                defaultTitle="产品类别"
                selectTotalName="全部类别"
                items={reward}
                value={rewardDemandFilter.id}
                field="name"
                onSelect={(item) => this.handleFilter('rewardDemandFilter', item)}
                onExpand={() => {
                  !reward && this.props.getReward();
                }}
              />
              <FilterPanel
                defaultTitle="需求数量"
                items={number}
                value={numberFilter.id}
                field="value"
                onSelect={(item) => this.handleFilter('numberFilter', item)}
                onExpand={() => {
                  !number && this.props.getNumber();
                }}
                contentStyle={{ borderLeft: `0.01rem ${pallete.border.normal} solid` }}
              />
            </FlexRow>
            ) : (
              <FlexRow>
                <FilterPanel
                  defaultTitle="产品类别"
                  selectTotalName="全部类别"
                  items={reward}
                  value={rewardSupplierFilter.id}
                  field="name"
                  onSelect={(item) => this.handleFilter('rewardSupplierFilter', item)}
                  onExpand={() => {
                    !reward && this.props.getReward();
                  }}
                />
                <FilterPanel
                  defaultTitle="价格区间"
                  items={price}
                  value={priceFilter.id}
                  field="value"
                  onSelect={(item) => this.handleFilter('priceFilter', item)}
                  onExpand={() => {
                    !price && this.props.getPrice();
                  }}
                  contentStyle={{ borderLeft: `0.01rem ${pallete.border.normal} solid` }}
                />
              </FlexRow>
          )
        }
        <AppContent style={{ top: '1.8rem' }}>
          {(type === 2 && businessDemand.list && businessDemand.list.length > 0) &&
            <ListView
              dataSource={this.state.demand.dataSourceDemand.cloneWithRows(businessDemand.list)}
              renderRow={row}
              renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                {businessDemand.loading ? 'Loading...' : 'Loaded'}
              </div>)}
              initialListSize={20}
              pageSize={20}
              scrollRenderAheadDistance={200}
              scrollEventThrottle={20}
              onScroll={this.onScroll}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                WebkitOverflowScrolling: 'touch',
              }}
              scrollerOptions={{ scrollbars: true }}
              refreshControl={<RefreshControl
                refreshing={businessDemand.refresh}
                onRefresh={() => this.onRefresh()}
              />}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          }

          {(type === 1 && businessSupplier.list && businessSupplier.list.length > 0) &&
            <ListView
              dataSource={this.state.supplier.dataSourceSupplier.cloneWithRows(businessSupplier.list)}
              renderRow={row}
              renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                {businessSupplier.loading ? 'Loading...' : 'Loaded'}
              </div>)}
              initialListSize={10}
              pageSize={10}
              scrollRenderAheadDistance={200}
              scrollEventThrottle={20}
              onScroll={this.onScroll}
              style={{
                height: document.documentElement.clientHeight,
              }}
              scrollerOptions={{ scrollbars: true }}
              refreshControl={<RefreshControl
                refreshing={businessSupplier.refresh}
                onRefresh={() => this.onRefresh()}
              />}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          }
        </AppContent>
        {showPublishMenu && <PublishMenu onClose={() => {this.setState({
          showPublishMenu: false,
        })}} />}
      </div>
    );
  }
}

BusinessPage.propTypes = {
  getBusiness: PropTypes.func,
  getPrice: PropTypes.func,
  getNumber: PropTypes.func,
  getReward: PropTypes.func,
  businessDemand: PropTypes.object,
  businessSupplier: PropTypes.object,
  currentUser: PropTypes.object,
  filters: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  businessDemand: makeSelectUserBusinessDemand(),
  businessSupplier: makeSelectUserBusinessSupplier(),
  currentUser: makeSelectCurrentUser(),
  filters: makeSelectBusinessFilter(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBusiness: (type, page, searchParams) => dispatch(fetchBusiness(type, page, searchParams)),
    getPrice: () => dispatch(fetchBusinessPrice()),
    getNumber: () => dispatch(fetchBusinessNumber()),
    getReward: () => dispatch(fetchReward()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);
