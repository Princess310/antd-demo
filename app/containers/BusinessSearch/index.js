/*
 *
 * BusinessSearch
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import pallete from 'styles/colors';
import FlexSB from 'components/FlexSB';

import { SearchBar, WhiteSpace } from 'antd-mobile';

const SelectCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  font-size: '0.28rem';
  color: ${pallete.text.help};
  border: 0.01rem ${pallete.theme} solid;
  border-radius: 50%;
`;

export class BusinessSearch extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    keyword: '',
  }

  onChange = (keyword) => {
    this.setState({ keyword });
  }

  render() {
    return (
      <div>
        <SearchBar
          value={this.state.keyword}
          showCancelButton={true}
          placeholder="搜索动态"
          onChange={this.onChange}
        />
        <WhiteSpace size="md" />
        <FlexSB style={{
          height: '2.6rem',
          padding: '0 0.48rem',
          backgroundColor: pallete.white,
        }}>
          <SelectCircle>需求</SelectCircle>
          <SelectCircle>供应</SelectCircle>
          <SelectCircle>人脉</SelectCircle>
        </FlexSB>
      </div>
    );
  }
}

BusinessSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(BusinessSearch);
