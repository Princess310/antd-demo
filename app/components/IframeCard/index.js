/**
*
* IframeCard
*
*/

import React from 'react';
// import styled from 'styled-components';

class IframeCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { type, id, style } = this.props;
    const rootStyle = {
      width: '100%',
      height: 'auto',
      border: 'none',
      backgroundColor: '#ffffff',
    };

    return (
      <iframe
        ref={r => this.iframe = r }
        scrolling="no"
        src={`http://${document.domain}/iframe.html?type=${type}&id=${id}`}
        style={{ ...rootStyle, ...style }}
      >
      </iframe>
    );
  }
}

IframeCard.propTypes = {

};

export default IframeCard;
