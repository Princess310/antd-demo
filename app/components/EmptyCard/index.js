/**
*
* EmptyCard
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import FlexCenter from 'components/FlexCenter';
import FlexColumnCenter from 'components/FlexColumnCenter';
import NoStatus from 'assets/images/no-data-status.png';
import NoComment from 'assets/images/no-data-comments.png';
import NoSearch from 'assets/images/no-data-search.png';

function EmptyCard(props) {
  const { type } = props;
  let url = '';
  let des = '';

  switch (type) {
    case 'moment': {
      url = NoStatus;
      des = '没有找到相关动态';
      break;
    }
    case 'comment': {
      url = NoComment;
      des = '没有找到相关评论';
      break;
    }
    case 'user': {
      url = NoSearch;
      des = '没有找到相关用户';
      break;
    }
    default: {
      url = NoSearch;
      des = '搜索结果为空';
    }
  }
  
  return (
    <FlexCenter>
      <FlexColumnCenter style={{ paddingTop: '0.48rem', color: '#9399AB', fontSize: '0.3rem' }}>
        <img role="presentation" src={url} style={{ width: '2rem', height: 'auto', marginBottom: '0.16rem' }} />
        <section>{des}</section>
      </FlexColumnCenter>
    </FlexCenter>
  );
}

EmptyCard.propTypes = {
  type: PropTypes.string,
};

export default EmptyCard;
