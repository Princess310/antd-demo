/*
 *
 * CommunicateSearch
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
import CmsMomentCard from 'components/MomentCard/CmsMomentCard';

import { fetchCommunicateSearch } from 'containers/Communicate/actions';
import { makeSelectCommunicateSearch } from 'containers/Communicate/selectors';
import { makeSelectCurrentUser } from 'containers/HomePage/selectors';

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
export class CommunicateSearch extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const historyList = localStorage.getItem('search_communicate');

    this.state = {
      step: 1, // 1 -> search, 2 -> search result
      keyword: '',
      historyList: historyList ? JSON.parse(historyList) : [],
    }
  }

  handleBack = () => {
    this.setState({
      step: 1,
    });
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

      localStorage.setItem('search_communicate', JSON.stringify(historyList));
      this.setState({
        historyList,
      });
    }
  }

  handleClearHistory = () => {
    this.setState({
      historyList: [],
    });
    localStorage.setItem('search_communicate', JSON.stringify([]));
  }

  handleSearch = () => {
    const { keyword } = this.state;

    this.setState({
      step: 2,
    });

    this.props.doSearch(keyword, 1);
    this.storeHistore(keyword);
  }

  handleHistorySearch = (keyword) => {
    this.setState({
      keyword,
      step: 2,
    });
    this.props.doSearch(keyword, 1);
    this.storeHistore(keyword);
  }

  onEndReached = () => {
    const { keyword } = this.state;
    const { searchPanel } = this.props;

    if (searchPanel.loading || !searchPanel.hasNext) {
      return;
    }

    this.props.doSearch(keyword, searchPanel.page + 1);
  }

  render() {
    const { keyword, step, historyList } = this.state;
    const { searchPanel, currentUser } = this.props;
    return (
      <div>
        <FlexSB style={{ backgroundColor: pallete.white }}>
          {step !== 1 && <div onClick={this.handleBack} style={{ marginLeft: '0.24rem' }}><Icon type={require('icons/ali/返回.svg')} color={pallete.theme} /></div>}
          <SearchWithCancelBar
            placeholder="搜索交流"
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

        {step == 2 && (
          <ScrollContainer scrollKey="communicate_search">
            <TouchLoader
              initializing={0}
              hasMore={searchPanel.hasNext}
              loading={searchPanel.loading}
              onLoadMore={this.onEndReached}
              autoLoadMore={true}
              className="tloader app-content"
              style={{ top: 0 }}
            >
              {searchPanel.list && searchPanel.list.map((d) => (
                <CmsMomentCard
                  key={d.id}
                  moment={d}
                  style={{ marginTop: '0.12rem' }}
                />
              ))}
            </TouchLoader>
          </ScrollContainer>
        )}
        </AppContent>
      </div>
    );
  }
}

CommunicateSearch.propTypes = {
  doSearch: PropTypes.func,
  searchPanel: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  searchPanel: makeSelectCommunicateSearch(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSearch: (keyword, page) => dispatch(fetchCommunicateSearch(keyword, page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunicateSearch);
