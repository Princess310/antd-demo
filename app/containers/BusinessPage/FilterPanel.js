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
import { Icon, Button } from 'antd-mobile';

const MaskWrapper = styled.div`
  position: fixed;
  top: 1.8rem;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  z-index: 102;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.12rem 0.2rem;
  background-color: ${pallete.white};
  z-index: 22;
`;

const buttonStyle = {
  padding: 0,
  margin: '0.04rem 0.025rem',
  width: '1.72rem',
  height: '0.62rem',
  lineHeight: '0.62rem',
  backgroundColor: pallete.background.grey,
  color: pallete.text.content,
  fontSize: '0.22rem',
}

const buttonActiveStyle = {
  backgroundColor: pallete.background.lightBule,
  color: pallete.theme,
};

const rootStyle = {
  height: '0.9rem',
  padding: '0.12rem 0',
  width: '100%',
  lineHeight: '0.9rem',
  color: pallete.text.tag,
  fontSize: '0.26rem',
  borderBottom: `0.01rem ${pallete.border.normal} solid`,
  backgroundColor: pallete.white,
};

class FilterPanel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    expanded: false,
  }

  static defaultProps = {
    value: 1,
    onSelect: () => {},
    selectTotalName: '全部',
  }

  handleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      expanded: !this.state.expanded,
    });

    this.props.onExpand && this.props.onExpand();
  }

  render() {
    const { expanded } = this.state;
    const { defaultTitle, field, value, items, style, contentStyle, onSelect, selectTotalName, from } = this.props;
    let currentItemTitle = defaultTitle;

    if (from && from === 'supplier') {
      buttonActiveStyle.backgroundColor = '#ffedd0';
      buttonActiveStyle.color = pallete.yellow;
    }

    const itemsView = items ? items.map((item, i) => {
      if (item.id === value) {
        currentItemTitle = item[field] + (item.unit ? item.unit : '');
      }
      return (
        item[field] !== '' &&
        <Button
          key={i}
          className="btn"
          inline
          style={item.id === value ? {...buttonStyle, ...buttonActiveStyle} : buttonStyle}
          activeStyle={buttonActiveStyle}
          onClick={() => onSelect(item)}>
          {item[field]}{item.unit ? item.unit : ''}
        </Button>
      )
    }) : null

    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <div style={Object.assign(rootStyle, style)}>
          <FlexCenter style={contentStyle} onClick={this.handleExpand}>
            <div>{currentItemTitle}</div>
            <div style={{ marginLeft: '0.08rem' }}>
              {
                expanded ?
                <Icon
                  type={require('icons/icon-core/list-up.svg')}
                  size="xxs"
                  color={pallete.text.words}
                /> :
                <Icon
                  type={require('icons/icon-core/list-down.svg')}
                  size="xxs"
                  color={pallete.text.words}
                />
              }
            </div>
          </FlexCenter>
          {expanded &&
            <MaskWrapper onClick={this.handleExpand}>
              <ContentWrapper>
                <Button
                  key={0}
                  className="btn"
                  inline
                  style={value === 0 ? {...buttonStyle, ...buttonActiveStyle} : buttonStyle} activeStyle={buttonActiveStyle}
                  onClick={() => onSelect({ id: 0, [field]: '' })}>
                  {selectTotalName}
                </Button>
                {itemsView}
              </ContentWrapper>
            </MaskWrapper>
          }
        </div>
      </div>
    );
  }
}

FilterPanel.propTypes = {
  defaultTitle: PropTypes.string,
  field: PropTypes.string,
  selectTotalName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  items: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  style: PropTypes.object,
  contentStyle: PropTypes.object,
  onSelect: PropTypes.func,
  onExpand: PropTypes.func,
  from: PropTypes.string,
};

export default FilterPanel;
