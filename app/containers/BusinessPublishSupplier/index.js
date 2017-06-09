/*
 *
 * BusinessPublishSupplier
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';

import { NavBar, List, TextareaItem, WhiteSpace, ImagePicker, Toast, Icon } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

const Item = List.Item;
export class BusinessPublishSupplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    content: '',
    files: [],
    filesMax: 9,
  }

  onChange = (files) => {
    this.setState({
      files,
    });
  };

  handleContent = (value) => {
    this.setState({
      content: value,
    });
  }

  render() {
    const { content, files, filesMax } = this.state;

    return (
      <div>
        <NavBar
          mode="light"
          iconName={false}
          leftContent={<Icon type={require('icons/ali/返回.svg')} size="sm" color={pallete.theme} />}
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>发送</MenuBtn>,
          ]}
        >
          发供应
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="这一刻的想法..."
            value={content}
            onChange={this.handleContent}
            rows={4}
          />
        </List>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          selectable={files.length < filesMax}
        />
        <List>
          <Item
            arrow="horizontal"
            extra="未选择"
            onClick={() => {
              
            }}
          >产品类别（必选）</Item>
          <Item
            arrow="horizontal"
            extra="不限"
            onClick={() => {
              
            }}
          >单价区间</Item>
          <Item
            arrow="horizontal"
            extra="不限"
            onClick={() => {
              
            }}
          >单价区间单位</Item>
        </List>
      </div>
    );
  }
}

BusinessPublishSupplier.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(BusinessPublishSupplier);
