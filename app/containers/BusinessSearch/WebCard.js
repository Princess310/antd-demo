/**
*
* WebCard
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import pallete from 'styles/colors';
import alibabaImg from 'assets/images/alibaba.png';
import baiduImg from 'assets/images/baidu.png';

const Title = styled.div`
  display: -webkit-box;
  font-size: 0.3rem;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Content = styled.div`
  display: -webkit-box;
  margin-top: 0.12rem;
  font-size: 0.22rem;
  color: ${pallete.text.help};
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
  word-break: break-word;
`;

const imgStyle = {
  marginRight: '0.24rem',
  width: '2.3rem',
  height: '2.3rem',
  objectFit: 'cover',
};

const sourceStyle = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  height: '0.28rem',
  width: 'auto',
};

class WebCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { style, web } = this.props;
    const rootStyle = {
      display: 'flex',
      padding: '0.24rem',
      marginTop: '0.24rem',
      backgroundColor: pallete.white,
    };

    const { desc, picture, source, title, url } = web;

    return (
      <a target="_blank" href={url} style={Object.assign(rootStyle, style)}>
        {picture !== '' && (
          <img src={picture} style={imgStyle} />
        )}
        <div style={{ position: 'relative', width: picture !== '' ? 'calc(100% - 2.3rem)' : '100%' }}>
          <Title>{title}</Title>
          {desc !== '' && <Content>{desc.trim()}</Content>}
          <img src={source === 1 ? alibabaImg : baiduImg} style={sourceStyle} />
        </div>
      </a>
    );
  }
}

WebCard.propTypes = {
  web: PropTypes.object,
};

export default WebCard;
