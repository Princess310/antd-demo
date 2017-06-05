/**
*
* UserHeaderBar
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';

import FlexColumn from 'components/FlexColumn';
import FlexCenter from 'components/FlexCenter';
import ExpProgress from 'components/ExpProgress';
import { Icon } from 'antd-mobile';

const WordsWrapper = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const wordsStyle = {
  marginTop: '0.15rem',
  fontSize: '0.24rem',
  color: pallete.text.words,
};

class ExpandContent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { content } = this.props;

    const moreContent = content.length > 60;
    this.state = {
      moreContent,
      expanded: false,
    };
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { moreContent, expanded } = this.state;
    const { title, content, style } = this.props;

    const rootStyle = {
      padding: '0.24rem',
      backgroundColor: pallete.white,
    };

    return (
      <div style={Object.assign(rootStyle, style)}>
        <FlexCenter style={{ fontSize: '0.28rem' }}>{title}</FlexCenter>
        {moreContent ? (
          <div>
            {expanded ? (
              <div>
                <div style={wordsStyle}>{content}</div>
                <FlexCenter style={{ marginTop: '0.12rem' }} onClick={this.handleExpand}>
                  <Icon
                    type={require('icons/icon-core/list-up.svg')}
                    size="xs"
                    color={pallete.text.words}
                  />
                </FlexCenter>
              </div>
            ) : (
              <div>
                <WordsWrapper style={wordsStyle}>{content}</WordsWrapper>
                <FlexCenter style={{ marginTop: '0.12rem' }} onClick={this.handleExpand}>
                  <Icon
                    type={require('icons/icon-core/list-down.svg')}
                    size="xs"
                    color={pallete.text.words}
                  />
                </FlexCenter>
              </div>
            )}
          </div>
        ) : (
          <div style={wordsStyle}>{content}</div>
        )}
      </div>
    );
  }
}

ExpandContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  style: PropTypes.object,
};

export default ExpandContent;
