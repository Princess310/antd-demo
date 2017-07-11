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
import { makeSelectCurrentUser, makeSelectUnreadDot } from 'containers/HomePage/selectors';
import { makeSelectUserCenterIndustry } from 'containers/UserCenter/selectors';

import FilterPanel from './FilterPanel';
import { fetchBusiness, fetchBusinessPrice, fetchBusinessNumber, fetchReward } from './actions';
import { fetchIndustry } from 'containers/UserCenter/actions';
import { loadSelectTab } from 'containers/HomePage/actions';
import './styles.scss';

const alert = Modal.alert;
export class BusinessPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.initData = [];
    this.state = {
      type: 2, // type-> 1: 我的供应, 2:我的需求
      startPage: 1,
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
      industryFilter: {
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

      getBusiness(type, businessSupplier.page + 1, searchParams);
    } else {
      if (businessDemand.loading || !businessDemand.hasNext) {
        return;
      }

      getBusiness(type, businessDemand.page + 1, searchParams);
    }
  }

  onChangeTitle = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    const { getBusiness, unreadDot: { demand_red_dot, supplier_red_dot } } = this.props;
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

      if (Number(supplier_red_dot) > 0) {
        this.setState({
          rewardSupplierFilter: {
            id: 0,
            value: '',
          },
          industryFilter: {
            id: 0,
            value: '',
          },
          priceFilter: {
            id: 0,
            value: '',
          },
        });

        getBusiness(1);
      }
    } else {
      this.setState({
        type: 2,
      });

      if (Number(supplier_red_dot) > 0) {
        this.setState({
          rewardDemandFilter: {
            id: 0,
            value: '',
          },
          numberFilter: {
            id: 0,
            value: '',
          },
        });
      }

      getBusiness(2);
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
    } else if (filter === 'industryFilter') {
      searchParams.role = item.id;
    } else {
      searchParams.reward_item = item.id;
    }

    // do the filter for business
    getBusiness(type, startPage, searchParams);
  }

  handlePublish = () => {
    const { setSelectTab } = this.props;
    const { type } = this.state;

    request.doGet('moments/check-release', {
      reward_as: type
    }).then((res) => {
      const { natural_day_counts, my_point, release_point } = res;
      if (natural_day_counts > 0) {
        alert(res.message, '', [
          { text: '我知道了' },
        ])
      } else {
        if (my_point < release_point) {
          alert('发布失败', <div>
              <div style={{ color: pallete.theme }}>{`剩余${my_point}积分`}</div>
              <div>{`您的账户已不足${release_point}分，无法继续发布采购需求信息，可到“动态”栏目评论、点赞、分享挣取积分。`}</div>
            </div>, [
            { text: '我知道了', onPress: () => console.log('cancel') },
            { text: '立即前去', onPress: () => {
              setSelectTab('communicate');
            }, style: { fontWeight: 'bold' } },
          ]);
        } else {
          if (type === 2) {
            browserHistory.push('businessPublish');
          } else {
            browserHistory.push('/businessPublishSupplier');
          }
        }
      }
    });
  }

  render() {
    const { type, priceFilter, numberFilter, rewardDemandFilter, rewardSupplierFilter, industryFilter } = this.state;
    const { businessDemand, businessSupplier, currentUser, filters, industryList, unreadDot } = this.props;
    const { price, number, reward } = filters;

    const themeColor = type === 2 ? pallete.theme : pallete.yellow;
    const demandMenuClass = unreadDot.demand_red_dot && Number(unreadDot.demand_red_dot) > 0 ? 'demand-dot' : '';
    const supplierMenuClass = unreadDot.supplier_red_dot && Number(unreadDot.supplier_red_dot) > 0 ? 'supplier-dot' : '';

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
            <div key={1} onClick={this.handlePublish} style={{ color: themeColor }}>
              发布
            </div>,
          ]}
        >
          <SegmentedControl
            selectedIndex={type === 2 ? 0 : 1}
            values={['需求', '供应']}
            style={{ height: '0.3rem', width: '3rem' }}
            onChange={this.onChangeTitle}
            tintColor={themeColor}
            className={`${demandMenuClass} ${supplierMenuClass}`}
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
                from="demand"
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
                from="demand"
              />
            </FlexRow>
            ) : (
              <FlexRow>
                <FilterPanel
                  defaultTitle="行业角色"
                  selectTotalName="全部"
                  items={industryList}
                  value={industryFilter.id}
                  field="name"
                  onSelect={(item) => this.handleFilter('industryFilter', item)}
                  onExpand={() => {
                    !industryList && this.props.getIndustry();
                  }}
                  from="supplier"
                />
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
                  contentStyle={{ borderLeft: `0.01rem ${pallete.border.normal} solid` }}
                  from="supplier"
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
                  from="supplier"
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
  getIndustry: PropTypes.func,
  industryList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  setSelectTab: PropTypes.func,
  unreadDot: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  businessDemand: makeSelectUserBusinessDemand(),
  businessSupplier: makeSelectUserBusinessSupplier(),
  currentUser: makeSelectCurrentUser(),
  filters: makeSelectBusinessFilter(),
  industryList: makeSelectUserCenterIndustry(),
  unreadDot: makeSelectUnreadDot(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBusiness: (type, page, searchParams) => dispatch(fetchBusiness(type, page, searchParams)),
    getPrice: () => dispatch(fetchBusinessPrice()),
    getNumber: () => dispatch(fetchBusinessNumber()),
    getReward: () => dispatch(fetchReward()),
    getIndustry: () => dispatch(fetchIndustry()),
    setSelectTab: (selectTab) => dispatch(loadSelectTab(selectTab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);
