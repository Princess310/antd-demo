/*
 *
 * CommunicatePublish
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import pallete from 'styles/colors';
import { browserHistory } from 'react-router';

import { NavBar, List, TextareaItem, WhiteSpace, ImagePicker, Toast, Icon } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';

const Item = List.Item;
export class CommunicatePublish extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          leftContent="back"
          mode="light"
          onLeftClick={() => browserHistory.goBack()}
          rightContent={[
            <MenuBtn key="0" onClick={this.handleSave}>发送</MenuBtn>,
          ]}
        >
          行业信息发布
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="这里是行业信息分享板块，请不要在这里发广告哦···"
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
            thumb={<Icon type={require('icons/ali/@.svg')} color={pallete.text.help} />}
            arrow="horizontal"
            onClick={() => {
              browserHistory.push('/userCenterCollects');
            }}
          >提醒谁看</Item>
        </List>
      </div>
    );
  }
}

CommunicatePublish.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(CommunicatePublish);
