/**
*
* SearchWithCancelBar
*
*/

import React, { PropTypes } from 'react';
import pallete from 'styles/colors';

import FlexRowCenter from 'components/FlexRowCenter';
import { Icon, InputItem } from 'antd-mobile';

const inputStyle = {
  fontSize: '0.34rem',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  marginLeft: '0.08rem',
  width: '100%',
  padding: '0.04rem 0',
  border: 0,
  fontSize: '0.26rem',
  color: pallete.text.help,
  backgroundColor: 'transparent',
  lineHeight: 1,
  boxSizing: 'border-box',
};

class SearchWithCancelBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const { value, placeholder, onSearch, onChange, onCancel, style } = this.props;
    const rootStyle = {
      height: '0.9rem',
      padding: '0.18rem 0.24rem',
      color: pallete.text.help,
      fontSize: '0.26rem',
      borderBottom: `0.01rem ${pallete.border.normal} solid`,
      backgroundColor: pallete.white,
    };

    return (
      <FlexRowCenter style={Object.assign(rootStyle, style)}>
        <FlexRowCenter
          style={{
            padding: '0.04rem 0.16rem',
            border: `0.01rem ${pallete.border.normal} solid`,
            borderRadius: '0.04rem',
          }}
        >
          <Icon type={require('icons/ali/搜索.svg')} color={pallete.text.help} />
          <input
            type="text"
            style={inputStyle}
            name="search-input"
            value={value}
            onKeyUp={(e) => {
              if (e.which === 13) {
                onSearch && onSearch();
              }
            }}
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
            placeholder={placeholder}
          />
        </FlexRowCenter>
        <div style={{ width: '0.72rem', marginLeft: '0.24rem' }} onClick={() => {onCancel && onCancel()}}>取消</div>
      </FlexRowCenter>
    );
  }
}

SearchWithCancelBar.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default SearchWithCancelBar;
