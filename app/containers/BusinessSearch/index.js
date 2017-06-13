/*
 *
 * BusinessSearch
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';
import styled from 'styled-components';
import pallete from 'styles/colors';
import FlexSB from 'components/FlexSB';
import FlexCenter from 'components/FlexCenter';
import AppContent from 'components/AppContent';
import { List, Button, WhiteSpace, Icon } from 'antd-mobile';
import SearchWithCancelBar from 'components/SearchBar/SearchWithCancelBar';
import MomentCard from 'components/MomentCard';
import MomentHeader from 'components/MomentCard/MomentHeader';

import { fetchSearch } from 'containers/BusinessPage/actions';
import { makeSelectBusinessSearchPanel, makeSelectBusinessSearchAll } from 'containers/BusinessPage/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';

const SelectCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  font-size: '0.26rem';
  color: ${pallete.text.help};
  border: 0.01rem ${pallete.theme} solid;
  border-radius: 50%;
`;

const HeaderWrapper = styled.div`
  padding-left: 0.34rem;
  height: 0.56rem;
  line-height: 0.56rem;
  font-size: 0.26rem;
  color: ${pallete.text.help};
`;

const buttonStyle = {
  padding: 0,
  marginLeft: '0.2rem',
  marginBottom: '0.2rem',
  width: '2.24rem',
  height: '0.62rem',
  lineHeight: '0.62rem',
  backgroundColor: pallete.background.white,
  color: pallete.text.subHelp,
  fontSize: '0.22rem',
}

const Item = List.Item;
export class BusinessSearch extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const historyList = localStorage.getItem('search_business');

    this.state = {
      step: 1, // 1 -> search, 2 -> search panel view, 3 -> search all view
      panel: '7', // default panel is 7
      keyword: '',
      reward_as: 0,
      page: 1,
      seeMore: false,
      historyList: historyList ? JSON.parse(historyList) : [],
    }
  }

  onChange = (keyword) => {
    this.setState({ keyword });
  }

  storeHistore = (keyword) => {
    let { historyList } = this.state;
    let id = 0;

    if (historyList && historyList.length > 0) {
      id = historyList[historyList.length - 1].id + 1;
    } else {
      historyList = [];
    }

    // 如果已经存在关键字，删除久的
    for(let i = 0; i < historyList.length; i += 1){
      let item = historyList[i];

      if(item.name == keyword){
        historyList.splice(i, 1);
      }
    }

    // 如果超过6个历史记录，覆盖第一个
    if(historyList.length >= 6){
      historyList.splice(5, 1);
    }

    if (keyword.trim() !== '') {
      const obj = { id: id, name: keyword };
      historyList = [obj, ...historyList];

      localStorage.setItem('search_business', JSON.stringify(historyList));
      this.setState({
        historyList,
      });
    }
  }

  handleClearHistory = () => {
    this.setState({
      historyList: [],
    });
    localStorage.setItem('search_business', JSON.stringify([]));
  }

  handleSearch = () => {
    const { panel, keyword, reward_as } = this.state;

    if (panel === '7') {
      this.setState({
        step: 2,
      });
    } else {
      this.setState({
        step: 3,
      });
    }

    this.props.doSearch(panel, keyword, reward_as, 1);
    this.storeHistore(keyword);
  }

  handleSeeMore = (reward_as) => {
    const { panel, keyword, page } = this.state;

    this.setState({
      panel: '6',
      step: 3,
      seeMore: true,
      reward_as,
    });

    this.props.doSearch('6', keyword, reward_as, page);
  }

  handleBack = () => {
    const { step, panel, seeMore } = this.state;

    if (seeMore) {
      this.setState({
        step: step - 1,
        panel: '7',
        seeMore: false,
      });
    } else if (step === 2 || panel === '6') {
      this.setState({
        step: 1,
        panel: '7',
        reward_as: 0,
        keyword: '',
        page: 1,
        seeMore: false,
      });
    } else {
      this.setState({
        step: step - 1,
        panel: '7',
        seeMore: false,
      });
    }
  }

  handleReward = (reward_as) => {
    this.setState({
      reward_as,
      panel: '6',
      step: 2,
    });
  }

  handleHistorySearch = (keyword) => {
    const { panel, reward_as } = this.state;
    
    this.setState({
      keyword,
      step: 2,
    });
    this.props.doSearch(panel, keyword, reward_as, 1);
    this.storeHistore(keyword);
  }

  onEndReached = () => {
    const { panel, keyword, reward_as, page } = this.state;
    
    if (panel === '7') {
      this.setState({
        step: 2,
        page: page + 1,
      });
    } else {
      this.setState({
        step: 3,
        page: page + 1,
      });
    }
    this.props.doSearch(panel, keyword, reward_as, page + 1);
  }

  render() {
    const { keyword, step, panel, reward_as, historyList } = this.state;
    const { searchPanel, searchAll, currentUser } = this.props;
    let placeholder = '搜索动态';
    if (panel !== '7') {
      if (step !== 1 && reward_as === 0) {
        placeholder = '搜索人脉';
      } else if (reward_as === 1) {
        placeholder = '搜索供应'
      } else {
        placeholder = '搜索需求';
      }
    }

    return (
      <div>
        <FlexSB style={{ backgroundColor: pallete.white }}>
          {step !== 1 && <div onClick={this.handleBack} style={{ marginLeft: '0.24rem' }}><Icon type={require('icons/ali/返回.svg')} color={pallete.theme} /></div>}
          <SearchWithCancelBar
            placeholder={placeholder}
            value={keyword}
            onSearch={this.handleSearch}
            onCancel={() => {
              browserHistory.goBack();
            }}
            onChange={(value) => {
              this.setState({ keyword: value });
            }}
          />
        </FlexSB>
        <AppContent>
        {
          step === 1 && (
            <div>
              <WhiteSpace size="md" />
              <FlexSB style={{
                height: '2.6rem',
                padding: '0 1.1rem',
                backgroundColor: pallete.white,
              }}>
                <SelectCircle onClick={() => this.handleReward(2)}>需求</SelectCircle>
                <SelectCircle onClick={() => this.handleReward(1)}>供应</SelectCircle>
                <SelectCircle onClick={() => this.handleReward(0)}>人脉</SelectCircle>
              </FlexSB>
              <WhiteSpace size="md" />
              {(historyList && historyList.length > 0) && <div style={{ backgroundColor: pallete.white, height: '4.8rem' }}>
                <section style={{ padding: '0.24rem', color: pallete.text.help, fontSize: '0.26rem' }}>
                  历史搜索
                </section>
                <div>
                  {historyList.map((item, i) => (
                     <Button key={i} style={buttonStyle} inline onClick={() => this.handleHistorySearch(item.name)}>{item.name}</Button>
                  ))}
                </div>
                <FlexCenter style={{ height: '1.2rem' }}>
                  <Button type="ghost" style={{...buttonStyle, color: pallete.theme}} inline onClick={this.handleClearHistory}>清空搜索历史</Button>
                </FlexCenter>
              </div>}
            </div>
          )
        }

        {
          (step === 2 && panel === '7' && searchPanel) && (
            <div>
                {searchPanel.demand.length > 0 && (
                  <div>
                    <HeaderWrapper>需求</HeaderWrapper>
                    {searchPanel.demand.map((moment, i) => (
                      <MomentCard
                        key={moment.id}
                        moment={moment}
                        currentUser={currentUser}
                        from="search"
                        type="business"
                        style={i > 0 ? { marginTop: '0.1rem' } : {}}
                      />
                    ))}
                    {searchPanel.demand_more > 0 &&
                      <List>
                        <Item
                          thumb={<Icon type={require('icons/ali/搜索.svg')} color={pallete.text.help} />}
                          arrow="horizontal"
                          onClick={() => {
                            this.handleSeeMore(2);
                          }}
                        ><span style={{ color: pallete.text.help, fontSize: '0.26rem' }}>查看更多需求</span></Item>
                      </List>
                    }
                  </div>
                )}

                {searchPanel.supplier.length > 0 && (
                  <div>
                    <HeaderWrapper>供求</HeaderWrapper>
                    {searchPanel.supplier.map((moment, i) => (
                      <MomentCard
                        key={moment.id}
                        moment={moment}
                        currentUser={currentUser}
                        from="search"
                        type="business"
                        style={i > 0 ? { marginTop: '0.1rem' } : {}}
                      />
                    ))}
                    {searchPanel.supplier_more > 0 &&
                      <List>
                        <Item
                          thumb={<Icon type={require('icons/ali/搜索.svg')} color={pallete.text.help} />}
                          arrow="horizontal"
                          onClick={() => {
                            this.handleSeeMore(1);
                          }}
                        ><span style={{ color: pallete.text.help, fontSize: '0.26rem' }}>查看更多供求</span></Item>
                      </List>
                    }
                  </div>
                )}

                {searchPanel.users.length > 0 && (
                  <div>
                    <HeaderWrapper>人脉</HeaderWrapper>
                    {searchPanel.users.map((user, i) => (
                      <MomentHeader
                        key={user.id}
                        user={user}
                        style={{ padding: '0.24rem', borderBottom: `0.01rem ${pallete.border.normal} solid` }}
                      />
                    ))}
                    {searchPanel.users_more > 0 &&
                      <List>
                        <Item
                          thumb={<Icon type={require('icons/ali/搜索.svg')} color={pallete.text.help} />}
                          arrow="horizontal"
                          onClick={() => {
                            this.handleSeeMore(0);
                          }}
                        ><span style={{ color: pallete.text.help, fontSize: '0.26rem' }}>查看更多人脉</span></Item>
                      </List>
                    }
                  </div>
                )}
            </div>
          )
        }

        {(step === 3 && searchAll) && (
          <ScrollContainer scrollKey="business_search">
            <TouchLoader
              initializing={0}
              hasMore={searchAll.hasNext}
              loading={searchAll.loading}
              onLoadMore={this.onEndReached}
              autoLoadMore={true}
              className="tloader app-content"
              style={{ top: 0 }}
            >
              {searchAll.list && searchAll.list.map((d) => {
                if (reward_as === 0) {
                  return (
                    <MomentHeader
                      key={d.id}
                      user={d}
                      style={{ padding: '0.24rem', borderBottom: `0.01rem ${pallete.border.normal} solid` }}
                    />
                  );
                } else {
                  return (
                    <MomentCard
                      key={d.id}
                      moment={d}
                      currentUser={currentUser}
                      from="search"
                      type="business"
                    />
                  );
                }
              })}
            </TouchLoader>
          </ScrollContainer>
        )}
        </AppContent>
      </div>
    );
  }
}

BusinessSearch.propTypes = {
  doSearch: PropTypes.func,
  searchPanel: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  searchAll: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  searchPanel: makeSelectBusinessSearchPanel(),
  searchAll: makeSelectBusinessSearchAll(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSearch: (panel, keyword, reward_as, page) => dispatch(fetchSearch(panel, keyword, reward_as, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSearch);