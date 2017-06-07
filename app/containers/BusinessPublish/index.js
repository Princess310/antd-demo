/*
 *
 * BusinessPublish
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import pallete from 'styles/colors';

import { NavBar, List, TextareaItem, WhiteSpace, WingBlank, ImagePicker, Toast } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';
import FlexCenter from 'components/FlexCenter';

const Item = List.Item;
export class BusinessPublish extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          发需求
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <Item>
            <FlexCenter style={{ fontSize: '0.3rem'}}>
              <span>如需要发布供应信息，</span>
              <span style={{ color: pallete.theme }} onClick={() => {
                browserHistory.push('/businessPublishSupplier');
              }}>点此切换</span>
            </FlexCenter>
          </Item>
        </List>
        <WhiteSpace size="md" />
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
          >需求数量</Item>
          <Item
            arrow="horizontal"
            extra="不限"
            onClick={() => {
              
            }}
          >需求数量单位</Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <TextareaItem
            placeholder="在此输入您的补充信息"
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
        <WingBlank>
          <div style={{ fontSize: '0.28rem', color: pallete.text.message }}>友情提示：这里是发布采购需求的地方，请不要在此发布广告，不然会有降权或封号的风险，谢谢您的配合和理解！</div>
        </WingBlank>
      </div>
    );
  }
}

BusinessPublish.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(BusinessPublish);
