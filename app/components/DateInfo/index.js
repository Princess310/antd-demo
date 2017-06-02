/**
*
* ChatLoadMore
*
*/

import React, { PropTypes } from 'react';
import pallete from 'styles/colors';
import date from 'utils/date';

class DateInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { time, style } = this.props;
    const rootStyle = {
      fontSize: '0.24rem',
      color: pallete.text.words,
    };

    return (
      <div style={Object.assign(rootStyle, style)}>
        {date.dateSinceToday(time * 1000)}
      </div>
    );
  }
}

DateInfo.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.object,
};

export default DateInfo;
