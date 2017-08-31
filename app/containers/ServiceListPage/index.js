/*
 *
 * ServiceListPage
 *
 * path --> service
 * 
 * the list page for cms
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';
import request from 'utils/request';
import date from 'utils/date';

import { ScrollContainer } from 'react-router-scroll';
import TouchLoader from 'components/TouchLoader';

import Card from 'components/Card';
import DateInfo from 'components/DateInfo';
import BubbleLine from 'components/BubbleLine';
import { NavBar, TextareaItem, WhiteSpace, Icon, List } from 'antd-mobile';

const Item = List.Item;
export class ServiceListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      refresh: false,
      loading: false,
      list: false,
      hasNext: false,
    };
  }

  componentWillMount() {
    this.getList(1);
  }

  getList = (page) => {
    const self = this;
    const { list: oldList } = this.state;

    if (page === 1) {
      this.setState({
        refresh: true,
      });
    } else {
      this.setState({
        loading: true
,      })
    }

    request.doGet('cms-articles/articles-by-hot', { page }).then((res) => {
      const { list, page } = res;
      let hasNext = true;

      if (page) {
        if (page.current_page >= page.page_count) {
          hasNext = false;
        }
      } else {
        hasNext = false;
      }

      self.setState({
        page: (page ? page.current_page : 1),
        refresh: false,
        loading: false,
        list: oldList ? [...oldList, ...list] : list,
        hasNext,
      });
    });
  }

  onRefresh = () => {
    this.getList(1);
  }

  onEndReached = () => {
    const { page } = this.state;
    this.getList(page + 1);
  }

  render() {
    const { refresh, loading, list, hasNext } = this.state;
    console.log(this.state);
    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
        >
          行业新闻
        </NavBar>
        <ScrollContainer scrollKey="service_list">
          <TouchLoader
            initializing={0}
            refreshing={refresh}
            onRefresh={this.onRefresh}
            hasMore={hasNext}
            loading={loading}
            onLoadMore={this.onEndReached}
            autoLoadMore={true}
            className="tloader app-content"
            style={{ top: '0.9rem', bottom: 0 }}
          >
            {list && list.map((service) => (
              <div key={service.id}>
                <BubbleLine style={{ marginTop: '0.32rem' }} name={date.getParseTime(service.created_at)} />
                <Card
                  title={service.title}
                  style={{ marginTop: '0.32rem' }}
                  pic={service.thumbnail}
                  subTitle={<DateInfo
                    time={service.created_at}
                    format="YYYY-MM-DD"
                    style={{
                      color: pallete.text.help,
                      marginTop: '0.04rem',
                    }}
                  />}
                  content={service.description}
                  footer={
                    <Item
                      className="cms-service-item"
                      arrow="horizontal"
                      onClick={() => {
                        browserHistory.push({
                          pathname: 'momentDetail',
                          query: {
                            id: service.moments_id,
                          },
                          state: {
                            type: 'status',
                          },
                        });
                      }}
                    >阅读全文</Item>
                  }
                />
              </div>
            ))}
          </TouchLoader>
        </ScrollContainer>
      </div>
    );
  }
}

ServiceListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ServiceListPage);
