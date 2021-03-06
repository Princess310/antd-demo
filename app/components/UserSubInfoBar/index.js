/**
*
* UserHeaderBar
*
*/

import React, { PropTypes } from 'react';
import pallete from 'styles/colors';

import FlexSB from 'components/FlexSB';
import FlexCenter from 'components/FlexCenter';
import ExpProgress from 'components/ExpProgress';
import { Icon } from 'antd-mobile';
import { parseDistance } from 'utils/utils';

class UserSubInfoBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    style: {},
  }

  render() {
    const { influence, progress, level, distance, city, style } = this.props;
    const rootStyle = {
      borderTop: `1px ${pallete.border.deep} solid`,
      borderBottom: `1px ${pallete.border.deep} solid`,
      backgroundColor: pallete.white,
      padding: '0.12rem 0',
      color: pallete.text.words,
      fontSize: '0.28rem',
    };

    return (
      <FlexSB style={Object.assign(rootStyle, style)}>
        <FlexCenter style={{ width: '27%' }}>
          <section>活跃度：<span style={{ color: pallete.theme }}>{influence}</span></section>
        </FlexCenter>
        <FlexCenter style={{ width: '46%', borderLeft: `1px ${pallete.border.normal} solid` }}>
          <FlexCenter>
            影响力：<ExpProgress progress={progress} />
            <span style={{ marginLeft: '0.08rem', color: pallete.text.yellow }}>V{level}</span>
          </FlexCenter>
        </FlexCenter>
        <FlexCenter style={{ width: '27%', borderLeft: `1px ${pallete.border.normal} solid` }}>
          <Icon
            type={require('icons/ali/定位.svg')}
            size="xs"
            color={pallete.text.words}
          />
          {parseDistance(distance, city)}
        </FlexCenter>
      </FlexSB>
    );
  }
}

UserSubInfoBar.propTypes = {
  /**
   * the influence info from backend
   */
  influence: PropTypes.string,
  /**
   * the progress info from backend
   */
  progress: PropTypes.string,
  /**
   * the level info from backend
   */
  level: PropTypes.string,
  /**
   * distance info
   */
  distance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * city info
   */
  city: PropTypes.string,
  /**
   * override the style
   */
  style: PropTypes.object,
};

export default UserSubInfoBar;
