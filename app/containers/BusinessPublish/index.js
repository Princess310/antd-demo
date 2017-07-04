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

import { NavBar, List, TextareaItem, WhiteSpace, WingBlank, ImagePicker, Toast, Icon, SegmentedControl } from 'antd-mobile';
import MenuBtn from 'components/MenuBtn';
import FlexCenter from 'components/FlexCenter';

import { publishMoment, loadPublishParams } from 'containers/BusinessPage/actions';
import { makeSelectPublishParams } from 'containers/BusinessPage/selectors';

const Item = List.Item;
export class BusinessPublish extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { publishParams }  = this.props;

    this.state = {
      content: publishParams.content ? publishParams.content : '',
      files: publishParams.files ? publishParams.files : [],
      filesMax: 9,
    }
  }

  componentWillMount() {
    const { location: { action } } = this.props;

    if (action === 'PUSH') {
      this.props.setPublishParams(false);
      this.setState({
        content: '',
        files: [],
      });
    }
  }

  componentWillUnmount() {
    const { location: { action } } = this.props;
    const { content, files } = this.state;

    this.props.setPublishParams({
      content,
      files,
    });
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

  onChangeTitle = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;

    if (Number(index) === 1) {
      browserHistory.replace('/businessPublishSupplier');
    }
  }

  handleSave = () => {
    const { content, files } = this.state;
    const { publishParams, saveMoment } = this.props;

    if (!publishParams.reward_item) {
      Toast.info('请选择产品类别', 2);
      return;
    }

    if (content.trim().length > 0 && (content.trim().length > 30 || content.trim().length < 6)) {
      Toast.info('补充信息 (6~30字)', 2);
      return;
    }

    saveMoment(content, files, {
      category: 6,
      reward_as: 2,
      reward_item: publishParams.reward_item ? publishParams.reward_item.id : 0,
      section: publishParams.number ? publishParams.number.value : '',
      units: publishParams.units ? publishParams.units.name : '',
    });
  }

  render() {
    const { content, files, filesMax } = this.state;
    const { publishParams } = this.props;

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
          发需求
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <Item>
            <FlexCenter style={{ fontSize: '0.3rem'}}>
              <SegmentedControl
                selectedIndex={0}
                values={['需求', '供应']}
                style={{ height: '0.3rem', width: '3rem' }}
                onChange={this.onChangeTitle}
                tintColor={pallete.theme}
              />
            </FlexCenter>
          </Item>
        </List>
        <WhiteSpace size="md" />
        <List>
          <Item
            arrow="horizontal"
            extra={publishParams.reward_item ? publishParams.reward_item.name : '未选择'}
            onClick={() => {
              browserHistory.push('/selectReward');
            }}
          >产品类别（必选）</Item>
          <Item
            arrow="horizontal"
            extra={!publishParams.number || publishParams.number.value === '' ? "不限" : publishParams.number.value }
            onClick={() => {
              browserHistory.push('/selectNumber');
            }}
          >需求数量</Item>
          <Item
            arrow="horizontal"
            extra={!publishParams.units ? "不限" : publishParams.units.name}
            onClick={() => {
              if (publishParams.number && publishParams.number.value !== '') {
                browserHistory.push({
                  pathname: '/selectUnits',
                  state: {
                    type: 'demand',
                  },
                });
              }
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
  setPublishParams: PropTypes.func,
  saveMoment: PropTypes.func,
  publishParams: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  publishParams: makeSelectPublishParams(),
});

function mapDispatchToProps(dispatch) {
  return {
    setPublishParams: (params) => dispatch(loadPublishParams(params)),
    saveMoment: (content, files, params) => dispatch(publishMoment(content, files, params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPublish);
