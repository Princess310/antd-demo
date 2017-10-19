/**
*
* StockCard
*
* the card comp for stock
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import { Button, Toast } from 'antd-mobile';

import FlexRow from 'components/FlexRow';
import FlexSB from 'components/FlexSB';
import MomentHeader from 'components/MomentCard/MomentHeader';
import timeBg from 'assets/images/stock-time-bar.png';

import Gallery from './Gallery';

const Head = styled.div`
  font-size: 0.28rem;
  font-weight: bolder;
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
  width: '1rem',
  lineHeight: '0.4rem',
  fontSize: '0.24rem',
  color: pallete.white,
  backgroundColor: pallete.theme,
}

class StockCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const { style } = this.props;
    const rootStyle = {
    };

    const mochaData = {
      pictures: [
        'http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/moments/1/150840014611810__418566__.png',
        'http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/chat/5959a707d0f33243340/1508223020774031__193376__.jpg',
        'http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/chat/5959a707d0f33243340/1508223020515491__170977__.jpg',
      ],
      name: '甘源牌 蟹黄味瓜子仁青豆蚕豆酱汁牛肉味蚕豆 四连包 1140g 休闲零食大礼包小吃每日坚果',
      tags: [
        '样品',
        '上门取货',
        '保质期',
        '批文批号',
        '品牌',
        '支持换货',
      ],
      price: '39.90',
      sourcePrice: '59.99',
      cut: '7',
      count: 1000,
      user: {
        avatar: "http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/avatar/26065/150674029619670__3526__.png",
        company: "阿里健",
        position: "Web前端",
        created_at: "1506740351",
        main_service_id: "7",
        main_service_name: "食品",
        mobile: "18227552785",
        nickname: "王浩",
        tag_identity_name: "生产厂家",
        uid: "26065",
        verify_status: "0",
      },
    };

    return (
      <div style={Object.assign(rootStyle, style)}>
        <Gallery pictures={mochaData.pictures} />
        <div style={{ padding: '0.24rem', backgroundColor: pallete.white }}>
          <Head>{mochaData.name}</Head>
          <FlexRow style={{ position: 'relative', left: '-0.12rem', marginTop: '0.16rem' }}>
            {mochaData.tags.map((tag, i) => (
              <TagItem key={i}>
                {`【${tag}】`}
              </TagItem>
            ))}
          </FlexRow>
          <FlexSB style={{ marginTop: '0.16rem' }}>
            <FlexRow>
              <div style={{ marginRight: '0.16rem', fontSize: '0.24rem', color: pallete.text.help }}>处理价:</div>
              <div style={{ marginRight: '0.16rem', fontSize: '0.36rem', color: '#fc353f' }}>￥{mochaData.price}</div>
              <CutItem>{mochaData.cut}折</CutItem>
            </FlexRow>
            <TimeItem>
              仅剩21分05秒
            </TimeItem>
          </FlexSB>
          <FlexSB style={{ marginTop: '0.16rem', fontSize: '0.2rem', color: pallete.text.help }}>
            <div style={{ textDecoration: 'line-through' }}>&nbsp;批发价:&nbsp;￥{mochaData.sourcePrice}&nbsp;</div>
            <div>库存{mochaData.count}</div>
          </FlexSB>
        </div>
        <UserCard>
          <UserCardHeader>商家信息</UserCardHeader>
          <MomentHeader
            user={{
              id: mochaData.user.uid,
              avatar: mochaData.user.avatar,
              verify_status: mochaData.user.verify_status,
              nickname: mochaData.user.nickname,
              tag_identity_name: mochaData.user.tag_identity_name,
              main_service_name: mochaData.user.main_service_name,
              company: mochaData.user.company,
              position: mochaData.user.position,
            }}
            created_at={mochaData.user.created_at}
            style={{
              marginTop: '0.16rem',
              marginBottom: '0.16rem',
            }}
          />
          <Button style={buttonStyle} onClick={this.handleDownloadInfo}>对话</Button>
          <FlexRow
            style={{
              paddingTop: '0.24rem',
              fontSize: '0.2rem',
              color: pallete.text.help,
              borderTop: `0.01rem ${pallete.border.normal} solid`,
            }}
          >
            <TagItem>处理原因：</TagItem>
            <div>因为市场竞争导致积压严重</div>
          </FlexRow>
        </UserCard>
      </div>
    );
  }
}

StockCard.propTypes = {
};

export default StockCard;
