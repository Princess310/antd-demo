/**
*
* List Item
*
*/

import React, { PropTypes } from 'react';
import pallete from 'styles/colors';

import FlexSB from 'components/FlexSB';
import FlexRow from 'components/FlexRow';

class ListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { icon, name, rightContent, className, style } = this.props;

    return (
      <div className={className}>
        <FlexSB style={{ padding: '0 0.22rem', height: '0.94rem', ...style }}>
          <FlexRow>
            {icon}
            <div style={{ marginLeft: '0.18rem', fontSize: '0.3rem', color: '#333333' }}>{name}</div>
          </FlexRow>
          {rightContent && <div style={{fontSize: '0.26rem', color: '#666666'}}>{rightContent}</div>}
        </FlexSB>
      </div>
    );
  }
}

ListItem.propTypes = {};

export default ListItem;
