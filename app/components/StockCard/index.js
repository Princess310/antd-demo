/**
*
* StockCard
*
* the card comp for stock
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import date from 'utils/date';

import { Button, Toast } from 'antd-mobile';

import FlexRow from 'components/FlexRow';
import FlexSB from 'components/FlexSB';
import MomentHeader from 'components/MomentCard/MomentHeader';
import timeBg from 'assets/images/stock-time-bar.png';
import overTimeBg from 'assets/images/stock-over-time-bar.png';

import Gallery from './Gallery';

const Head = styled.div`
  font-size: 0.28rem;
  font-weight: bolder;
`;

const Reward = styled.div`
  display: inline-block;
  position: relative;
  top: -0.02rem;
  margin-right: 0.08rem;
  padding: 0 0.04rem;
  font-size: 0.2rem;
  color: #fc5210;
  border: 0.01rem solid #fc5210;
  border-radius: 0.04rem;
`;

const TagItem = styled.div`
  color: ${pallete.theme};
  font-size: 0.2rem;
`;

const CutItem = styled.div`
  padding-left: 0.08rem;
  padding-right: 0.08rem;
  color: #fc353f;
  font-size: 0.2rem;
  border: 1px solid #fc353f;
  border-radius: 0.04rem;
`;

const TimeItem = styled.div`
  width: 2.63rem;
  height: 0.32rem;
  color: ${pallete.white};
  font-size: 0.2rem;
  text-align: center;
  line-height: 0.32rem;
  background-image: url(${timeBg});
  background-size: 100% 100%;
`;

const UserCard =  styled.div`
  position: relative;
  marginTop: 0.24rem;
  padding: 0.24rem;
  background-color: ${pallete.white};
`;

const UserCardHeader = styled.div`
  position: absolute;
  display: block;
  left: 0.24rem;
  top: -0.1rem;
  padding: 0.04rem 0.06rem;
  font-size: 0.2rem;
  text-align: center;
  color: ${pallete.white};
  background-color: ${pallete.theme};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: -0.06rem;
    width: 0;
    height: 0;
    border-bottom: 0.1rem solid #3080bd;
    border-right: 0.06rem solid transparent;
  }
`;

const buttonStyle = {
  position: 'absolute',
  top: '0.48rem',
  right: '0.24rem',
  height: '0.4rem',
  padding: '0 0.24rem',
  lineHeight: '0.4rem',
  fontSize: '0.24rem',
  color: pallete.white,
  border: '1px solid #ddd',
  borderRadius: '0.1rem',
  backgroundColor: pallete.theme,
}

let timer = null;
class StockCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { stock } = this.props;
    // check the status
    const isOverTime = Number(stock.due_time) === 0 || stock.sale_status === '1';
    this.state = {
      isOverTime,
      diffTime: Number(stock.due_time),
      showTime: date.parseDiffTime(stock.due_time),
    };
  }

  static defaultProps = {
    style: {},
  }

  componentDidMount() {
    let { diffTime, showTime } = this.state;

    if (diffTime <= 0) {
      this.setState({
        isOverTime: true,
      });

      timer = null;
      return;
    }

    timer = setInterval(() => {
      diffTime -= 1;
      this.setState({
        diffTime,
        showTime: date.parseDiffTime(diffTime),
      });
    }, 1000);
  }

  componentWillUnmount() {
    // clear the timer
    timer = null;
  }
  

  handleDownloadInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Toast.info('请下载健康商信APP', 2);
  }

  render() {
    const { isOverTime, showTime } = this.state;
    const { style, stock } = this.props;
    const rootStyle = {
    };

    return (
      <div style={Object.assign(rootStyle, style)}>
        <Gallery pictures={stock.images} />
        <div style={{ padding: '0.24rem', backgroundColor: pallete.white }}>
          <Head><Reward>{stock.reward_item_name}</Reward>{stock.name}</Head>
          <FlexRow style={{ position: 'relative', left: '-0.12rem', marginTop: '0.16rem' }}>
            {stock.label.map((tag, i) => (
              <TagItem key={i}>
                {`【${tag.name}】`}
              </TagItem>
            ))}
          </FlexRow>
          <FlexSB style={{ marginTop: '0.16rem' }}>
            <FlexRow>
              <div style={{ marginRight: '0.16rem', fontSize: '0.24rem', color: pallete.text.help }}>处理价:</div>
              <div style={{ marginRight: '0.16rem', fontSize: '0.36rem', color: '#fc353f' }}>￥{stock.reduced_price}</div>
              <CutItem>{Number(stock.discount).toFixed(1)}折</CutItem>
            </FlexRow>
            <TimeItem style={isOverTime ? { width: '1.38rem', backgroundImage: `url(${overTimeBg})` } : {}}>
              {isOverTime ? '已下架' : `仅剩${showTime}`}
            </TimeItem>
          </FlexSB>
          <FlexSB style={{ marginTop: '0.16rem', fontSize: '0.2rem', color: pallete.text.help }}>
            <div style={{ textDecoration: 'line-through' }}>&nbsp;批发价:&nbsp;￥{stock.wholesale_price}&nbsp;</div>
            <div>{Number(stock.number) > 0 ? `库存${stock.number}${stock.number_unit}` : '已售罄'}</div>
          </FlexSB>
        </div>
        <UserCard>
          <UserCardHeader>商家信息</UserCardHeader>
          <MomentHeader
            user={{
              id: stock.user_info.uid,
              avatar: stock.user_info.avatar,
              verify_status: stock.user_info.verify_status,
              nickname: stock.user_info.nickname,
              tag_identity_name: stock.user_info.tag_identity_name,
              main_service_name: stock.user_info.main_service_name,
              company: stock.user_info.company,
              position: stock.user_info.position,
            }}
            created_at={stock.created_at}
            style={{
              marginTop: '0.16rem',
            }}
          />
          {stock.user_info.show_mobile === "1" ? (
            <a style={buttonStyle} href={`tel:${stock.user_info.mobile}`}>拨打电话</a>
          ) : (
            <Button style={buttonStyle} onClick={this.handleDownloadInfo}>对话</Button>
          )}
        </UserCard>

        <div className="app-cms-content" style={{ marginTop: '0.24rem', padding: '0.24rem', backgroundColor: pallete.white }} dangerouslySetInnerHTML={{__html: stock.content}} />
      </div>
    );
  }
}

StockCard.propTypes = {
  stock: PropTypes.object,
};

export default StockCard;
