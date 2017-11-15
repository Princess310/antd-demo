import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import date from 'utils/date';

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
  padding: 0.15rem 0;
  background-color: ${pallete.white};
  border-bottom: 0.01rem ${pallete.border.normal} solid;
`;

class HongbaoList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { hongbao, list } = this.props;

    // 显示抢红包用的时间
    let usedTime = 0;
    if (hongbao.is_finish) {
      const lastTime = Number(list[list.length - 1].created_at);
      const diffTime = lastTime - Number(hongbao.created_at);
      usedTime = date.parseDiffTime(diffTime);
    }

    const listView = list && list.map((user) => (
      <ItemWrapper key={user.id} style={{ width: '100%', alignSelf: 'flex-start' }}>
        <Avatar
          size="0.88rem"
          id={user.id}
          avatar={user.avatar}
          isVip={Number(user.verify_status) === 2}
        />
        <FlexColumn style={{ padding: '0.04rem 0.12rem', width: '100%' }}>
            <FlexSB style={{ fontSize: '0.28rem', color: '#333333' }}>
              <section>{user.nickname}</section>
              <section>{user.total_fee}元</section>
            </FlexSB>
            <FlexSB>
              {user.created_at && <DateInfo
                time={user.created_at}
                style={{
                  color: pallete.text.help,
                }}
              />}
              {
                user.luck > 0 && (
                  <FlexRow>
                    <img src={luckImg} role="presetation" style={{ width: '0.3rem', height: '0.24rem' }} />
                    <div style={{ marginLeft: '0.08rem' ,fontSize: '0.22rem', color: '#fac216' }}>手气最佳</div>
                  </FlexRow>
                )
              }
            </FlexSB>
          </FlexColumn>
      </ItemWrapper>
    ));

    return (
      <ListWrapper>
        <div style={{ fontSize: '0.24rem', color: '#999999' }}>
          {hongbao.total_number}个红包共{hongbao.total_fee}元，{hongbao.is_finish > 0 ? `${usedTime}被抢完` : `已领取${hongbao.get_count}个`}
        </div>
        <div>
          {listView}
        </div>
      </ListWrapper>
    );
  }
}

HongbaoList.propTypes = {
  hongbao: PropTypes.object,
};

export default HongbaoList;
