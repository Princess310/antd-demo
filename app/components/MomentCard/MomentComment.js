/**
*
* MomentHeader
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

const Wrapper = styled.div`
  position: relative;
  padding: 0.15rem;
  border-top: 0.01rem ${pallete.border.normal} solid;
`;

const CommentWrapper = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  fontSize: 0.28rem;
`;

class MomentComment extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const {
      id,
      style,
      type,
      comments,
      comment_count,
      businessType,
    } = this.props;

    // defined the theme color
    const themeColor = pallete.theme;

    const commentsView = comments.length > 0 ? comments.map((c) => {
      return (
        <CommentWrapper key={c.id}>
          <span style={{ color: themeColor, marginRight: '0.08rem' }}>{c.nickname}:</span>
          <span>{c.content}</span>
        </CommentWrapper>
      );
    }) : null;

    return (
      <Wrapper style={style}>
        {commentsView}
        {Number(comment_count) > 3 &&
          <div
            style={{ fontSize: '0.28rem', color: themeColor}}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              browserHistory.push({
                pathname: 'momentDetail',
                query: {
                  id,
                },
                state: {
                  scrollToComment: true,
                  type,
                }
              });
            }}
          >查看全部{comment_count}评论</div>
        }
      </Wrapper>
    );
  }
}

MomentComment.propTypes = {
  style: PropTypes.object,
  comments: PropTypes.array,
  type: PropTypes.string,
  businessType: PropTypes.string,
  comment_count: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default MomentComment;
