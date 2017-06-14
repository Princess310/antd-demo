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
import request from 'utils/request';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import MomentCard from 'components/MomentCard';
import FlexColumnCenter from 'components/FlexColumnCenter';
import FlexRow from 'components/FlexRow';
import { NavBar, SegmentedControl, Icon, ActionSheet, Modal } from 'antd-mobile';

import { makeSelectUserBusinessDemand, makeSelectUserBusinessSupplier, makeSelectBusinessFilter } from './selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';

import FilterPanel from './FilterPanel';
import { fetchBusiness, fetchBusinessPrice, fetchBusinessNumber, fetchReward } from './actions';
import './styles.scss';

const alert = Modal.alert;
export class BusinessPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.initData = [];
    this.state = {
      type: 2, // type-> 1: 我的供应, 2:我的需求
      startPage: 1,
      supplierPage: 1,
      demandPage: 1,
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
    };
  }

  componentWillMount() {
    const { getBusiness, businessDemand } = this.props;

    if (!businessDemand.list) {
      getBusiness(this.state.type, 1, {}, true);
    }
  }

  getSearchParams = () => {
    const { type, priceFilter, numberFilter, rewardDemandFilter, rewardSupplierFilter } = this.state; 
    let searchParams = {};

    if (type === 1) {
      searchParams = {
        reward_item: rewardSupplierFilter.id,
        section: priceFilter.value,
      };
    } else {
      searchParams = {
        reward_item: rewardDemandFilter.id,
        section: numberFilter.value,
      };
    }

    return searchParams;
  }

  onRefresh = () => {
    const { getBusiness } = this.props;
    const { type, startPage } = this.state;
    const searchParams = this.getSearchParams();
    
    if (type === 1) {
      this.setState({
        supplierPage: startPage,
      });
    } else {
      this.setState({
        demandPage: startPage,
      });
    }

    getBusiness(type, startPage, searchParams);
  }

  onEndReached = () => {
    const { type, supplierPage, demandPage } = this.state;
    const { businessDemand, businessSupplier, getBusiness } = this.props;
    const searchParams = this.getSearchParams();

    if (type === 1) {
      if (businessSupplier.loading || !businessSupplier.hasNext) {
        return;
      }

      this.setState({
        supplierPage: supplierPage + 1,
      });

      getBusiness(type, supplierPage + 1, searchParams);
    } else {
      if (businessDemand.loading || !businessDemand.hasNext) {
        return;
      }

      this.setState({
        demandPage: demandPage + 1,
      });

      getBusiness(type, demandPage + 1, searchParams);
    }
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
    const { type, startPage, priceFilter, numberFilter, rewardDemandFilter, rewardSupplierFilter } = this.state; 
    let searchParams = this.getSearchParams();

    if (type === 1) {
      this.setState({
        supplierPage: startPage,
        [filter]: {
          id: item.id,
          value: item.value,
        },
      });
    } else {
      this.setState({
        demandPage: startPage,
        [filter]: {
          id: item.id,
          value: item.value,
        },
      });
    }

    if (filter === 'priceFilter' || filter === 'numberFilter') {
      searchParams.section = item.value;
    } else {
      searchParams.reward_item = item.id;
    }

    // do the filter for business
    getBusiness(type, startPage, searchParams);
  }

  handlePublish = () => {
    const { type } = this.state;
    const listClass = type === 2 ? 'business-publish-demand-menu' : 'business-publish-supplier-menu';
    const BUTTONS = ['发布采购需求', '发布供应信息', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      maskClosable: true,
      className: listClass,
    },
    (buttonIndex) => {
      if (buttonIndex < 2) {
        request.doGet('moments/check-release', {
          reward_as: type
        }).then((res) => {
          if (res.natural_day_counts > 0) {
            alert(res.message, '', [
              { text: '我知道了' },
            ])
          } else {
            if (buttonIndex === 0) {
              browserHistory.push('businessPublish');
            } else if (buttonIndex === 1) {
              browserHistory.push('/businessPublishSupplier');
            }
          }
        });
      }
    });
  }

  render() {
    const { type, priceFilter, numberFilter, rewardDemandFilter, rewardSupplierFilter } = this.state;
    const { businessDemand, businessSupplier, currentUser, filters } = this.props;
    const { price, number, reward } = filters;

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
            <div key={1} onClick={this.handlePublish}>
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
        {(type === 2 && businessDemand.list && businessDemand.list.length > 0) &&
          <ScrollContainer scrollKey="business_demand">
            <TouchLoader
              initializing={0}
              refreshing={businessDemand.refresh}
              onRefresh={this.onRefresh}
              hasMore={businessDemand.hasNext}
              loading={businessDemand.loading}
              onLoadMore={this.onEndReached}
              autoLoadMore={true}
              className="tloader app-content"
              style={{ top: '1.8rem', bottom: '1rem' }}
            >
              {businessDemand.list.map((moment) => (
                <MomentCard
                  key={moment.id}
                  moment={moment}
                  currentUser={currentUser}
                  from="list"
                  type="business"
                  style={{ marginTop: '0.12rem' }}
                />
              ))}
            </TouchLoader>
          </ScrollContainer>
        }

        {(type === 1 && businessSupplier.list && businessSupplier.list.length > 0) &&
          <ScrollContainer scrollKey="business_supplier">
            <TouchLoader
              initializing={0}
              refreshing={businessSupplier.refresh}
              onRefresh={this.onRefresh}
              hasMore={businessSupplier.hasNext}
              loading={businessSupplier.loading}
              onLoadMore={this.onEndReached}
              autoLoadMore={true}
              className="tloader app-content"
              style={{ top: '1.8rem', bottom: '1rem' }}
            >
              {businessSupplier.list.map((moment) => (
                <MomentCard
                  key={moment.id}
                  moment={moment}
                  currentUser={currentUser}
                  from="list"
                  type="business"
                  style={{ marginTop: '0.12rem' }}
                />
              ))}
            </TouchLoader>
          </ScrollContainer>
        }
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
