/**
*
* DateInfo
*
* data info to show
*/

import React, { PropTypes } from 'react';
import pallete from 'styles/colors';
import date from 'utils/date';

class DateInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { time, style, format } = this.props;
    const rootStyle = {
      fontSize: '0.24rem',
      color: pallete.text.words,
    };

    return (
      <div style={Object.assign(rootStyle, style)}>
        {format ? date.format(time * 1000, format) : date.dateSinceToday(time * 1000)}
      </div>
    );
  }
}

DateInfo.propTypes = {
  /**
   * time from backend
   */
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * override the style
   */
  style: PropTypes.object,
  /**
   * do format for date
   */
  format: PropTypes.string,
};

export default DateInfo;
