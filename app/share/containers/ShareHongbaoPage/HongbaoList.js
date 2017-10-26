import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import FlexRow from 'components/FlexRow';
import FlexRowCenter from 'components/FlexRowCenter';
import FlexSB from 'components/FlexSB';
import FlexColumn from 'components/FlexColumn';
import Avatar from 'components/Avatar';
import DateInfo from 'components/DateInfo';

import luckImg from 'assets/images/hongbao-lucy.png';

const ListWrapper = styled.div`
  marginTop: 0.24rem;
  padding: 0.12rem 0.24rem;
  border-top: 0.01rem ${pallete.border.normal} solid;
`;

const ItemWrapper = styled(FlexRow)`
  position: relative;
  display: flex;
  padding: 0.15rem 0;
  background-color: ${pallete.white};
  border-bottom: 0.01rem ${pallete.border.normal} solid;
`;

class HongbaoList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {  } = this.props;

    const user = {
      avatar: "http://alijian-yaoyue-uploads-1.img-cn-hangzhou.aliyuncs.com/avatar/26065/150674029619670__3526__.png",
      created_at: "1506740351",
      nickname: "王浩",
      uid: "26065",
      count: 0.2,
    };

    return (
      <ListWrapper>
        <div style={{ fontSize: '0.24rem', color: '#999999' }}>8个红包共2.00元，2分钟被抢完</div>
        <ItemWrapper>
          <Avatar
            size="0.88rem"
            id={user.id}
            avatar={user.avatar}
            isVip={Number(user.verify_status) === 2}
          />
          <FlexSB style={{ width: '100%', alignSelf: 'flex-start' }}>
            <FlexColumn style={{ padding: '0.04rem 0.12rem', width: '100%' }}>
                <FlexSB style={{ fontSize: '0.28rem', color: '#333333' }}>
                  <section>{user.nickname}</section>
                  <section>{user.count}元</section>
                </FlexSB>
                <FlexSB>
                  {user.created_at && <DateInfo
                    time={user.created_at}
                    style={{
                      color: pallete.text.help,
                    }}
                  />}
                  <FlexRow>
                    <imgx src={luckImg} role="presetation" style={{ width: '0.3rem', height: '0.24rem' }} />
                    <div style={{ marginLeft: '0.08rem' ,fontSize: '0.22rem', color: '#fac216' }}>手气最佳</div>
                  </FlexRow>
                </FlexSB>
              </FlexColumn>
          </FlexSB>
        </ItemWrapper>
      </ListWrapper>
    );
  }
}

HongbaoList.propTypes = {
  hongbao: PropTypes.object,
};

export default HongbaoList;
